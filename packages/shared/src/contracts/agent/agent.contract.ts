import { z } from "zod";
import { agentProviderSchema, agentStatusSchema } from "../../constants/agent";
import { apiResponseSchema } from "../api";

export const agentRequestSchema = z.object({
  id: z.string().uuid(),
});

export const agentResponseSchema = z.object({
  id: z.string().uuid(),

  name: z.string(),

  description: z.string().nullable(),

  avatar: z.string().nullable(),

  systemPrompt: z.string().nullable(),

  model: z.string().nullable(),

  provider: agentProviderSchema,

  temperature: z.string().nullable(),

  maxTokens: z.number().int().nullable(),

  status: agentStatusSchema,

  createdAt: z.string().datetime(),

  updatedAt: z.string().datetime(),
});

export const getAgentResponseSchema = apiResponseSchema(agentResponseSchema);

export type AgentResponseDto = z.infer<typeof agentResponseSchema>;
export type AgentRequestDto = z.infer<typeof agentRequestSchema>;
export type GetAgentResponseDto = z.infer<typeof getAgentResponseSchema>;
