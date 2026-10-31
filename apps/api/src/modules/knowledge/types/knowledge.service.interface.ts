import {
  CreateKnowledgeRequestDto,
  CreateKnowledgeResponseDto,
  DeleteKnowledgeResponseDto,
  GetKnowledgeResponseDto,
  KnowledgeListRequestDto,
  KnowledgeListResponseDto,
  UpdateKnowledgeRequestDto,
  UpdateKnowledgeResponseDto,
} from "@repo/shared";
import type { IBaseService } from "../../../core/services";

export interface IKnowledgeService extends IBaseService {
  create(
    userId: string,
    payload: CreateKnowledgeRequestDto,
  ): Promise<CreateKnowledgeResponseDto>;

  list(
    userId: string,
    query: KnowledgeListRequestDto,
  ): Promise<KnowledgeListResponseDto>;

  getById(id: string, userId: string): Promise<GetKnowledgeResponseDto>;

  update(
    id: string,
    userId: string,
    payload: UpdateKnowledgeRequestDto,
  ): Promise<UpdateKnowledgeResponseDto>;

  delete(id: string, userId: string): Promise<DeleteKnowledgeResponseDto>;

  completeFileUpload(id: string, userId: string): Promise<void>;
}
