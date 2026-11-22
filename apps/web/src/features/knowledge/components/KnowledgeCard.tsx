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
  const formattedDate = formatRelativeDate(knowledgeBase.updatedAt);

  return (
    <div className="group relative flex min-h-52 w-full flex-col rounded-lg border bg-card p-4 transition-colors hover:border-ring cursor-pointer">
      {/* Header */}
      <div className="flex items-center justify-between">
        {/* icon */}
        <div
          className="flex items-center gap-2 rounded-sm border
        bg-sidebar-accent px-2 py-0.5 text-xs"
        >
          <knowledgeTypeAssets.icon className="size-3" />
          <span>{knowledgeTypeAssets.label}</span>
        </div>

        {/* status */}
        <div
          className={`flex items-center justify-between gap-2 rounded-sm
         px-2 py-0.5 text-xs ${status.bg} border ${status.border}`}
        >
          <span className={`size-1.5 rounded-full ${status.dot}`} />
          <span className={`${status.text}`}>{knowledgeBase.status}</span>
        </div>
      </div>

      {/* body */}
      <div className="mt-5 flex flex-1 flex-col">
        <h2 className="text-lg font-semibold tracking-tight cursor-pointer">
          {knowledgeBase.title}
        </h2>

        <p className="mt-1 line-clamp-2 text-sm leading-5 text-muted-foreground">
          {knowledgeBase.description}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Updated</span>

          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};
