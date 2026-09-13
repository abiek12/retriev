import type { IndexKnowledgeSourceRequest } from "@repo/shared/contracts";
import type { IBaseService } from "../../../core/services";

export interface IKnowledgeService extends IBaseService {
  indexSource(dto: IndexKnowledgeSourceRequest): Promise<void>;
}
