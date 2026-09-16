import { IBaseRepository } from "../../../core/repositories";
import { AgentListRequestDto, GetAgentResponseDto } from "@repo/shared";
import { AgentListResult } from "./agent.types";

export interface IAgentRepository extends IBaseRepository {
  findMany: (
    userId: string,
    query: AgentListRequestDto,
  ) => Promise<AgentListResult>;
}
