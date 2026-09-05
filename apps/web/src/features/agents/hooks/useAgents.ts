import { useQuery } from "@tanstack/react-query";
import { getAgents } from "../api";

export const agentKeys = {
  all: ["agents"] as const,
  lists: () => [...agentKeys.all, "list"] as const,

  list: (params?: unknown) => [...agentKeys.lists(), params] as const,
  detail: (id: string) => [...agentKeys.all, "detail", id] as const,
};

export const useAgents = () => {
  return useQuery({
    queryKey: agentKeys.lists(),
    queryFn: () => getAgents(),
  });
};
