import { Context } from "hono";
import type { UserChatRequest } from "@repo/shared/contracts";
import type { IChatService } from "./chat.service.interface";
import { ApiResponse } from "../../common/utils";

class ChatController {
  constructor(private readonly chatService: IChatService) {}

  chat = async (c: Context) => {
    const body: UserChatRequest = await c.req.json();

    const response = await this.chatService.chat(body);

    return c.json(ApiResponse.success(response));
  };
}

export default ChatController;
