import { Context } from "hono";
import ChatService from "./chat.service";
import { UserChatQueryType } from "./dto/query-chat.dto";

class ChatController {
  constructor(private readonly chatService: ChatService) {}

  chat = async (c: Context) => {
    const body: UserChatQueryType = await c.req.json();

    const response = await this.chatService.chat(body);

    return c.json({
      success: true,
      data: response,
      message: "Success",
    });
  };
}

export default ChatController;
