import { ILlmProivder, ILlmRequest } from "../llm/llm.interface";
import ToolRegistry from "../tools/tool.registry";
import { UserChatReqType, UserChatResType } from "./dto/query-chat.dto";
import llmConfig, {
  MAX_RETRY,
  TOOL_CALL_MAX_RETRY,
} from "../config/llm.config";
import { IRoles } from "../llm/llm.types";
import { SYSTEM_PROMPT } from "../config/system-prompt";
import { Tools } from "../utils/enums";
import { logger } from "../utils/logger";

class ChatService {
  constructor(
    private toolRegistry: ToolRegistry,
    private llmProvider: ILlmProivder,
  ) {}

  private tools = [
    {
      type: "function",
      function: {
        name: "webSearch" as Tools,
        description:
          "Search the public internet for up-to-date or real-time information. Use this tool when the answer requires recent news, live data, current events, weather, sports scores, market prices, or information not available in the knowledge base.",
        parameters: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description:
                "A natural language search query to search on the internet.",
            },
          },
          required: ["query"],
        },
      },
    },
    {
      type: "function",
      function: {
        name: "ragSearch" as Tools,
        description:
          "Search Retriev's private knowledge base containing company documentation, uploaded files, policies, engineering guidelines, interview requirements, architecture, and internal documents. Always prefer this tool for questions about the company or its documentation.",
        parameters: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description:
                "A natural language search query describing the information to retrieve from the knowledge base.",
            },
          },
          required: ["query"],
        },
      },
    },
  ];

  private baseMessage = [
    {
      role: "system" as IRoles,
      content: SYSTEM_PROMPT,
    },
  ];

  private getAvailableTools = (reqTools: Tools[]) => {
    return this.tools.filter((tool) => reqTools.includes(tool.function.name));
  };

  protected executeTool = async (toolName: string, args: unknown) => {
    const tool = this.toolRegistry.get(toolName);
    return await tool.execute(args);
  };

  chat = async (dto: UserChatReqType): Promise<UserChatResType> => {
    const { agentId, userQuery, reqTools } = dto;
    const availableTools = this.getAvailableTools(reqTools);

    const llmReqPayload: ILlmRequest = {
      messages: this.baseMessage,
      model: llmConfig.model,
      tools: availableTools,
      responseFormat: "json",
      stream: false,
      maxTokens: llmConfig.maxTokens,
      temperature: llmConfig.temperature,
    };

    llmReqPayload.messages.push({
      role: "user",
      content: userQuery,
    });

    let currentCount = 0;
    let toolCallStatus = new Map<string, number>();

    while (true) {
      if (currentCount >= MAX_RETRY) {
        console.log("Max retry exceeded!");
        return {
          content: "I could not find the result, please try again!",
          finishReason: "max_retry_exceeded",
        };
      }
      currentCount++;

      const res = await this.llmProvider.generateChatCompletion(llmReqPayload);

      llmReqPayload.messages.push({
        role: "assistant",
        content: res.content ?? "",
        toolCalls: res.toolCalls,
      });

      const toolCallings = res.toolCalls;
      if (!toolCallings) {
        logger.info("Request completed!");
        return res;
      }

      for (let tool of toolCallings) {
        const functionName = tool.function.name;
        const functionParams = JSON.parse(tool.function.arguments);
        logger.info(`${functionName} tool calling...!`);

        const toolRes = await this.executeTool(functionName, functionParams);
        llmReqPayload.messages.push({
          role: "tool",
          content: JSON.stringify(toolRes),
          name: functionName,
          toolCallId: tool.id,
        });

        // This check whether the tool calling limit is exceded.
        const key = `${functionName}:${functionParams}`;
        const count = toolCallStatus.get(key) ?? 0;
        toolCallStatus.set(key, count + 1);

        const currentCalls = toolCallStatus.get(key) ?? 0;
        if (currentCalls >= TOOL_CALL_MAX_RETRY) {
          llmReqPayload.messages.push({
            role: "system",
            content: `
              Tool execution has finished.

              No additional tools are available for this request.
              Generate the final answer using only the information already provided by previous tool results and the conversation.

              Do not ask for or attempt any further tool calls.
              If the available information is insufficient, explain the limitation rather than speculating.
              `.trim(),
          });
          llmReqPayload.tools = [];
        }
      }
    }
  };
}

export default ChatService;
