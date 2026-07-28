import { Context } from "hono";
import ChatService from "./chat.service";
import { UserChatReqType } from "./dto/query-chat.dto";
import { ApiResponse } from "../utils/response.builder";

class ChatController {
  constructor(private readonly chatService: ChatService) {}

  chat = async (c: Context) => {
    const body: UserChatReqType = await c.req.json();

    const response = await this.chatService.chat(body);

    return c.json(ApiResponse.success(response));
  };
}

export default ChatController;
