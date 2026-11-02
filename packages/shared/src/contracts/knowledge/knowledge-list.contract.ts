import z from "zod";
import {
  createPaginatedResponseSchema,
  paginationRequestSchema,
} from "../common";
import {
  knowledgeResponseSchema,
  knowledgeStatusSchema,
  knowledgeTypeSchema,
} from "./knowledge.contract";

export const knowledgeListRequestSchema = paginationRequestSchema.extend({
  search: z.string().trim().min(1).max(100).optional(),
  type: knowledgeTypeSchema.optional(),
  status: knowledgeStatusSchema.optional(),
});

export const knowledgeListResponseSchema = createPaginatedResponseSchema(
  knowledgeResponseSchema,
);

export type KnowledgeListRequestDto = z.infer<
  typeof knowledgeListRequestSchema
>;
export type KnowledgeListResponseDto = z.infer<
  typeof knowledgeListResponseSchema
>;
