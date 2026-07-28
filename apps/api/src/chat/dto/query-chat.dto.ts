import { z } from "zod";
import { string } from "zod/v4/core/regexes.cjs";
import { Tools } from "../../utils/enums";

const toolEnum = z.enum(Tools);

export const UserChatQueryDto = z.object({
  agentId: z.string(),
  userQuery: z.string().min(1),
  reqTools: z.array(toolEnum),
});

export type UserChatQueryType = z.infer<typeof UserChatQueryDto>;
