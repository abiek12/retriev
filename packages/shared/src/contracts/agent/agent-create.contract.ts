import z from "zod";
import { agentProviderSchema } from "../../constants/agent";
import { apiResponseSchema } from "../api";

export const createAgentRequestSchema = z.object({
  name: z.string().trim().min(1, "Agent name is required").max(100),

  description: z.string().trim().max(500).optional(),

  avatar: z.string().url().optional(),

  systemPrompt: z
    .string()
    .trim()
    .min(1, "System prompt is required")
    .max(10000),

  model: z.string().trim().min(1).optional(),

  provider: agentProviderSchema.optional(),

  temperature: z.number().min(0).max(2).optional(),

  maxTokens: z.number().int().positive().optional(),
});

export const createAgentResponseSchema = z.object({
  id: z.string().trim().min(1),
  name: z.string().trim().min(1),
});

export const postAgentResponseSchema = apiResponseSchema(
  createAgentResponseSchema,
);

export type CreateAgentRequestDto = z.infer<typeof createAgentRequestSchema>;
export type CreateAgentResponseDto = z.infer<typeof createAgentResponseSchema>;
export type PostAgentResponseDto = z.infer<typeof postAgentResponseSchema>;
