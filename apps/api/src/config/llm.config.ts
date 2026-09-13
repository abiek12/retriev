import { LlmProviderType } from "../infrastructure/llm";

export default {
  provider: "groq" as LlmProviderType,
  model: "llama-3.1-8b-instant",
  temperature: 0.1,
  maxTokens: 2048,
};
