import { IEmbeddingsProvider } from "../embedding.interface";
import OpenAI from "openai";
import { env } from "../../config/env";

class OpenAIEmbeddingProvider implements IEmbeddingsProvider {
  private openai = new OpenAI();

  async embedChunk(text: string): Promise<number[]> {
    const response = await this.openai.embeddings.create({
      model: env.embeddingModel,
      input: text,
      encoding_format: "float",
    });

    return response.data[0].embedding;
  }

  async embedChunks(chunks: string[]): Promise<any[]> {
    const response = await this.openai.embeddings.create({
      model: env.embeddingModel,
      input: chunks,
      encoding_format: "float",
    });

    return response.data.map((i) => i.embedding);
  }
}

export default OpenAIEmbeddingProvider;
