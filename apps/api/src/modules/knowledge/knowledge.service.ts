import { BaseService } from "../../core/services";
import { IVectorStore } from "../../infrastructure/vector-store";
import { IEmbeddingsProvider } from "../../infrastructure/embeddings";
import { IKnowledgeRepository, IKnowledgeService } from "./types";

class KnowledgeService
  extends BaseService<IKnowledgeRepository>
  implements IKnowledgeService
{
  constructor(
    repository: IKnowledgeRepository,
    private embeddingProvider: IEmbeddingsProvider,
    private vectorStoreProvider: IVectorStore,
  ) {
    super(repository);
  }
}

export default KnowledgeService;
