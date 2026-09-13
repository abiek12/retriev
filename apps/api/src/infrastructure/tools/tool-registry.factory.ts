import { IEmbeddingsProvider } from "../embeddings";
import { IVectorStore } from "../vector-store";
import { RagSearchTool } from "./rag-search.tool";
import { ToolRegistry } from "./tool.registry";
import { WebSearchTool } from "./web-search.tool";

export const createToolRegistry = (
  embeddingProvider: IEmbeddingsProvider,
  vectorStore: IVectorStore,
) => {
  const registry = new ToolRegistry();

  registry.register(new RagSearchTool(embeddingProvider, vectorStore));
  registry.register(new WebSearchTool());

  return registry;
};
