import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { RotateApiKeyRequestDto } from "@repo/shared";
import { createApiKey, deleteApiKey, getApiKeys, rotateApiKey } from "../api";

export const apiKeyKeys = {
  all: ["api-keys"] as const,
  lists: () => [...apiKeyKeys.all, "list"] as const,
  list: (userId: string | undefined) =>
    [...apiKeyKeys.lists(), userId] as const,
};

export const useApiKeys = () => {
  const { user } = useCurrentUser();
  return useQuery({
    queryKey: apiKeyKeys.list(user?.id),
    queryFn: getApiKeys,
  });
};

export const useCreateApiKey = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createApiKey,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: apiKeyKeys.lists() }),
    // Discard submitted secrets when the form resets the mutation.
    gcTime: 0,
  });
};

export const useRotateApiKey = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: RotateApiKeyRequestDto;
    }) => rotateApiKey(id, payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: apiKeyKeys.lists() }),
    gcTime: 0,
  });
};

export const useDeleteApiKey = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteApiKey,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: apiKeyKeys.lists() }),
  });
};
