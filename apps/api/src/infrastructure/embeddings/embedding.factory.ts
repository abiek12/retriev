import { IEmbeddingsProvider } from "./embedding.interface";
import { EmbeddingsModelConfig } from "./embedding.types";
import OpenAIEmbeddingProvider from "./providers/openai.embedding";

class EmbeddingFactory {
  private static instance: IEmbeddingsProvider;

  static getInstance(provider: EmbeddingsModelConfig) {
    if (this.instance) return this.instance;

    switch (provider) {
      case EmbeddingsModelConfig.OPENAI:
        this.instance = new OpenAIEmbeddingProvider();
        break;

      default:
        throw new Error("Unsupported embedding provider");
    }

    return this.instance;
  }
};

export default EmbeddingFactory;
