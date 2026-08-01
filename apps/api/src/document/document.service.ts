import { IEmbeddingsProvider } from "../embeddings/embedding.interface";
import { ChunkFile } from "../prepare";
import filePrepareFactory from "../prepare/loaders/file-loader-factory";
import { FileTypes } from "../utils/enums";
import { IVectorStore } from "../vector-store/vector-store.interface";
import type { IndexDocumentRequest } from "@repo/shared/contracts/document";

class DocumentService {
  constructor(
    private embeddingProvider: IEmbeddingsProvider,
    private vectorStoreProvider: IVectorStore,
  ) {}

  index = async (dto: IndexDocumentRequest) => {
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
    let embeddings;
    try {
      embeddings = await this.embeddingProvider.embedChunks(chunks);
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
    try {
      await this.vectorStoreProvider.addDocuments(vectors);
    } catch (err) {
      console.log("Error while store embeddings to store: ", err);
      throw new Error("Error while store embeddings to store");
    }

    return;
  };
}

export default DocumentService;
