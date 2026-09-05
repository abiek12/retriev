import { useState } from "react";
import { AgentCard } from "../components/AgentCard";
import { CreateAgentCard } from "../components/CreateAgentCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const AgentPage = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

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
      <AgentCard />

      {createModalOpen && (
        <CreateAgentCard onClose={() => setCreateModalOpen(false)} />
      )}
    </div>
  );
};
