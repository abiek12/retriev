import z from "zod";

export const agentStatusSchema = z.enum(["active", "inactive"]);

export const agentProviderSchema = z.enum(["openai", "anthropic", "gemini"]);
