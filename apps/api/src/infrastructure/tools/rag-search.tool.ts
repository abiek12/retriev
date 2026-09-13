import { IEmbeddingsProvider } from "../embeddings";
import { IVectorStore } from "../vector-store";
import { ITool } from "./types/tool.interface";

export class RagSearchTool implements ITool<{ query: string }, string[]> {
  readonly name: string = "ragSearch";
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
