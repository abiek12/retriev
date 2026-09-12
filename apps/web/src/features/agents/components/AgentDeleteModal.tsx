import { AgentResponseDto } from "@repo/shared/contracts";
import { toast } from "sonner";

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

  const handleConfirm = () => {
    // Delete agent api call
    console.log("agent", agent);
    toast.success("Agent deleted successfully");
    onClose();
  };

  return (
    <div>
      <h2>Delete Agent</h2>
      <p>Are you sure you want to delete the agent "{agent.name}"?</p>
      <button onClick={handleConfirm}>Yes</button>
      <button onClick={onClose}>No</button>
    </div>
  );
};
