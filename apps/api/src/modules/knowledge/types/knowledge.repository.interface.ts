import { KnowledgeListRequestDto } from "@repo/shared";
import type { IBaseRepository } from "../../../core/repositories";
import {
  Knowledge,
  KnowledgeListResult,
  NewTextKnowledge,
  UpdateKnowledge,
} from "./knowledge.types";

export interface IKnowledgeRepository extends IBaseRepository {
  createText: (
    userId: string,
    payload: NewTextKnowledge,
  ) => Promise<Pick<Knowledge, "id" | "title">>;

  findMany: (
    userId: string,
    query: KnowledgeListRequestDto,
  ) => Promise<KnowledgeListResult>;

  findById: (userId: string, id: string) => Promise<Knowledge | null>;

  updateById: (
    userId: string,
    id: string,
    payload: UpdateKnowledge,
  ) => Promise<Pick<Knowledge, "id" | "title">>;

  deleteById: (
    userId: string,
    id: string,
  ) => Promise<Pick<Knowledge, "id"> | null>;
}
