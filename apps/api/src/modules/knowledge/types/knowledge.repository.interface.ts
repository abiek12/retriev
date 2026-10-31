import { KnowledgeListRequestDto } from "@repo/shared";
import type { IBaseRepository } from "../../../core/repositories";
import {
  Knowledge,
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

  findById: (userId: string, id: string) => Promise<KnowledgeDetails | null>;

  updateById: (
    userId: string,
    id: string,
    payload: UpdateKnowledge,
  ) => Promise<Knowledge | null>;

  deleteById: (
    userId: string,
    id: string,
  ) => Promise<Pick<Knowledge, "id"> | null>;

  markFailed: (
    id: string,
    userId: string,
    errorMessage: string,
  ) => Promise<Pick<Knowledge, "id"> | null>;
}
