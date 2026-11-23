import { AgentResponseDto } from "@repo/shared";

export type AgentFormModalProps = {
  open: boolean;
  selectedAgent?: AgentResponseDto | null;
  onClose: () => void;
};

export type AgentCardProps = {
  agent: AgentResponseDto;
  onEdit: (agent: AgentResponseDto) => void;
  onDelete: (agent: AgentResponseDto) => void;
};
