import z from "zod";
import { agentStatusSchema } from "../../types/enums/agent.enum";
import { agentResponseSchema } from "./agent.contract";
import { apiResponseSchema } from "../api";
import {
  createPaginatedResponseSchema,
  paginationRequestSchema,
} from "../common";

export const agentListRequestSchema = paginationRequestSchema.extend({
  search: z.string().trim().min(1).optional(),

  status: agentStatusSchema.optional(),
});

export const agentListResponseSchema =
  createPaginatedResponseSchema(agentResponseSchema);

export const getAgentListResponseSchema = apiResponseSchema(
  agentListResponseSchema,
);

export type AgentListRequestDto = z.infer<typeof agentListRequestSchema>;
export type AgentListResponseDto = z.infer<typeof agentListResponseSchema>;
export type GetAgentListResponseDto = z.infer<
  typeof getAgentListResponseSchema
>;
