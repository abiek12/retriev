import { KnowledgeListRequestDto } from "@repo/shared";
import type { IBaseRepository } from "../../../core/repositories";
import {
  Knowledge,
  KnowledgeBaseStatus,
  KnowledgeDetails,
  KnowledgeListResult,
  NewTextKnowledge,
  UpdateKnowledge,
} from "./knowledge.types";

export interface IKnowledgeRepository extends IBaseRepository {
  createText: (payload: NewTextKnowledge) => Promise<Knowledge>;

  findMany: (
    userId: string,
    query: KnowledgeListRequestDto,
  ) => Promise<KnowledgeListResult>;

  findById: (id: string, userId: string) => Promise<KnowledgeDetails | null>;

  updateById: (
    id: string,
    userId: string,
    payload: UpdateKnowledge,
  ) => Promise<Knowledge | null>;

  deleteById: (
    id: string,
    userId: string,
  ) => Promise<Pick<Knowledge, "id"> | null>;

  updateStatus: (
    id: string,
    userId: string,
    status: KnowledgeBaseStatus,
    message?: string,
  ) => Promise<Pick<Knowledge, "id"> | null>;
}
