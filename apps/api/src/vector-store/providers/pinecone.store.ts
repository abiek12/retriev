import { env } from "../../config/env";
import { IVectorStore } from "../vector-store.interface";
import {
  Pinecone,
  Pinecone as PineconeClient,
} from "@pinecone-database/pinecone";

class PineconeStore implements IVectorStore {
  private pinecone = new Pinecone({
    apiKey: env.pineconeApiKey,
  });

  private index = this.pinecone.index({
    name: env.pineconeIndex,
  });

  async addDocuments(chunks: any[]): Promise<void> {
    await this.index.upsert({ records: chunks });
  }

  async similaritySearch(query: number[], topK: number): Promise<any> {
    const response = await this.index.query({
      vector: query,
      topK: topK,
      includeMetadata: true,
    });

    return response.matches[0].metadata;
  }
}

export default PineconeStore;
