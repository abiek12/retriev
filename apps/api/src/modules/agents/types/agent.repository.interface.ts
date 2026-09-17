import { IBaseRepository } from "../../../core/repositories";
import { AgentListRequestDto } from "@repo/shared";
import { AgentListResult, Agent, NewAgent, UpdateAgent } from "./agent.types";

export interface IAgentRepository extends IBaseRepository {
  findMany: (
    userId: string,
    query: AgentListRequestDto,
  ) => Promise<AgentListResult>;

  create: (data: NewAgent) => Promise<Pick<Agent, "id" | "name">>;

  findById: (id: string, userId: string) => Promise<Agent | null>;

  updateById: (
    id: string,
    userId: string,
    data: UpdateAgent,
  ) => Promise<Pick<Agent, "id"> | null>;
}
