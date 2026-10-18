import { describe, expect, mock, test } from "bun:test";
import type { ApiKeyProvider } from "@/core/ports/api-key-validator.interface";
import { ApiKeyValidatorFactory } from "./api-key-validator.factory";
import type { ValidationFetch } from "./http-api-key-validator";

const providers: {
  provider: ApiKeyProvider;
  endpoint: string;
  headers: Record<string, string>;
}[] = [
  {
    provider: "openai",
    endpoint: "https://api.openai.com/v1/models",
    headers: { Authorization: "Bearer test-key" },
  },
  {
    provider: "anthropic",
    endpoint: "https://api.anthropic.com/v1/models?limit=1",
    headers: { "x-api-key": "test-key", "anthropic-version": "2023-06-01" },
  },
  {
    provider: "gemini",
    endpoint:
      "https://generativelanguage.googleapis.com/v1beta/models?pageSize=1",
    headers: { "x-goog-api-key": "test-key" },
  },
  {
    provider: "groq",
    endpoint: "https://api.groq.com/openai/v1/models",
    headers: { Authorization: "Bearer test-key" },
  },
  {
    provider: "openrouter",
    endpoint: "https://openrouter.ai/api/v1/key",
    headers: { Authorization: "Bearer test-key" },
  },
];

describe("provider API-key validation", () => {
  for (const { provider, endpoint, headers } of providers) {
    test(`${provider} uses an authenticated read request without model inference`, async () => {
      const fetcher = mock<ValidationFetch>(async () => Response.json({}));
      const validator = ApiKeyValidatorFactory.create(provider, {
        fetch: fetcher,
      });
      expect(await validator.validate("test-key")).toEqual({ valid: true });
      expect(fetcher).toHaveBeenCalledTimes(1);
      const [url, init] = fetcher.mock.calls[0]!;
      expect(url).toBe(endpoint);
      expect(url).not.toContain("test-key");
      expect(init).toMatchObject({ method: "GET", headers, redirect: "error" });
      expect(init.body).toBeUndefined();
      expect(init.signal).toBeInstanceOf(AbortSignal);
    });

    test(`${provider} rejects unauthorized credentials without exposing provider messages`, async () => {
      const validator = ApiKeyValidatorFactory.create(provider, {
        fetch: async () =>
          Response.json(
            { error: { message: "secret-test-key" } },
            { status: 401 },
          ),
      });
      const result = await validator.validate("secret-test-key");
      expect(result).toMatchObject({ valid: false, reason: "invalid_key" });
      expect(JSON.stringify(result)).not.toContain("secret-test-key");
    });
  }

  test("Gemini recognizes its documented 400 API_KEY_INVALID error", async () => {
    const validator = ApiKeyValidatorFactory.create("gemini", {
      fetch: async () =>
        Response.json(
          { error: { details: [{ reason: "API_KEY_INVALID" }] } },
          { status: 400 },
        ),
    });
    expect(await validator.validate("test-key")).toMatchObject({
      valid: false,
      reason: "invalid_key",
    });
  });

  test("Gemini does not mistake other 400 errors for invalid credentials", async () => {
    const validator = ApiKeyValidatorFactory.create("gemini", {
      fetch: async () =>
        Response.json(
          { error: { status: "FAILED_PRECONDITION" } },
          { status: 400 },
        ),
    });
    expect(await validator.validate("test-key")).toMatchObject({
      valid: false,
      reason: "validation_unavailable",
    });
  });

  test("restricted keys receive a permission error rather than an invalid-key error", async () => {
    const validator = ApiKeyValidatorFactory.create("openai", {
      fetch: async () => Response.json({}, { status: 403 }),
    });
    expect(await validator.validate("test-key")).toMatchObject({
      valid: false,
      reason: "permission_denied",
    });
  });

  test("OpenAI IP restrictions are not classified as invalid keys", async () => {
    const validator = ApiKeyValidatorFactory.create("openai", {
      fetch: async () =>
        Response.json(
          { error: { code: "ip_not_authorized" } },
          { status: 401 },
        ),
    });
    expect(await validator.validate("test-key")).toMatchObject({
      valid: false,
      reason: "permission_denied",
    });
  });

  for (const status of [402, 429, 500, 503]) {
    test(`HTTP ${status} leaves validation inconclusive`, async () => {
      const validator = ApiKeyValidatorFactory.create("openrouter", {
        fetch: async () => new Response("Upstream error", { status }),
      });
      expect(await validator.validate("test-key")).toMatchObject({
        valid: false,
        reason: "validation_unavailable",
      });
    });
  }

  test("network failures do not expose credentials", async () => {
    const validator = ApiKeyValidatorFactory.create("groq", {
      fetch: async () => {
        throw new Error("Network failure containing secret-test-key");
      },
    });
    const result = await validator.validate("secret-test-key");
    expect(result).toMatchObject({
      valid: false,
      reason: "validation_unavailable",
    });
    expect(JSON.stringify(result)).not.toContain("secret-test-key");
  });

  test("slow requests are aborted and validation remains inconclusive", async () => {
    let aborted = false;
    const validator = ApiKeyValidatorFactory.create("groq", {
      timeoutMs: 5,
      fetch: (_url, init) =>
        new Promise<Response>((_resolve, reject) => {
          init.signal?.addEventListener(
            "abort",
            () => {
              aborted = true;
              reject(new DOMException("Aborted", "AbortError"));
            },
            { once: true },
          );
        }),
    });
    expect(await validator.validate("test-key")).toMatchObject({
      valid: false,
      reason: "validation_unavailable",
    });
    expect(aborted).toBe(true);
  });
});
