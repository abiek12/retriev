import { LLMProviderType } from "./llm.types";
import GroqProvider from "./providers/groq.provider";

class LlmFactory {
  static create(provider: LLMProviderType) {
    switch (provider) {
      case "groq":
        return new GroqProvider();
      default:
        throw new Error(`Unsupported LLM provider: ${provider}`);
    }
  }
}

export default LlmFactory;
