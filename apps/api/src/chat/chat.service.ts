import { IEmbeddingsProvider } from "../embeddings/embedding.interface";
import { IVectorStore } from "../vector-store/vector-store.interface";

class ChatService {
  constructor(
    private embeddingProvider: IEmbeddingsProvider,
    private vectorStoreProvider: IVectorStore,
  ) {}

  chat = async (dto: any) => {
    // Save message
    // Retrieve history
    // Retrive rag context
    // Call LLM with all these context
    // Receive chunks
    // Forward chunks immediately
    // Append chunks into answer buffer
    // Stream to client
    // Generation finished
    // Save assistant message

    return;
  };
}

export default ChatService;
