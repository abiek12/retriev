import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AgentResponseDto } from "@repo/shared/contracts";
import { toast } from "sonner";
import { useDeleteAgent } from "../hooks/useAgents";
import { Spinner } from "@/components/ui/spinner";

type AgentDeleteModalProps = {
  open: boolean;
  agent: AgentResponseDto | null;
  onClose: () => void;
};

export const AgentDeleteModal = ({
  open,
  agent,
  onClose,
}: AgentDeleteModalProps) => {
  if (!open || !agent) return null;
  const deleteAgentMutation = useDeleteAgent();

  const handleConfirm = async () => {
    try {
      // Delete agent api call
      await deleteAgentMutation.mutateAsync(agent.id);
      toast.success("Agent deleted successfully");
      onClose();
    } catch (error) {
      console.error("Failed to delete agent:", error);
      toast.error("Failed to delete agent");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-90 p-6 [&>button]:cursor-pointer">
        <DialogHeader>
          <DialogTitle className="text-lg">Delete agent?</DialogTitle>

          <DialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-medium">{agent?.name}</span>?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={deleteAgentMutation.isPending}
          >
            {deleteAgentMutation.isPending ? (
              <div className="flex items-center gap-2">
                <Spinner />
                Deleting...
              </div>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
