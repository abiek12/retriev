import { LLMProviderType } from "../llm/llm.types";

export default {
  provider: "groq" as LLMProviderType,
  model: "llama-3.1-8b-instant",
  temperature: 0.1,
  maxTokens: 2048,
};

export const MAX_RETRY = 5;
export const TOOL_CALL_MAX_RETRY = 3;
