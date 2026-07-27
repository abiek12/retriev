import { ILlmProivder, ILlmRequest } from "../llm/llm.interface";
import ToolRegistry from "../tools/tool.registry";
import { UserChatQueryType } from "./dto/query-chat.dto";
import llmConfig, { MAX_RETRY } from "../config/llm.config";
import { IRoles } from "../llm/llm.types";
import { SYSTEM_PROMPT } from "../config/system-prompt";

class ChatService {
  constructor(
    private toolRegistry: ToolRegistry,
    private llmProvider: ILlmProivder,
  ) {}

  private tools = [
    {
      type: "function",
      function: {
        name: "webSearch",
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
        name: "ragSearch",
        description:
          "Search the application's private knowledge base and retrieve relevant documents. Use this tool only when answering questions about information contained in the indexed documents, company data, uploaded files, manuals, policies, or other internal knowledge.",
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

  protected executeTool = async (toolName: string, args: unknown) => {
    const tool = this.toolRegistry.get(toolName);
    return await tool.execute(args);
  };

  chat = async (dto: UserChatQueryType) => {
    const { agentId, userQuery } = dto;

    const request: ILlmRequest = {
      messages: this.baseMessage,
      model: llmConfig.model,
      tools: this.tools,
      responseFormat: "json",
      stream: false,
      maxTokens: llmConfig.maxTokens,
      temperature: llmConfig.temperature,
    };

    request.messages.push({
      role: "user",
      content: userQuery,
    });

    let currentCount = 0;
    while (true) {
      if (currentCount > MAX_RETRY) {
        console.log("Max retry exceeded!");
        return "I could not find the result, please try again!";
      }
      currentCount++;

      const res = await this.llmProvider.generateChatCompletion(request);

      request.messages.push({
        role: "assistant",
        content: res.content ?? "",
        toolCalls: res.toolCalls,
      });

      const toolCallings = res.toolCalls;
      if (!toolCallings) {
        console.log("Completed!");
        return res;
      }

      for (let tool of toolCallings) {
        console.log("Tool calling!");
        const functionName = tool.function.name;
        const functionParams = JSON.parse(tool.function.arguments);

        const toolRes = await this.executeTool(functionName, functionParams);
        request.messages.push({
          role: "tool",
          content: JSON.stringify(toolRes),
          name: functionName,
          toolCallId: tool.id,
        });
      }
    }
  };
}

export default ChatService;
