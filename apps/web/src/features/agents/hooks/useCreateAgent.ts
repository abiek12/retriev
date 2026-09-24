import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAgent } from "../api";
import { agentKeys } from "./useAgents";

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
