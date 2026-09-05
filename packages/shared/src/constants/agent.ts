import z from "zod";

export const agentStatusSchema = z.enum(["active", "draft", "offline"]);

export const agentProviderSchema = z.enum(["openai", "anthropic", "google"]);
