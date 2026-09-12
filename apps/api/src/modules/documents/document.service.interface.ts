import type { IndexDocumentRequest } from "@repo/shared/contracts";
import type { IBaseService } from "../../core/services";

export interface IDocumentService extends IBaseService {
  index(dto: IndexDocumentRequest): Promise<void>;
}
