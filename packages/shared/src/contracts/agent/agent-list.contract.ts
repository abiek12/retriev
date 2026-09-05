import z from "zod";
import { agentProviderSchema, agentStatusSchema } from "../../constants/agent";
import { agentResponseSchema } from "./agent.contract";

export const agentListRequestSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),

  limit: z.coerce.number().int().min(1).max(100).default(20),

  search: z.string().trim().min(1).optional(),

  status: agentStatusSchema.optional(),

  provider: agentProviderSchema.optional(),
});

export const agentListResponseSchema = z.object({
  data: z.array(agentResponseSchema),

  pagination: z.object({
    page: z.number().int(),
    limit: z.number().int(),
    total: z.number().int(),
    totalPages: z.number().int(),
  }),
});

export type AgentListRequestDto = z.infer<typeof agentListRequestSchema>;
export type AgentListResponseDto = z.infer<typeof agentListResponseSchema>;
