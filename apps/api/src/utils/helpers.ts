import { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions";
import { ILlmMessage } from "../llm/llm.interface";

export function toGroqMessages(
  messages: ILlmMessage[],
): ChatCompletionMessageParam[] {
  return messages.map((message) => {
    switch (message.role) {
      case "system":
        return {
          role: "system",
          content: message.content,
        };

      case "user":
        return {
          role: "user",
          content: message.content,
        };

      case "assistant":
        return {
          role: "assistant",
          content: message.content,
        };

      case "tool":
        return {
          role: "tool",
          tool_call_id: message.toolCallId!,
          content: message.content,
        };
    }
  });
}
