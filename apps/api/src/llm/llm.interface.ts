import { ToolCall } from "openai/resources/beta/threads/runs/steps";
import { Tool } from "openai/resources/responses/responses";

export interface ILlmMessage {
  role: "system" | "user" | "assistant" | "tool";
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
  temperatur?: number;
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
