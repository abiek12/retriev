import { statusStyles } from "@/utils/common.types";
import { formatRelativeDate } from "@/utils/formatDate";
import { KnowledgeResponseDto } from "@repo/shared/contracts";

type KnowledgeProps = {
  knowledgeBase: KnowledgeResponseDto;
};

export const KnowledgeCard = ({ knowledgeBase }: KnowledgeProps) => {
  const status = statusStyles[knowledgeBase.status];
  const formateDate = formatRelativeDate(knowledgeBase.updatedAt);

  return (
    <div>
      <h1>{status.label}</h1>
      <p>{formateDate}</p>
    </div>
  );
};
