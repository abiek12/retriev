import { env } from "../../config/env";
import { toGroqMessages } from "../../utils/helpers";
import { ILlmProivder, ILlmRequest, ILlmResponse } from "../llm.interface";
import Groq from "groq-sdk";

class GroqProvider implements ILlmProivder {
  private groq = new Groq({ apiKey: env.groqApiKey });
  async generateChatCompletion(request: ILlmRequest): Promise<ILlmResponse> {
    const completion = await this.groq.chat.completions.create({
      messages: toGroqMessages(request.messages),
      model: request.model,
      tools: request.tools,
      tool_choice: "auto",
      stream: false,
      temperature: request.temperature,
    });

    const response = {
      content: completion?.choices[0]?.message?.content,
      finishReason: completion?.choices[0]?.finish_reason,
      toolCalls: completion?.choices[0]?.message?.tool_calls,
    };

    return response;
  }
}

export default GroqProvider;
