import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { knowledgeKeys, useKnowledgeBases } from "../hooks/useKnowledgeBases";
import { AppPagination } from "@/components/common/AppPagination";
import { Spinner } from "@/components/ui/spinner";
import { KnowledgeResponseDto } from "@repo/shared";
import { KnowledgeFormModal } from "../components/KnowledgeFormModal";
import { KnowledgeCard } from "../components/KnowledgeCard";

export const KnowledgeBasePage = () => {
  const [knowledgeModalOpen, setKnowledgeModalOpen] = useState(false);
  const [selectedKnowledge, setSelectedKnowledge] =
    useState<KnowledgeResponseDto | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching, isError, refetch } = useKnowledgeBases({
    page,
    limit: pageSize,
  });
  const knowledgeBases = data?.data ?? [];
  const pagination = data?.pagination;

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Header */}
      <div className="mb-4 flex shrink-0 items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Knowledge Bases
          </h1>
          <p className="text-muted-foreground">
            Organise and manage the knowledge used by your AI agents.
          </p>
        </div>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                aria-label="Create a new knowledge source"
                className="cursor-pointer p-5 rounded-sm"
                onClick={() => {
                  setSelectedKnowledge(null);
                  setKnowledgeModalOpen(true);
                }}
              />
            }
          >
            <Plus className="mr-2" />
            <div className="flex items-center justify-center">Create</div>
          </TooltipTrigger>
        </Tooltip>
      </div>

      {/* Knowledge list container */}
      <div className="min-h-0 flex-1 overflow-y-auto pr-4">
        {isError ? (
          <div
            role="alert"
            className="flex min-h-52 flex-col items-center justify-center gap-3 rounded-lg border"
          >
            <p>Failed to load knowledge bases.</p>
            <Button
              variant="outline"
              disabled={isFetching}
              onClick={() => void refetch()}
            >
              Try again
            </Button>
          </div>
        ) : isLoading ? (
          <div
            role="status"
            className="flex min-h-52 items-center justify-center gap-2"
          >
            <Spinner /> Loading knowledge bases…
          </div>
        ) : knowledgeBases.length === 0 ? (
          <div className="flex min-h-52 flex-col items-center justify-center gap-2 rounded-lg border border-dashed">
            <p className="font-medium">No knowledge bases found</p>
            <p className="text-sm text-muted-foreground">
              Create your first knowledge source to get started.
            </p>
          </div>
        ) : (
          <div
            aria-busy={isFetching}
            className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${isFetching ? "opacity-60" : ""}`}
          >
            {knowledgeBases.map((knowledgeBase) => (
              <KnowledgeCard
                key={knowledgeBase.id}
                knowledgeBase={knowledgeBase}
                onEdit={(knowledgeBase) => {
                  setSelectedKnowledge(knowledgeBase);
                  setKnowledgeModalOpen(true);
                }}
                onDelete={(knowledgeBase) =>
                  console.log("Delete knowledge base:", knowledgeBase.id)
                }
              />
            ))}
          </div>
        )}
      </div>

      {!isError && pagination && pagination.total > 0 && (
        <div className="mt-6 shrink-0 border-t pt-4">
          <AppPagination
            page={page}
            pageSize={pageSize}
            totalPages={pagination.totalPages}
            totalItems={pagination.total}
            onPageChange={setPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setPage(1);
            }}
            isFetching={isFetching}
          />
        </div>
      )}

      <KnowledgeFormModal
        open={knowledgeModalOpen}
        selectedKnowledge={selectedKnowledge}
        onClose={() => setKnowledgeModalOpen(false)}
        onSaved={() => {
          if (!selectedKnowledge) setPage(1);
          void queryClient.invalidateQueries({ queryKey: knowledgeKeys.lists });
        }}
      />
    </div>
  );
};
