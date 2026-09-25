import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAgent,
  deleteAgent,
  getAgentById,
  getAgents,
  updateAgent,
} from "../api";
import {
  AgentListRequestDto,
  UpdateAgentRequestDto,
} from "@repo/shared/contracts";

export const agentKeys = {
  all: ["agents"] as const,
  lists: () => [...agentKeys.all, "list"] as const,

  list: (params?: unknown) => [...agentKeys.lists(), params] as const,
  detail: (id: string) => [...agentKeys.all, "detail", id] as const,
};

export const useAgents = (params: AgentListRequestDto) => {
  return useQuery({
    queryKey: agentKeys.list(params),
    queryFn: () => getAgents(params),
  });
};

export const useAgent = (id: string) => {
  return useQuery({
    queryKey: agentKeys.detail(id),
    queryFn: () => getAgentById(id),
    enabled: Boolean(id),
  });
};

export const useCreateAgent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAgent,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: agentKeys.lists(),
      });
    },
  });
};

export const useUpdateAgent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateAgentRequestDto;
    }) => updateAgent(id, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: agentKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: agentKeys.detail(variables.id),
      });
    },
  });
};

export const useDeleteAgent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAgent,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: agentKeys.lists(),
      });
    },
  });
};
