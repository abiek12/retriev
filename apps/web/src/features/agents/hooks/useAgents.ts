import { useQuery } from "@tanstack/react-query";
import { getAgents } from "../api";
import { AgentListRequestDto } from "@repo/shared/contracts";

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
