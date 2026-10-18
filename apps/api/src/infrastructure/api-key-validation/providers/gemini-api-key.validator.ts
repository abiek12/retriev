import type { ApiKeyValidationFailureReason } from "@/core/ports/api-key-validator.interface";
import { HttpApiKeyValidator, isRecord } from "../http-api-key-validator";

export class GeminiApiKeyValidator extends HttpApiKeyValidator {
  protected readonly providerName = "Gemini";
  // https://ai.google.dev/api/models#method:-models.list
  protected readonly endpoint =
    "https://generativelanguage.googleapis.com/v1beta/models?pageSize=1";

  protected headers(apiKey: string) {
    return { "x-goog-api-key": apiKey };
  }

  protected override failureReason(
    status: number,
    body: unknown,
  ): ApiKeyValidationFailureReason {
    if (
      (status === 400 || status === 403) &&
      isRecord(body) &&
      isRecord(body.error) &&
      Array.isArray(body.error.details) &&
      body.error.details.some(
        (detail: unknown) =>
          isRecord(detail) &&
          (detail.reason === "API_KEY_INVALID" ||
            detail.reason === "API_KEY_EXPIRED"),
      )
    ) {
      return "invalid_key";
    }
    return super.failureReason(status, body);
  }
}
