import {
  filePrepareFactory,
  RecursiveCharacterChunker,
} from "../../infrastructure/prepare";
import { FileType } from "../../common/enums/file-type.enum";
import { BaseService } from "../../core/services";
import type { IndexDocumentRequest } from "@repo/shared/contracts";
import { IVectorStore } from "../../infrastructure/vector-store";
import { IEmbeddingsProvider } from "../../infrastructure/embeddings";
import { IDocumentRepository, IDocumentService } from "./types";

class DocumentService
  extends BaseService<IDocumentRepository>
  implements IDocumentService
{
  constructor(
    repository: IDocumentRepository,
    private embeddingProvider: IEmbeddingsProvider,
    private vectorStoreProvider: IVectorStore,
  ) {
    super(repository);
  }

  index = async (dto: IndexDocumentRequest) => {
    let content;

    switch (dto.type) {
      case "text":
        content = dto.text;
        break;
      case "file":
        // Load files
        const loader = filePrepareFactory.createFileLoader(FileType.PDF);
        content = await loader.load(dto.filePath);
    }

    // File preperation
    const contentSplitter = new RecursiveCharacterChunker(500, 100);

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
