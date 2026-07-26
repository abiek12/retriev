import { env } from "../../config/env";
import { ILlmProivder, ILlmRequest, ILlmResponse } from "../llm.interface";
import Groq from "groq-sdk";

class GroqProvider implements ILlmProivder {
  private groq = new Groq({ apiKey: env.groqApiKey });
  async generateChatCompletion(request: ILlmRequest): Promise<ILlmResponse> {
    const { model, messages, tools, responseFormat } = request;
    const completion = await this.groq.chat.completions.create({
      messages,
      model,
      tools,
      tool_choice: "auto",
      response_format: {
        type: responseFormat == "json" ? "json_object" : "text",
      },
    });

    // console.dir(completion, { depth: 5 });

    const response = {
      content: completion?.choices[0]?.message?.content,
      finishReason: completion?.choices[0]?.finish_reason,
    };

    return response;
  }
}

export default GroqProvider;
