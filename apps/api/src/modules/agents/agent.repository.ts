import { AgentListRequestDto, CreateAgentRequestDto } from "@repo/shared";
import { BaseRepository } from "../../core/repositories";
import { IAgentRepository } from "./types/agent.repository.interface";
import { AgentListResult, Agent, NewAgent } from "./types";
import { agent } from "@repo/database";
import { and, eq, desc, like, count } from "drizzle-orm";

class AgentRepository extends BaseRepository implements IAgentRepository {
  findMany = async (
    userId: string,
    query: AgentListRequestDto,
  ): Promise<AgentListResult> => {
    const { page, limit, search, provider, status } = query;
    const offset = (page - 1) * limit;

    const conditions = [eq(agent.userId, userId)];

    if (search) {
      conditions.push(like(agent.name, `%${search}%`));
    }
    if (provider) {
      conditions.push(eq(agent.provider, provider));
    }
    if (status) {
      conditions.push(eq(agent.status, status));
    }

    const customWhere = and(...conditions);

    const [records, totalResult] = await Promise.all([
      this.database
        .select()
        .from(agent)
        .where(customWhere)
        .orderBy(desc(agent.updatedAt))
        .limit(limit)
        .offset(offset),

      this.database
        .select({
          total: count(),
        })
        .from(agent)
        .where(customWhere),
    ]);

    return {
      records,
      total: totalResult[0]?.total ?? 0,
    };
  };

  create = async (data: NewAgent): Promise<Pick<Agent, "id" | "name">> => {
    const [record] = await this.database.insert(agent).values(data).returning({
      id: agent.id,
      name: agent.name,
    });

    return record;
  };

  findById = async (id: string, userId: string): Promise<Agent | null> => {
    const [record] = await this.database
      .select()
      .from(agent)
      .where(and(eq(agent.id, id), eq(agent.userId, userId)))
      .limit(1);

    return record ?? null;
  };
}

export default AgentRepository;
