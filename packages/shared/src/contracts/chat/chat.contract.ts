import { z } from "zod";
import { Tool } from "../../constants";

export const toolNameSchema = z.enum([Tool.RAG, Tool.WEB_SEARCH]);

export const userChatRequestSchema = z.object({
  agentId: z.string(),
  userQuery: z.string().min(1),
  reqTools: z.array(toolNameSchema),
});

export const userChatResponseSchema = z.object({
  content: z.string().nullable(),
  finishReason: z.string().nullable(),
});

export type UserChatRequest = z.infer<typeof userChatRequestSchema>;
export type UserChatResponse = z.infer<typeof userChatResponseSchema>;
