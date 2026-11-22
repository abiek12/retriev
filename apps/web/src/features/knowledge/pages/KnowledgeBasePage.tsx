import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { getKnowledgeBases } from "../api/mock-knowledge";
import { KnowledgeResponseDto } from "@repo/shared";
import { KnowledgeCard } from "../components/KnowledgeCard";

export const KnowledgeBasePage = () => {
  // const [knowledgeModalOpen, setKnowledgeModalOpen] = useState(false);
  const [knowledgeBases, setKnowledgeBase] = useState<KnowledgeResponseDto[]>(
    [],
  );

  useEffect(() => {
    const fetchKnowledgeBases = async () => {
      const resData = await getKnowledgeBases({
        page: 1,
        limit: 10,
      });

      setKnowledgeBase(resData.data);
    };

    fetchKnowledgeBases();
  }, []);

  return (
    <div className="">
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
                aria-label="Create a new agent"
                className="cursor-pointer p-5 rounded-sm"
                onClick={() => console.log("test")}
              />
            }
          >
            <Plus className="mr-2" />
            <div className="flex items-center justify-center">Create</div>
          </TooltipTrigger>
        </Tooltip>
      </div>

      {/* Knowledge List */}
      <div className="min-h-0 flex-1 overflow-y-auto pr-4">
        {knowledgeBases.map((knowledgeBase) => (
          <KnowledgeCard knowledgeBase={knowledgeBase} />
        ))}
      </div>

      {/* Pagination */}

      {/* Modal */}
    </div>
  );
};
