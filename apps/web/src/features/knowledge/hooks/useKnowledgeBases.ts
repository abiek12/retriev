import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { KnowledgeListRequestDto } from "@repo/shared";
import { deleteKnowledge, getKnowledgeBases } from "../api";

export const knowledgeKeys = {
  lists: ["knowledge-bases", "list"] as const,
  list: (params: KnowledgeListRequestDto) =>
    [...knowledgeKeys.lists, params] as const,
};

export const useKnowledgeBases = (params: KnowledgeListRequestDto) =>
  useQuery({
    queryKey: knowledgeKeys.list(params),
    queryFn: ({ signal }) => getKnowledgeBases(params, signal),
  });

export const useDeleteKnowledge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteKnowledge,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: knowledgeKeys.lists });
    },
  });
};
