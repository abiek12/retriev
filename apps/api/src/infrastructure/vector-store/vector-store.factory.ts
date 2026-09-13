import { IVectorStore } from "./types/vector-store.interface";
import { VectorStoreProvider } from "./types/vector-store.enum";
import { PineconeStore } from "./providers/pinecone.store";
import { MongoVectorStore } from "./providers/mongodb.store";

export class VectorStoreFactory {
  private static instance: IVectorStore;

  static getInstance(provider: VectorStoreProvider): IVectorStore {
    if (this.instance) {
      return this.instance;
    }

    switch (provider) {
      case VectorStoreProvider.PINECONE:
        this.instance = new PineconeStore();
        break;
      case VectorStoreProvider.MONGODB:
        this.instance = new MongoVectorStore();
        break;
      default:
        throw new Error("Unsupported vector database");
    }

    return this.instance;
  }
}
