import { env } from "../../config/env";
import { ILlmProivder, ILlmRequest, ILlmResponse } from "../llm.interface";
import Groq from "groq-sdk";

class GroqProvider implements ILlmProivder {
  private groq = new Groq({ apiKey: env.groqApiKey });
  async generateChatCompletion(request: ILlmRequest): Promise<ILlmResponse> {
    const { model, messages, tools, responseFormat } = request;
    const response = await this.groq.chat.completions.create({
      messages,
      model,
    });

    console.log(response);

    return new Promise((resolve, reject) => {
      resolve({
        content: "dafds",
        finishReason: "ster",
      });
    });
  }
}

export default GroqProvider;
