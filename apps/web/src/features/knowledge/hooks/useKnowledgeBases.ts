import { useQuery } from "@tanstack/react-query";
import type { KnowledgeListRequestDto } from "@repo/shared";
import { getKnowledgeBases } from "../api";

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
