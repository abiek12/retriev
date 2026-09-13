import { GroqProvider } from "./providers/groq-llm.provider";
import { LlmProviderType } from "./types/llm.types";

export class LlmFactory {
  static create(provider: LlmProviderType) {
    switch (provider) {
      case "groq":
        return new GroqProvider();
      default:
        throw new Error(`Unsupported LLM provider: ${provider}`);
    }
  }
}
