import { IEmbeddingsProvider } from "../../embeddings/embedding.interface";
import { IVectorStore } from "../../vector-store/vector-store.interface";
import { ITool } from "../tool.interface";

class RagSearchTool implements ITool<{ query: string }, string[]> {
  readonly name: string = "rag_search";
  readonly description: string = "Searches indexed knowledge base.";

  constructor(
    private readonly embeddingProvider: IEmbeddingsProvider,
    private readonly vectorStore: IVectorStore,
  ) {}

  async execute(args: { query: string }): Promise<string[]> {
    const embeddings = await this.embeddingProvider.embedChunk(args.query);

    const documents = await this.vectorStore.similaritySearch(embeddings, 5);

    return documents;
  }
}

export default RagSearchTool;
