import { useEffect, useState } from "react";
import { AgentCard } from "../components/AgentCard";
import { CreateAgentCard } from "../components/CreateAgentCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getMockAgents } from "../api/mock-agents";

export const AgentPage = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [agents, setAgents] = useState<any[]>([]);

  useEffect(() => {
    const fetchAgents = async () => {
      const data = await getMockAgents();
      setAgents(data);
    };
    fetchAgents();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
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
      {agents.length === 0 ? (
        <p>No agents found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {agents.map((agent, index) => (
            <AgentCard key={index} agent={agent} />
          ))}
        </div>
      )}

      {createModalOpen && (
        <CreateAgentCard onClose={() => setCreateModalOpen(false)} />
      )}
    </div>
  );
};
