import { Context } from "hono";
import ChatService from "./chat.service";
import type { UserChatRequest } from "@repo/shared/contracts/chat";
import { ApiResponse } from "../utils/response.builder";

class ChatController {
  constructor(private readonly chatService: ChatService) {}

  chat = async (c: Context) => {
    const body: UserChatRequest = await c.req.json();

    const response = await this.chatService.chat(body);

    return c.json(ApiResponse.success(response));
  };
}

export default ChatController;
