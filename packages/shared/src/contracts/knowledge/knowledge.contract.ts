import z from "zod";

export const knowledgeTypeSchema = z.enum(["text", "file"]);
export const knowledgeStatusSchema = z.enum([
  "uploading",
  "queued",
  "processing",
  "ready",
  "failed",
]);

export const knowledgeFileMimeTypeSchema = z.enum([
  "application/pdf",
  "text/plain",
]);

export const MAX_KNOWLEDGE_FILE_SIZE_BYTES = 10 * 1024 * 1024;
export const MAX_KNOWLEDGE_TEXT_LENGTH = 1_000_000;

export const knowledgeUrlSchema = z
  .string()
  .trim()
  .max(8192)
  .url()
  .refine((value) => {
    try {
      const url = new URL(value);
      return (
        ["http:", "https:"].includes(url.protocol) &&
        !url.username &&
        !url.password
      );
    } catch {
      return false;
    }
  }, "URL must use HTTP or HTTPS without embedded credentials");

export const knowledgeTextSchema = z
  .string()
  .min(1)
  .max(MAX_KNOWLEDGE_TEXT_LENGTH)
  .refine((value) => value.trim().length > 0, "Text content is required");

export const knowledgeRequestSchema = z.object({ id: z.string().uuid() });
export const deleteKnowledgeRequestSchema = knowledgeRequestSchema;
export const deleteKnowledgeResponseSchema = z.null();

export const knowledgeResponseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  type: knowledgeTypeSchema,
  status: knowledgeStatusSchema,
  errorMessage: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const getKnowledgeResponseSchema = z.discriminatedUnion("type", [
  knowledgeResponseSchema.extend({
    type: z.literal("text"),
    content: z.string(),
  }),
  knowledgeResponseSchema.extend({
    type: z.literal("file"),
    fileName: z.string().nullable(),
    mimeType: knowledgeFileMimeTypeSchema.nullable(),
    sizeBytes: z.number().int().positive().nullable(),
    sourceUrl: knowledgeUrlSchema.nullable(),
  }),
]);

export type KnowledgeRequestDto = z.infer<typeof knowledgeRequestSchema>;
export type KnowledgeResponseDto = z.infer<typeof knowledgeResponseSchema>;
export type GetKnowledgeResponseDto = z.infer<
  typeof getKnowledgeResponseSchema
>;
export type DeleteKnowledgeRequestDto = z.infer<
  typeof deleteKnowledgeRequestSchema
>;
export type DeleteKnowledgeResponseDto = z.infer<
  typeof deleteKnowledgeResponseSchema
>;
