import { IEmbeddingsProvider } from "./types/embedding.interface";
import { EmbeddingProvider } from "./types/embedding.enum";
import OpenAIEmbeddingProvider from "./providers/openai-embedding.provider";

export class EmbeddingFactory {
  private static instance: IEmbeddingsProvider;

  static getInstance(provider: EmbeddingProvider) {
    if (this.instance) return this.instance;

    switch (provider) {
      case EmbeddingProvider.OPENAI:
        this.instance = new OpenAIEmbeddingProvider();
        break;

      default:
        throw new Error("Unsupported embedding provider");
    }

    return this.instance;
  }
}
