import { CacheFactory } from "@/infrastructure/cache/cache.factory";
import {
  EmbeddingFactory,
  EmbeddingProvider,
} from "../infrastructure/embeddings";
import { createToolRegistry } from "../infrastructure/tools";
import {
  VectorStoreFactory,
  VectorStoreProvider,
} from "../infrastructure/vector-store";
import { CacheProvider } from "@/infrastructure/cache/types/cache.enum";

export const createInfrastructure = () => {
  const embeddingProvider = EmbeddingFactory.getInstance(
    EmbeddingProvider.OPENAI,
  );

  const vectorStoreProvider = VectorStoreFactory.getInstance(
    VectorStoreProvider.PINECONE,
  );

  const cacheProvider = CacheFactory.getInstance(CacheProvider.REDIS);

  const toolRegistry = createToolRegistry(
    embeddingProvider,
    vectorStoreProvider,
  );

  return {
    embeddingProvider,
    vectorStoreProvider,
    toolRegistry,
    cacheProvider,
  };
};
