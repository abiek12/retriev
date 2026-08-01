import { z } from "zod";

export const indexDocumentSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("text"),
    text: z.string().min(5),
  }),
  z.object({
    type: z.literal("file"),
    filePath: z.string().min(1),
  }),
]);

export type IndexDocumentRequest = z.infer<typeof indexDocumentSchema>;
