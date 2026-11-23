import { KnowledgeResponseDto } from "@repo/shared";
import { FileText, Text } from "lucide-react";

export const knowledgeBaseTypes = {
  text: {
    label: "Text",
    icon: Text,
  },
  file: {
    label: "File",
    icon: FileText,
  },
};

export type KnowledgeFormModalProps = {
  open: boolean;
  selectedKnowledge?: KnowledgeResponseDto | null;
  onClose: () => void;
  onSaved?: (knowledge: KnowledgeResponseDto) => void;
};
