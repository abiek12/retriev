import { env } from "../../config/env";
import { toGroqMessages } from "../../utils/helpers";
import { ILlmProivder, ILlmRequest, ILlmResponse } from "../llm.interface";
import Groq from "groq-sdk";

class GroqProvider implements ILlmProivder {
  private groq = new Groq({ apiKey: env.groqApiKey });
  async generateChatCompletion(request: ILlmRequest): Promise<ILlmResponse> {
    const completion = await this.groq.chat.completions.create({
      model: request.model || "llama-3.1-8b-instant",
      messages: toGroqMessages(request.messages),
      tools: request?.tools,
      tool_choice: "auto",
      stream: false,
      temperature: request?.temperature ?? 0.2,
    });

    return {
      content: completion?.choices[0]?.message?.content,
      finishReason: completion?.choices[0]?.finish_reason,
      toolCalls: completion?.choices[0]?.message?.tool_calls,
    };
  }
}

export default GroqProvider;
