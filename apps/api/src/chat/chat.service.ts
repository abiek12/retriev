import { ILlmProivder, ILlmRequest } from "../llm/llm.interface";
import ToolRegistry from "../tools/tool.registry";
import { UserChatQueryType } from "./dto/query-chat.dto";
import llmConfig from "../config/llm.config";
import { IRoles } from "../llm/llm.types";

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
      role: "system" as IRoles,
      content: userQuery,
    };

    const tools = {};
    const request: ILlmRequest = {
      messages: [baseMessage],
      model: llmConfig.model,
    };

    const res = await this.llmProvider.generateChatCompletion(request);

    return res;
  };
}

export default ChatService;
