import { apiClient } from "@/lib/apiClient";
import type {
  CreateApiKeyRequestDto,
  CreateApiKeyResponseDto,
  GetApiKeyResponseDto,
  RotateApiKeyRequestDto,
  RotateApiKeyResponseDto,
  SuccessResponse,
} from "@repo/shared";

export const getApiKeys = async (): Promise<GetApiKeyResponseDto> => {
  const response = await apiClient.get<SuccessResponse<GetApiKeyResponseDto>>(
    "/api-keys",
    { params: { page: 1, limit: 100 } },
  );
  return response.data.data;
};

export const createApiKey = async (
  payload: CreateApiKeyRequestDto,
): Promise<CreateApiKeyResponseDto> => {
  const response = await apiClient.post<
    SuccessResponse<CreateApiKeyResponseDto>
  >("/api-keys", payload);
  return response.data.data;
};

export const rotateApiKey = async (
  id: string,
  payload: RotateApiKeyRequestDto,
): Promise<RotateApiKeyResponseDto> => {
  const response = await apiClient.post<
    SuccessResponse<RotateApiKeyResponseDto>
  >(`/api-keys/${id}/rotate`, payload);
  return response.data.data;
};

export const deleteApiKey = async (id: string): Promise<void> => {
  await apiClient.delete(`/api-keys/${id}`);
};
