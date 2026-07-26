import ToolRegistry from "../tools/tool.registry";
import { UserChatQueryType } from "./dto/query-chat.dto";

class ChatService {
  constructor(private toolRegistry: ToolRegistry) {}

  chat = async (dto: UserChatQueryType) => {
    const { agentId, userQuery } = dto;
    const baseMessage = {
      role: "system",
      content: "You are a personal assistant agent",
    };

    const tools = {};

    return;
  };

  executeTool = async (toolName: string, args: unknown) => {
    const tool = this.toolRegistry.get(toolName);
    return await tool.execute(args);
  };
}

export default ChatService;
