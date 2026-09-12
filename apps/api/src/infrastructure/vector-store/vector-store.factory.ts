import MongoVectorStore from "./providers/mongodb.store";
import PineconeStore from "./providers/pinecone.store";
import { IVectorStore } from "./vector-store.interface";
import { VectorStoreConfig } from "./vector-store.types";

class VectorStoreFactory {
  private static instance: IVectorStore;

  static getInstance(provider: VectorStoreConfig): IVectorStore {
    if (this.instance) {
      return this.instance;
    };

    switch (provider) {
      case VectorStoreConfig.PINECONE:
        this.instance = new PineconeStore();
        break;
      case VectorStoreConfig.MONGOVECTOR:
        this.instance = new MongoVectorStore()
        break;
      default:
        throw new Error("Unsupported vector database");
    }

    return this.instance;
  }
};

export default VectorStoreFactory;
