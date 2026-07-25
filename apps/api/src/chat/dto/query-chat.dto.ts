import { z } from "zod";

export const UserChatQueryDto = z.object({
  agentId: z.string(),
  userQuery: z.string().min(1),
});

export type UserChatQueryType = z.infer<typeof UserChatQueryDto>;
