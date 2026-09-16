import {
  AgentListRequestDto,
  AgentListResponseDto,
  GetAgentResponseDto,
} from "@repo/shared";
import { IBaseService } from "../../../core/services";

export interface IAgentService extends IBaseService {
  list(
    userId: string,
    query: AgentListRequestDto,
  ): Promise<AgentListResponseDto>;
}
