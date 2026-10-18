import { describe, expect, mock, test } from "bun:test";
import { HTTPException } from "hono/http-exception";
import type {
  ApiKeyValidationResult,
  ApiKeyValidatorResolver,
} from "@/core/ports/api-key-validator.interface";
import {
  createApiKeyRequestSchema,
  rotateApiKeyRequestSchema,
} from "@repo/shared";
import type { ApiKey, IApiKeyRepository, NewApiKey } from "./types";

// Exercise the real encryption helper without loading application credentials.
mock.module("@/config/env", () => ({
  env: { encryptionKey: "test-only-encryption-secret" },
}));
const { default: ApiKeyService } = await import("./api-key.service");
const { decrypt } = await import("@/infrastructure/security");

const record: ApiKey = {
  id: "key-id",
  userId: "user-id",
  title: "openrouter text",
  provider: "openrouter",
  type: "text",
  model: "example-model",
  encryptedKey: "old-encrypted-key",
  isPlatform: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};
const payload = {
  type: "text",
  provider: "openai",
  model: "example-model",
  apiKey: "new-test-key",
} as const;

function setup(result: ApiKeyValidationResult = { valid: true }) {
  const repository = {
    database: {} as IApiKeyRepository["database"],
    findTypeConflict: mock(async (): Promise<ApiKey | null> => null),
    findById: mock(async (): Promise<ApiKey | null> => ({ ...record })),
    create: mock<IApiKeyRepository["create"]>(async () => ({ id: record.id })),
    update: mock(
      async (
        _id: string,
        _userId: string,
        data: Partial<NewApiKey>,
      ): Promise<ApiKey | null> => ({ ...record, ...data }),
    ),
    findMany: mock(async () => ({ records: [], total: 0 })),
    delete: mock(async () => true),
  } satisfies IApiKeyRepository;
  const validate = mock<(apiKey: string) => Promise<ApiKeyValidationResult>>(
    async () => result,
  );
  const resolve = mock<ApiKeyValidatorResolver>(() => ({ validate }));
  return {
    repository,
    validate,
    resolve,
    service: new ApiKeyService(repository, resolve),
  };
}

async function expectHttpError(
  action: Promise<unknown>,
  status: HTTPException["status"],
) {
  let caught: unknown;
  try {
    await action;
  } catch (error) {
    caught = error;
  }
  expect(caught).toBeInstanceOf(HTTPException);
  expect((caught as HTTPException).status).toBe(status);
}

describe("API-key validation before persistence", () => {
  test("create waits for validation before encrypting and saving", async () => {
    const { service, repository, resolve, validate } = setup();
    let finishValidation!: (value: ApiKeyValidationResult) => void;
    validate.mockImplementation(
      () =>
        new Promise((resolveValidation) => {
          finishValidation = resolveValidation;
        }),
    );
    const creating = service.create("user-id", payload);
    await Promise.resolve();
    expect(repository.create).not.toHaveBeenCalled();
    finishValidation({ valid: true });
    expect(await creating).toEqual({ id: record.id });
    expect(resolve).toHaveBeenCalledWith("openai");
    expect(validate).toHaveBeenCalledWith("new-test-key");
    const saved = repository.create.mock.calls[0]![0];
    expect(saved.encryptedKey).not.toBe(payload.apiKey);
    expect(decrypt(saved.encryptedKey)).toBe(payload.apiKey);
  });

  for (const [reason, status] of [
    ["invalid_key", 422],
    ["permission_denied", 422],
    ["validation_unavailable", 503],
  ] as const) {
    test(`create does not save on ${reason}`, async () => {
      const { service, repository } = setup({
        valid: false,
        reason,
        message: "Validation failed.",
      });
      await expectHttpError(service.create("user-id", payload), status);
      expect(repository.create).not.toHaveBeenCalled();
    });

    test(`rotation preserves the existing key on ${reason}`, async () => {
      const { service, repository } = setup({
        valid: false,
        reason,
        message: "Validation failed.",
      });
      await expectHttpError(
        service.rotate(record.id, "user-id", { apiKey: "new-test-key" }),
        status,
      );
      expect(repository.update).not.toHaveBeenCalled();
      expect(record.encryptedKey).toBe("old-encrypted-key");
    });
  }

  test("rotation validates using the provider from the owned record", async () => {
    const { service, repository, resolve } = setup();
    expect(
      await service.rotate(record.id, "user-id", { apiKey: "new-test-key" }),
    ).toEqual({ id: record.id });
    expect(repository.findById).toHaveBeenCalledWith(record.id, "user-id");
    expect(resolve).toHaveBeenCalledWith("openrouter");
    const saved = repository.update.mock.calls[0]![2];
    expect(decrypt(saved.encryptedKey!)).toBe("new-test-key");
    expect(Object.keys(saved)).toEqual(["encryptedKey"]);
  });

  test("missing or unowned records are rejected before provider validation", async () => {
    const { service, repository, resolve } = setup();
    repository.findById.mockResolvedValue(null);
    await expectHttpError(
      service.rotate(record.id, "other-user", { apiKey: "new-test-key" }),
      404,
    );
    expect(resolve).not.toHaveBeenCalled();
    expect(repository.update).not.toHaveBeenCalled();
  });

  test("duplicate key types are rejected before provider validation", async () => {
    const { service, repository, resolve } = setup();
    repository.findTypeConflict.mockResolvedValue(record);
    await expectHttpError(service.create("user-id", payload), 409);
    expect(resolve).not.toHaveBeenCalled();
    expect(repository.create).not.toHaveBeenCalled();
  });
});

describe("API-key input", () => {
  test("create and rotate normalize surrounding whitespace consistently", () => {
    expect(
      createApiKeyRequestSchema.parse({ ...payload, apiKey: "  test-key  " })
        .apiKey,
    ).toBe("test-key");
    expect(
      rotateApiKeyRequestSchema.parse({ apiKey: "  test-key  " }).apiKey,
    ).toBe("test-key");
  });

  for (const apiKey of [
    "",
    "  ",
    "key with spaces",
    "key\r\nInjected: value",
    "x".repeat(4097),
  ]) {
    test(`rejects malformed input of length ${apiKey.length}`, () => {
      expect(
        createApiKeyRequestSchema.safeParse({ ...payload, apiKey }).success,
      ).toBe(false);
      expect(rotateApiKeyRequestSchema.safeParse({ apiKey }).success).toBe(
        false,
      );
    });
  }
});
