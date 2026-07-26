import ToolRegistry from "../tools/tool.registry";
import { UserChatQueryType } from "./dto/query-chat.dto";

class ChatService {
  constructor(private toolRegistry: ToolRegistry) {}

  chat = async (dto: UserChatQueryType) => {
    const { agentId, userQuery } = dto;
    // Save message
    // Retrieve history

    // Call LLM

    // Receive chunks
    // Forward chunks immediately
    // Append chunks into answer buffer
    // Stream to client
    // Generation finished
    // Save assistant message

    return;
  };

  executeTool = async (toolName: string, args: unknown) => {
    const tool = this.toolRegistry.get(toolName);
    return await tool.execute(args);
  };
}

export default ChatService;
