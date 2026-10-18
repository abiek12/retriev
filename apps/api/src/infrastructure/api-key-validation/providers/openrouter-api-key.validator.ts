import { HttpApiKeyValidator } from "../http-api-key-validator";

export class OpenRouterApiKeyValidator extends HttpApiKeyValidator {
  protected readonly providerName = "OpenRouter";
  // https://openrouter.ai/docs/api/api-reference/api-keys/get-current-api-key
  protected readonly endpoint = "https://openrouter.ai/api/v1/key";

  protected headers(apiKey: string) {
    return { Authorization: `Bearer ${apiKey}` };
  }
}
