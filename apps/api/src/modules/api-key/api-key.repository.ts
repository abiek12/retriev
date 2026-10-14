import { userApiKey } from "@repo/database";
import { and, count, desc, eq, or } from "drizzle-orm";
import { BaseRepository } from "@/core/repositories";
import { ApiKey, ApiKeyListQuery, ApiKeyListResult, NewApiKey } from "./types";
import { IApiKeyRepository } from "./types/api-key.repository.interface";

class ApiKeyRepository extends BaseRepository implements IApiKeyRepository {
  create = async (data: NewApiKey): Promise<Pick<ApiKey, "id" | "title">> => {
    const [record] = await this.database
      .insert(userApiKey)
      .values(data)
      .returning({ id: userApiKey.id, title: userApiKey.title });

    return record;
  };

  findMany = async (
    userId: string,
    queries: ApiKeyListQuery,
  ): Promise<ApiKeyListResult> => {
    const { page, limit, provider } = queries;
    const offset = (page - 1) * limit;
    const conditions = [
      or(eq(userApiKey.userId, userId), eq(userApiKey.isPlatform, true)),
    ];

    if (provider) {
      conditions.push(eq(userApiKey.provider, provider));
    }

    const where = and(...conditions);
    const [records, totalResult] = await Promise.all([
      this.database
        .select()
        .from(userApiKey)
        .where(where)
        .orderBy(desc(userApiKey.updatedAt))
        .limit(limit)
        .offset(offset),
      this.database.select({ total: count() }).from(userApiKey).where(where),
    ]);

    return {
      records,
      total: totalResult[0]?.total ?? 0,
    };
  };

  findById = async (id: string, userId: string): Promise<ApiKey | null> => {
    const [record] = await this.database
      .select()
      .from(userApiKey)
      .where(and(eq(userApiKey.id, id), eq(userApiKey.userId, userId)))
      .limit(1);

    return record ?? null;
  };

  update = async (
    id: string,
    userId: string,
    data: Partial<NewApiKey>,
  ): Promise<ApiKey | null> => {
    const [record] = await this.database
      .update(userApiKey)
      .set({ ...data, updatedAt: new Date() })
      .where(and(eq(userApiKey.id, id), eq(userApiKey.userId, userId)))
      .returning();

    return record ?? null;
  };

  delete = async (id: string, userId: string): Promise<boolean> => {
    const [record] = await this.database
      .delete(userApiKey)
      .where(and(eq(userApiKey.id, id), eq(userApiKey.userId, userId)))
      .returning({ id: userApiKey.id });

    return Boolean(record);
  };

  findCapabilityConflict = async (
    userId: string,
    supportText: boolean,
    supportEmbedding: boolean,
  ): Promise<ApiKey | null> => {
    const capabilityConditions = [];
    if (supportText) {
      capabilityConditions.push(eq(userApiKey.supportText, true));
    }
    if (supportEmbedding) {
      capabilityConditions.push(eq(userApiKey.supportEmbedding, true));
    }

    if (capabilityConditions.length === 0) {
      return null;
    }

    const [record] = await this.database
      .select()
      .from(userApiKey)
      .where(
        and(
          eq(userApiKey.userId, userId),
          or(...capabilityConditions),
        ),
      )
      .limit(1);

    return record ?? null;
  };
}

export default ApiKeyRepository;
