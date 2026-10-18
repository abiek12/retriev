import type {
  ApiKeyProvider,
  IApiKeyValidator,
} from "@/core/ports/api-key-validator.interface";
import type { ApiKeyValidationOptions } from "./http-api-key-validator";
import { AnthropicApiKeyValidator } from "./providers/anthropic-api-key.validator";
import { GeminiApiKeyValidator } from "./providers/gemini-api-key.validator";
import { GroqApiKeyValidator } from "./providers/groq-api-key.validator";
import { OpenAiApiKeyValidator } from "./providers/openai-api-key.validator";
import { OpenRouterApiKeyValidator } from "./providers/openrouter-api-key.validator";

export class ApiKeyValidatorFactory {
  static create(
    provider: ApiKeyProvider,
    options?: ApiKeyValidationOptions,
  ): IApiKeyValidator {
    switch (provider) {
      case "openai":
        return new OpenAiApiKeyValidator(options);
      case "anthropic":
        return new AnthropicApiKeyValidator(options);
      case "gemini":
        return new GeminiApiKeyValidator(options);
      case "groq":
        return new GroqApiKeyValidator(options);
      case "openrouter":
        return new OpenRouterApiKeyValidator(options);
      default: {
        const unsupported: never = provider;
        throw new Error(`Unsupported API key provider: ${unsupported}`);
      }
    }
  }
}
