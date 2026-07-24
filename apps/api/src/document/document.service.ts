import EmbeddingFactory from "../embeddings/embedding.factory";
import { EmbeddingsModelConfig } from "../embeddings/embedding.types";
import { ChunkFile, filePrepareFactory } from "../prepare";
import { FileTypes } from "../utils/enums";
import VectorStoreFactory from "../vector-store/vector-store.factory";
import { VectorStoreConfig } from "../vector-store/vector-store.types";
import { IndexDocumentDtoType } from "./dto/index-document.dto";

class DocumentService {
  async index(dto: IndexDocumentDtoType) {
    let content;

    switch (dto.type) {
      case "text":
        content = dto.text;
        break;
      case "file":
        // Load files
        const loader = filePrepareFactory.createFileLoader(FileTypes.PDF);
        content = await loader.load(dto.filePath);
    }

    // File preperation
    const contentSplitter = new ChunkFile(500, 100);

    // Split loaded content into chunks
    const chunks = await contentSplitter.textSplitter(content);

    // Embeddings
    const embeddingProvider = EmbeddingFactory.getInstance(
      EmbeddingsModelConfig.OPENAI,
    );

    let embeddings;
    try {
      embeddings = await embeddingProvider.embedChunks(chunks);
    } catch (err) {
      console.log("Error while embedding doc: ", err);
      throw new Error("error while embeddings");
    }

    // prepare vector
    const vectors = chunks.map((chunk, index) => ({
      id: crypto.randomUUID(),
      values: embeddings[index],
      metadata: {
        text: chunk,
      },
    }));

    // Store in vector store
    const vectorStoreProvider = VectorStoreFactory.getInstance(
      VectorStoreConfig.PINECONE,
    );
    try {
      await vectorStoreProvider.addDocuments(vectors);
    } catch (err) {
      console.log("Error while store embeddings to store: ", err);
      throw new Error("Error while store embeddings to store");
    }

    return;
  }
}

export default new DocumentService();
