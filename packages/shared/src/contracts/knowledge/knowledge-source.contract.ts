import { z } from "zod";

export const indexKnowledgeSourceSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("text"),
    text: z.string().min(5),
  }),
  z.object({
    type: z.literal("file"),
    filePath: z.string().min(1),
  }),
]);

export type IndexKnowledgeSourceRequest = z.infer<
  typeof indexKnowledgeSourceSchema
>;

/** @deprecated Use indexKnowledgeSourceSchema instead. */
export const indexDocumentSchema = indexKnowledgeSourceSchema;

/** @deprecated Use IndexKnowledgeSourceRequest instead. */
export type IndexDocumentRequest = IndexKnowledgeSourceRequest;
