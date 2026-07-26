import EmbeddingFactory from "../embeddings/embedding.factory";
import { EmbeddingsModelConfig } from "../embeddings/embedding.types";
import { createToolRegistry } from "../tools";
import VectorStoreFactory from "../vector-store/vector-store.factory";
import { VectorStoreConfig } from "../vector-store/vector-store.types";

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
