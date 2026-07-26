import { ToolCall } from "openai/resources/beta/threads/runs/steps";
import { Tool } from "openai/resources/responses/responses";
import { IRoles } from "./llm.types";

export interface ILlmMessage {
  role: IRoles;
  content: string;
  toolCallId?: string;
  name?: string;
}

export interface ILlmRequest {
  model: string;
  messages: ILlmMessage[];
  tools?: Tool;
  stream?: boolean;
  responseFormat?: "text" | "json";
  temperature?: number;
  maxTokens?: number;
}

export interface ILlmResponse {
  content: string;
  toolCalls?: ToolCall[];
  finishReason: string;
}

export interface ILlmProivder {
  generateChatCompletion(request: ILlmRequest): Promise<ILlmResponse>;
}
