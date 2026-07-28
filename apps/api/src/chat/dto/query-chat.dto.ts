import { z } from "zod";
import { string } from "zod/v4/core/regexes.cjs";
import { Tools } from "../../utils/enums";

const toolEnum = z.enum(Tools);

export const UserChatReqDto = z.object({
  agentId: z.string(),
  userQuery: z.string().min(1),
  reqTools: z.array(toolEnum),
});

export const UserChatResDto = z.object({
  content: z.string().nullable(),
  finishReason: z.string().nullable(),
});

export type UserChatReqType = z.infer<typeof UserChatReqDto>;
export type UserChatResType = z.infer<typeof UserChatResDto>;
