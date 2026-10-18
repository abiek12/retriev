import type { CreateApiKeyRequestDto } from "@repo/shared";

export type ApiKeyProvider = CreateApiKeyRequestDto["provider"];

export type ApiKeyValidationFailureReason =
  "invalid_key" | "permission_denied" | "validation_unavailable";

export type ApiKeyValidationResult =
  | { valid: true }
  | { valid: false; reason: ApiKeyValidationFailureReason; message: string };

export interface IApiKeyValidator {
  validate(apiKey: string): Promise<ApiKeyValidationResult>;
}

export type ApiKeyValidatorResolver = (
  provider: ApiKeyProvider,
) => IApiKeyValidator;
