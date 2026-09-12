import { IEmbeddingsProvider } from "../embeddings/embedding.interface";
import { IVectorStore } from "../vector-store/vector-store.interface";
import RagSearchTool from "./rag/rag-search.tool";
import ToolRegistry from "./tool.registry";
import WebSearchTool from "./web/web-search.tool";

export const createToolRegistry = (
  embeddingProvider: IEmbeddingsProvider,
  vectorStore: IVectorStore,
) => {
  const registry = new ToolRegistry();

  registry.register(new RagSearchTool(embeddingProvider, vectorStore));
  registry.register(new WebSearchTool());

  return registry;
};
