import { BaseService } from "../../core/services";
import { IKnowledgeRepository, IKnowledgeService } from "./types";

class KnowledgeService
  extends BaseService<IKnowledgeRepository>
  implements IKnowledgeService
{
  constructor(repository: IKnowledgeRepository) {
    super(repository);
  }
}

export default KnowledgeService;
