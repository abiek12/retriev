import type {
  ApiKeyValidationFailureReason,
  ApiKeyValidationResult,
  IApiKeyValidator,
} from "@/core/ports/api-key-validator.interface";

export type ValidationFetch = (
  url: string,
  init: RequestInit,
) => Promise<Response>;

export interface ApiKeyValidationOptions {
  fetch?: ValidationFetch;
  timeoutMs?: number;
}

export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

export abstract class HttpApiKeyValidator implements IApiKeyValidator {
  protected abstract readonly endpoint: string;
  protected abstract readonly providerName: string;

  constructor(private readonly options: ApiKeyValidationOptions = {}) {}

  protected abstract headers(apiKey: string): Record<string, string>;

  protected failureReason(
    status: number,
    body: unknown,
  ): ApiKeyValidationFailureReason {
    void body;
    if (status === 401) return "invalid_key";
    if (status === 403) return "permission_denied";
    return "validation_unavailable";
  }

  async validate(apiKey: string): Promise<ApiKeyValidationResult> {
    const controller = new AbortController();
    const timer = setTimeout(
      () => controller.abort(),
      this.options.timeoutMs ?? 8_000,
    );

    try {
      const fetcher = this.options.fetch ?? globalThis.fetch;
      const response = await fetcher(this.endpoint, {
        method: "GET",
        headers: this.headers(apiKey),
        signal: controller.signal,
        redirect: "error",
      });

      if (response.status === 200) {
        await response.body?.cancel();
        return { valid: true };
      }

      const body: unknown = await response.json().catch(() => null);
      const reason = this.failureReason(response.status, body);

      if (reason === "invalid_key") {
        return {
          valid: false,
          reason,
          message: `${this.providerName} rejected the API key. Check that it is correct and has not been revoked or expired.`,
        };
      }

      if (reason === "permission_denied") {
        return {
          valid: false,
          reason,
          message: `${this.providerName} denied access to the key validation endpoint. Check the key permissions and account or network restrictions.`,
        };
      }

      return this.unavailable();
    } catch {
      // Provider errors can contain credentials. Never expose or log them.
      return this.unavailable();
    } finally {
      clearTimeout(timer);
    }
  }

  private unavailable(): ApiKeyValidationResult {
    return {
      valid: false,
      reason: "validation_unavailable",
      message: `Could not validate the API key with ${this.providerName} right now. The provider may be unavailable or limiting requests. Please try again later.`,
    };
  }
}
