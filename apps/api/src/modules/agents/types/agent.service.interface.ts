import {
  AgentListRequestDto,
  AgentListResponseDto,
  AgentResponseDto,
  CreateAgentRequestDto,
  CreateAgentResponseDto,
} from "@repo/shared";
import { IBaseService } from "../../../core/services";

export interface IAgentService extends IBaseService {
  list(
    userId: string,
    query: AgentListRequestDto,
  ): Promise<AgentListResponseDto>;

  create(
    userId: string,
    payload: CreateAgentRequestDto,
  ): Promise<CreateAgentResponseDto>;

  getById(id: string, userId: string): Promise<AgentResponseDto | null>;
}
