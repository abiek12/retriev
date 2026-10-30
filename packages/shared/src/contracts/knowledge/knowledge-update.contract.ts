import z from "zod";

export const updateKnowledgeRequestSchema = z.object({
  title: z.string().trim().min(1).optional(),
  description: z.string().trim().min(1).optional(),
});

export const updateKnowledgeResponseSchema = z.object({
  id: z.string().optional(),
});

export type UpdateKnowledgeRequestDto = z.infer<
  typeof updateKnowledgeRequestSchema
>;
export type UpdateKnowledgeResponseDto = z.infer<
  typeof updateKnowledgeResponseSchema
>;
