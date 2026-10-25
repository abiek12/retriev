import z from "zod";
import {
  knowledgeFileMimeTypeSchema,
  knowledgeResponseSchema,
  knowledgeTextSchema,
  knowledgeUrlSchema,
  MAX_KNOWLEDGE_FILE_SIZE_BYTES,
} from "./knowledge.contract";

const metadata = {
  title: z.string().trim().min(1, "Title is required").max(100),
  description: z.string().trim().max(500).optional(),
};

export const createKnowledgeRequestSchema = z.discriminatedUnion("type", [
  z
    .object({
      ...metadata,
      type: z.literal("text"),
      content: knowledgeTextSchema,
    })
    .strict(),
  z
    .object({
      ...metadata,
      type: z.literal("file"),
      fileName: z.string().trim().min(1).max(255),
      mimeType: knowledgeFileMimeTypeSchema,
      sizeBytes: z.number().int().positive().max(MAX_KNOWLEDGE_FILE_SIZE_BYTES),
    })
    .strict()
    .refine(
      ({ fileName, mimeType }) =>
        fileName
          .toLowerCase()
          .endsWith(mimeType === "application/pdf" ? ".pdf" : ".txt"),
      {
        message: "File extension must match its PDF or TXT MIME type",
        path: ["fileName"],
      },
    ),
  z
    .object({
      ...metadata,
      type: z.literal("url"),
      url: knowledgeUrlSchema,
    })
    .strict(),
]);

export const knowledgeUploadSchema = z.object({
  url: knowledgeUrlSchema,
  method: z.literal("PUT"),
  headers: z.record(z.string(), z.string()),
  expiresAt: z.string().datetime(),
});

// URL imports are file sources; only local uploads receive an upload URL.
export const createKnowledgeResponseSchema = z.union([
  knowledgeResponseSchema.extend({ type: z.literal("text") }),
  knowledgeResponseSchema.extend({
    type: z.literal("file"),
    sourceUrl: z.null(),
    upload: knowledgeUploadSchema,
  }),
  knowledgeResponseSchema.extend({
    type: z.literal("file"),
    sourceUrl: knowledgeUrlSchema,
    upload: z.never().optional(),
  }),
]);

export type CreateKnowledgeRequestDto = z.infer<
  typeof createKnowledgeRequestSchema
>;
export type CreateKnowledgeResponseDto = z.infer<
  typeof createKnowledgeResponseSchema
>;
