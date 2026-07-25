import EmbeddingFactory from "../embeddings/embedding.factory";
import { EmbeddingsModelConfig } from "../embeddings/embedding.types";
import VectorStoreFactory from "../vector-store/vector-store.factory";
import { VectorStoreConfig } from "../vector-store/vector-store.types";

export const createInfrastructure = () => {
  const embeddingProvider = EmbeddingFactory.getInstance(
    EmbeddingsModelConfig.OPENAI,
  );

  const vectorStoreProvider = VectorStoreFactory.getInstance(
    VectorStoreConfig.PINECONE,
  );

  return {
    embeddingProvider,
    vectorStoreProvider,
  };  
};
