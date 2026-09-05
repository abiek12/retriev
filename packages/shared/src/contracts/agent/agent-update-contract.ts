import z from "zod";
import { agentProviderSchema, agentStatusSchema } from "../../constants/agent";

export const updateAgentRequestSchema = z
  .object({
    name: z.string().trim().min(1).max(100).optional(),

    description: z.string().trim().max(500).nullable().optional(),

    avatar: z.string().url().nullable().optional(),

    systemPrompt: z.string().trim().min(1).max(10000).optional(),

    model: z.string().trim().min(1).optional(),

    provider: agentProviderSchema.optional(),

    temperature: z.number().min(0).max(2).nullable().optional(),

    maxTokens: z.number().int().positive().nullable().optional(),

    status: agentStatusSchema.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export const updateAgentResponseSchema = z.object({
  id: z.string().optional(),
});

export type UpdateAgentRequestDto = z.infer<typeof updateAgentRequestSchema>;
export type UpdateAgentResponseDto = z.infer<typeof updateAgentResponseSchema>;
