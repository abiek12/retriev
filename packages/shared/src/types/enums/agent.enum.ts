import z from "zod";

export const agentStatusSchema = z.enum(["active", "inactive"]);

export const llmProviderSchema = z.enum([
  "openai",
  "anthropic",
  "gemini",
  "groq",
  "openrouter",
]);
