import { apiClient } from "@/lib/apiClient";
import type {
  CreateKnowledgeRequestDto,
  CreateKnowledgeResponseDto,
  GetKnowledgeResponseDto,
  SuccessResponse,
  UpdateKnowledgeRequestDto,
  UpdateKnowledgeResponseDto,
} from "@repo/shared";

export const createKnowledge = async (payload: CreateKnowledgeRequestDto) => {
  const response = await apiClient.post<
    SuccessResponse<CreateKnowledgeResponseDto>
  >("/knowledge-bases", payload);
  return response.data.data;
};

export const updateKnowledge = async (
  id: string,
  payload: UpdateKnowledgeRequestDto,
) => {
  const response = await apiClient.patch<
    SuccessResponse<UpdateKnowledgeResponseDto>
  >(`/knowledge-bases/${id}`, payload);
  return response.data.data;
};

export const getKnowledge = async (id: string) => {
  const response = await apiClient.get<
    SuccessResponse<GetKnowledgeResponseDto>
  >(`/knowledge-bases/${id}`);
  return response.data.data;
};

export const completeKnowledgeUpload = async (id: string) => {
  await apiClient.post(`/knowledge-bases/${id}/upload-complete`);
};
