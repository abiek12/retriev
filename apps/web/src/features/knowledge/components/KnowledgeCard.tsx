import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { statusStyles } from "@/utils/common.types";
import { formatRelativeDate } from "@/utils/formatDate";
import { KnowledgeResponseDto } from "@repo/shared/contracts";
import { knowledgeBaseTypes } from "../types";

type KnowledgeProps = {
  knowledgeBase: KnowledgeResponseDto;
  onEdit: (knowledgeBase: KnowledgeResponseDto) => void;
  onDelete: (knowledgeBase: KnowledgeResponseDto) => void;
};

export const KnowledgeCard = ({
  knowledgeBase,
  onEdit,
  onDelete,
}: KnowledgeProps) => {
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

        {/* status + action */}
        <div className="relative flex h-8 items-center">
          <div
            className="flex items-center justify-between gap-2 rounded-sm border
            bg-sidebar-accent
           px-2 py-0.5 text-xs transition-transform duration-200 ease-out
           group-hover:-translate-x-10 group-focus-within:-translate-x-10 group-has-data-popup-open:-translate-x-10"
          >
            <span className={`size-1.5 rounded-full ${status.dot}`} />
            <span className="text-foreground">{knowledgeBase.status}</span>
          </div>

          {/* Actions */}
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger
                render={
                  <DropdownMenuTrigger
                    type="button"
                    aria-label={`Actions for ${knowledgeBase.title}`}
                    className="absolute right-0 top-0 flex size-8 translate-x-2 opacity-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-all duration-200 ease-out hover:bg-surface-container-high hover:text-foreground group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100 data-popup-open:translate-x-0 data-popup-open:opacity-100"
                    onClick={(event) => event.stopPropagation()}
                  />
                }
              >
                <MoreHorizontal className="size-4" />
                <span className="sr-only">actions</span>
              </TooltipTrigger>
              <TooltipContent>actions</TooltipContent>
            </Tooltip>

            <DropdownMenuContent align="end" className="w-36">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => onEdit(knowledgeBase)}
              >
                <Pencil className="mr-2 size-4" />
                Edit
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="text-destructive focus:text-destructive cursor-pointer"
                onClick={() => onDelete(knowledgeBase)}
              >
                <Trash2 className="mr-2 size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
