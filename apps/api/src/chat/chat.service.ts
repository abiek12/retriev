import { ILlmProivder } from "../llm/llm.interface";
import ToolRegistry from "../tools/tool.registry";
import { UserChatQueryType } from "./dto/query-chat.dto";

class ChatService {
  constructor(
    private toolRegistry: ToolRegistry,
    private llmProvider: ILlmProivder,
  ) {}

  executeTool = async (toolName: string, args: unknown) => {
    const tool = this.toolRegistry.get(toolName);
    return await tool.execute(args);
  };

  chat = async (dto: UserChatQueryType) => {
    const { agentId, userQuery } = dto;
    const baseMessage = {
      role: "system",
      content: "You are a personal assistant agent",
    };

    const tools = {};

    return;
  };
}

export default ChatService;
