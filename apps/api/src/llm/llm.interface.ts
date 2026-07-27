import { IRoles } from "./llm.types";

export interface ILlmMessage {
  role: IRoles;
  content: string;
  toolCallId?: string;
  toolCalls?: any;
  name?: string;
}

export interface ILlmRequest {
  model: string;
  messages: ILlmMessage[];
  tools?: any;
  stream?: boolean;
  responseFormat?: "text" | "json";
  temperature?: number;
  maxTokens?: number;
}

export interface ILlmResponse {
  content: string | null;
  toolCalls?: any[];
  finishReason: string;
}

export interface ILlmProivder {
  generateChatCompletion(request: ILlmRequest): Promise<ILlmResponse>;
}
