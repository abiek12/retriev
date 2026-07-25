import { IEmbeddingsProvider } from "../embeddings/embedding.interface";
import { IVectorStore } from "../vector-store/vector-store.interface";
import { UserChatQueryType } from "./dto/query-chat.dto";

class ChatService {
  constructor(
    private embeddingProvider: IEmbeddingsProvider,
    private vectorStoreProvider: IVectorStore,
  ) {}

  chat = async (dto: UserChatQueryType) => {
    // Save message
    // Retrieve history

    // Embed user query.
    const embeddedQuery = await this.embeddingProvider.embedChunk(
      dto.userQuery,
    );

    // Retrive rag context
    const memoryContext = await this.vectorStoreProvider.similaritySearch(
      embeddedQuery,
      5,
    );

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
