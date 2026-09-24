import { apiClient } from "@/lib/apiClient";
import type {
  AgentListRequestDto,
  GetAgentListResponseDto,
} from "@repo/shared/contracts";

export const getAgents = async (
  params?: AgentListRequestDto,
): Promise<GetAgentListResponseDto> => {
  const response = await apiClient.get<GetAgentListResponseDto>("/agent", {
    params,
  });

  return response.data;
};
