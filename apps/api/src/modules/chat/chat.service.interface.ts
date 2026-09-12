import type { UserChatRequest, UserChatResponse } from "@repo/shared";
import type { IBaseService } from "../../core/services";

export interface IChatService extends IBaseService {
  chat(dto: UserChatRequest): Promise<UserChatResponse>;
}
