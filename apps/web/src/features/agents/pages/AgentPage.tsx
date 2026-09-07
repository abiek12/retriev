import { useEffect, useState } from "react";
import { AgentCard } from "../components/AgentCard";
import { CreateAgentCard } from "../components/CreateAgentCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getMockAgents } from "../api/mock-agents";
import { AppPagination } from "@/components/common/AppPagination";

export const AgentPage = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [agents, setAgents] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [isFetching, setIsFetching] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalAgents, setTotalAgents] = useState(0);

  useEffect(() => {
    const fetchAgents = async () => {
      setIsFetching(true);

      try {
        const res = await getMockAgents(page, pageSize);

        setAgents(res.data.agents);
        setTotalPages(res.data.pagination.totalPages);
        setTotalAgents(res.data.pagination.total);
      } finally {
        setIsFetching(false);
      }
    };
    fetchAgents();
  }, [page, pageSize]);

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  const handlePageSizeChange = (nextPageSize: number) => {
    setPageSize(nextPageSize);
    setPage(1);
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Header */}
      <div className="mb-4 flex shrink-0 items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-semibold tracking-tight">Agents</h1>
          <p className="text-muted-foreground">
            Manage and configure your specialized AI assistants.
          </p>
        </div>

        <Button
          className="cursor-pointer p-5 rounded-sm"
          onClick={() => setCreateModalOpen(true)}
        >
          <Plus className="mr-2" />
          <div className="flex items-center justify-center">Create</div>
        </Button>
      </div>

      {/* Agent List */}
      <div className="min-h-0 flex-1 overflow-y-auto pr-4">
        {agents.length === 0 && !isFetching ? (
          <div className="flex min-h-100 items-center justify-center rounded-lg border border-dashed">
            <div className="text-center">
              <p className="font-medium">No agents found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Create your first AI agent to get started.
              </p>
            </div>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
              isFetching ? "opacity-60" : ""
            }`}
          >
            {agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalAgents > 0 && (
        <div className="mt-6 shrink-0 border-t pt-4">
          <AppPagination
            page={page}
            pageSize={pageSize}
            totalPages={totalPages}
            totalItems={totalAgents}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            isFetching={isFetching}
          />
        </div>
      )}

      {createModalOpen && (
        <CreateAgentCard onClose={() => setCreateModalOpen(false)} />
      )}
    </div>
  );
};
