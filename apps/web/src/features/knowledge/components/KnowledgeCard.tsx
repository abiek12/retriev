import { statusStyles } from "@/utils/common.types";
import { formatRelativeDate } from "@/utils/formatDate";
import { KnowledgeResponseDto } from "@repo/shared/contracts";
import { knowledgeBaseTypes } from "../types";

type KnowledgeProps = {
  knowledgeBase: KnowledgeResponseDto;
};

export const KnowledgeCard = ({ knowledgeBase }: KnowledgeProps) => {
  const status = statusStyles[knowledgeBase.status];
  const knowledgeTypeAssets = knowledgeBaseTypes[knowledgeBase.type];
  const formateDate = formatRelativeDate(knowledgeBase.updatedAt);

  return (
    <div className="group relative flex min-h-52 w-full flex-col rounded-lg border bg-card p-4 transition-colors hover:border-ring cursor-pointer">
      {/* Header */}
      <div className="flex items-center justify-between">
        {/* icon */}
        <div className="icon flex gap-2 item-center justify-between">
          <knowledgeTypeAssets.icon className="size-3" />
          <span>{knowledgeTypeAssets.label}</span>
        </div>

        {/* status */}
        <div
          className="flex item-center justify-between gap-2 rounded-sm border
        bg-sidebar-accent px-2 py-0.5 text-xs"
        >
          <span className={`size-1.5 rounded-full ${status.dot}`} />
          <span className="text-background">{knowledgeBase.status}</span>
        </div>
      </div>

      <h1>{status.label}</h1>
      <p>{formateDate}</p>
    </div>
  );
};
