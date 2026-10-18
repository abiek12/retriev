import { HttpApiKeyValidator } from "../http-api-key-validator";

export class GroqApiKeyValidator extends HttpApiKeyValidator {
  protected readonly providerName = "Groq";
  // https://console.groq.com/docs/models
  protected readonly endpoint = "https://api.groq.com/openai/v1/models";

  protected headers(apiKey: string) {
    return { Authorization: `Bearer ${apiKey}` };
  }
}
