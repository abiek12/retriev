import {
  EmbeddingFactory,
  EmbeddingProvider,
} from "../infrastructure/embeddings";
import { createToolRegistry } from "../infrastructure/tools";
import {
  VectorStoreFactory,
  VectorStoreProvider,
} from "../infrastructure/vector-store";

export const createInfrastructure = () => {
  const embeddingProvider = EmbeddingFactory.getInstance(
    EmbeddingProvider.OPENAI,
  );

  const vectorStoreProvider = VectorStoreFactory.getInstance(
    VectorStoreProvider.PINECONE,
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
