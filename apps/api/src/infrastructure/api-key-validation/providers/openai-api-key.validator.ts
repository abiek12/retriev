import type { ApiKeyValidationFailureReason } from "@/core/ports/api-key-validator.interface";
import { HttpApiKeyValidator, isRecord } from "../http-api-key-validator";

export class OpenAiApiKeyValidator extends HttpApiKeyValidator {
  protected readonly providerName = "OpenAI";
  // https://developers.openai.com/api/reference/resources/models/methods/list
  protected readonly endpoint = "https://api.openai.com/v1/models";

  protected headers(apiKey: string) {
    return { Authorization: `Bearer ${apiKey}` };
  }

  protected override failureReason(
    status: number,
    body: unknown,
  ): ApiKeyValidationFailureReason {
    if (
      status === 401 &&
      isRecord(body) &&
      isRecord(body.error) &&
      body.error.code === "ip_not_authorized"
    ) {
      return "permission_denied";
    }
    return super.failureReason(status, body);
  }
}
