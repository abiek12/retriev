import { fileSource, knowledgeBase, textSource } from "@repo/database";
import { BaseRepository } from "../../core/repositories";
import type {
  IKnowledgeRepository,
  Knowledge,
  KnowledgeDetails,
  KnowledgeListResult,
  NewTextKnowledge,
  UpdateKnowledge,
} from "./types";
import type { KnowledgeListRequestDto } from "@repo/shared";
import { and, count, desc, eq, ilike } from "drizzle-orm";

class KnowledgeRepository
  extends BaseRepository
  implements IKnowledgeRepository
{
  createText = async (payload: NewTextKnowledge): Promise<Knowledge> => {
    return this.database.transaction(async (tx) => {
      const [newKnowledgeBase] = await tx
        .insert(knowledgeBase)
        .values({
          userId: payload.userId,
          title: payload.title,
          description: payload.description,
          type: "text",
        })
        .returning();

      if (!newKnowledgeBase) {
        throw new Error("Failed to create text knowledge base");
      }

      await tx.insert(textSource).values({
        content: payload.content,
        knowledgeBaseId: newKnowledgeBase.id,
      });

      return newKnowledgeBase;
    });
  };

  findMany = async (
    userId: string,
    query: KnowledgeListRequestDto,
  ): Promise<KnowledgeListResult> => {
    const { page, limit, search, type, status } = query;
    const offset = (page - 1) * limit;
    const conditions = [eq(knowledgeBase.userId, userId)];

    if (search) {
      conditions.push(ilike(knowledgeBase.title, `%${search}%`));
    }
    if (type) {
      conditions.push(eq(knowledgeBase.type, type));
    }
    if (status) {
      conditions.push(eq(knowledgeBase.status, status));
    }

    const where = and(...conditions);

    const [recordCount, records] = await Promise.all([
      this.database.select({ total: count() }).from(knowledgeBase).where(where),
      this.database
        .select()
        .from(knowledgeBase)
        .where(where)
        .orderBy(desc(knowledgeBase.updatedAt))
        .limit(limit)
        .offset(offset),
    ]);

    return {
      records,
      total: recordCount[0]?.total ?? 0,
    };
  };

  findById = async (
    userId: string,
    id: string,
  ): Promise<KnowledgeDetails | null> => {
    const [record] = await this.database
      .select({
        knowledge: knowledgeBase,
        textSource,
        fileSource,
      })
      .from(knowledgeBase)
      .leftJoin(textSource, eq(textSource.knowledgeBaseId, knowledgeBase.id))
      .leftJoin(fileSource, eq(fileSource.knowledgeBaseId, knowledgeBase.id))
      .where(and(eq(knowledgeBase.id, id), eq(knowledgeBase.userId, userId)))
      .limit(1);

    return record ?? null;
  };

  updateById = async (
    userId: string,
    id: string,
    payload: UpdateKnowledge,
  ): Promise<Knowledge | null> => {
    const [record] = await this.db
      .update(knowledgeBase)
      .set({ ...payload, updatedAt: new Date() })
      .where(and(eq(knowledgeBase.id, id), eq(knowledgeBase.userId, userId)))
      .returning();

    return record ?? null;
  };

  deleteById = async (
    userId: string,
    id: string,
  ): Promise<Pick<Knowledge, "id"> | null> => {
    const [record] = await this.db
      .delete(knowledgeBase)
      .where(and(eq(knowledgeBase.id, id), eq(knowledgeBase.userId, userId)))
      .returning({ id: knowledgeBase.id });

    return record ?? null;
  };

  markFailed = async (
    id: string,
    userId: string,
    errorMessage: string,
  ): Promise<Pick<Knowledge, "id"> | null> => {
    const [record] = await this.db
      .update(knowledgeBase)
      .set({
        errorMessage,
        status: "failed",
      })
      .where(and(eq(knowledgeBase.id, id), eq(knowledgeBase.userId, userId)))
      .returning({ id: knowledgeBase.id });

    return record ?? null;
  };
}

export default KnowledgeRepository;
