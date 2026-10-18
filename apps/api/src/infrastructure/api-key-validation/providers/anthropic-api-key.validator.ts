import { HttpApiKeyValidator } from "../http-api-key-validator";

export class AnthropicApiKeyValidator extends HttpApiKeyValidator {
  protected readonly providerName = "Anthropic";
  // https://platform.claude.com/docs/en/api/models/list
  protected readonly endpoint = "https://api.anthropic.com/v1/models?limit=1";

  protected headers(apiKey: string) {
    return { "x-api-key": apiKey, "anthropic-version": "2023-06-01" };
  }
}
