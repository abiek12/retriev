import { ILlmProivder, ILlmRequest, ILlmResponse } from "../llm.interface";

class GroqProvider implements ILlmProivder {
  generateChatCompletion(request: ILlmRequest): Promise<ILlmResponse> {
    return new Promise(() => {
      return {
        content: "llm response",
        finishReason: "task completed",
      };
    });
  }
}

export default GroqProvider;
