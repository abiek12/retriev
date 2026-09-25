import { apiClient } from "@/lib/apiClient";
import type {
  AgentListRequestDto,
  AgentResponseDto,
  CreateAgentRequestDto,
  CreateAgentResponseDto,
  DeleteAgentRequestDto,
  GetAgentListResponseDto,
  UpdateAgentRequestDto,
  UpdateAgentResponseDto,
} from "@repo/shared/contracts";

export const getAgents = async (
  params?: AgentListRequestDto,
): Promise<GetAgentListResponseDto> => {
  const response = await apiClient.get<GetAgentListResponseDto>("/agent", {
    params,
  });

  return response.data;
};

export const createAgent = async (
  payload: CreateAgentRequestDto,
): Promise<CreateAgentResponseDto> => {
  const response = await apiClient.post("/agent", payload);

  return response.data;
};

export const updateAgent = async (
  id: string,
  payload: UpdateAgentRequestDto,
): Promise<UpdateAgentResponseDto> => {
  const response = await apiClient.put(`/agent/${id}`, payload);

  return response.data;
};

export const getAgentById = async (id: string): Promise<AgentResponseDto> => {
  const response = await apiClient.get(`/agent/${id}`);

  return response.data;
};

export const deleteAgent = async (id: DeleteAgentRequestDto): Promise<void> => {
  const response = await apiClient.delete(`/agent/${id}`);

  return response.data;
};
