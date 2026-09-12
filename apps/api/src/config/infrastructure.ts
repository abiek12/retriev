import EmbeddingFactory from "../infrastructure/embeddings/embedding.factory";
import { EmbeddingsModelConfig } from "../infrastructure/embeddings/embedding.types";
import { createToolRegistry } from "../infrastructure/tools";
import VectorStoreFactory from "../infrastructure/vector-store/vector-store.factory";
import { VectorStoreConfig } from "../infrastructure/vector-store/vector-store.types";

export const createInfrastructure = () => {
  const embeddingProvider = EmbeddingFactory.getInstance(
    EmbeddingsModelConfig.OPENAI,
  );

  const vectorStoreProvider = VectorStoreFactory.getInstance(
    VectorStoreConfig.PINECONE,
  );

  const toolRegistry = createToolRegistry(
    embeddingProvider,
    vectorStoreProvider,
  );

  return {
    embeddingProvider,
    vectorStoreProvider,
    toolRegistry,
  };
};
