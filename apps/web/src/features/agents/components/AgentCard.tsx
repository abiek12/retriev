import { AgentResponseDto } from "@repo/shared/contracts";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { statusStyles } from "../types";
import { formatRelativeDate } from "../../../utils/formatDate";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type AgentCardProps = {
  agent: AgentResponseDto;
  onEdit: (agent: AgentResponseDto) => void;
  onDelete: (agent: AgentResponseDto) => void;
};

export const AgentCard = ({ agent, onEdit, onDelete }: AgentCardProps) => {
  const status = statusStyles[agent.status];
  const formattedDate = formatRelativeDate(agent.updatedAt);

  return (
    <div className="group relative flex min-h-52 w-full flex-col rounded-lg border bg-card p-4 transition-colors hover:border-ring cursor-pointer">
      {/* Header */}
      <div className="flex items-center justify-between">
        {/* Agent icon */}
        <div className="flex size-9 items-center justify-center rounded-sm bg-surface-container-high text-sm font-medium">
          {agent.name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </div>

        {/* Status + Actions */}
        <div className="relative flex h-8 items-center">
          {/* Status */}
          <div
            className="
              flex items-center gap-2 rounded-sm border
              bg-sidebar-accent px-2 py-0.5 text-xs
              transition-transform duration-200 ease-out
              group-hover:-translate-x-10
            "
          >
            <span className={`size-1.5 rounded-full ${status.dot}`} />

            <span className="text-foreground">{agent.status}</span>
          </div>

          {/* Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger
              type="button"
              aria-label={`Actions for ${agent.name}`}
              className="absolute right-0 top-0 flex size-8 translate-x-2 cursor-pointer items-center justify-center rounded-md text-muted-foreground opacity-0 transition-all duration-200 ease-out hover:bg-surface-container-high hover:text-foreground group-hover:translate-x-0 group-hover:opacity-100 data-popup-open:translate-x-0 data-popup-open:opacity-100"
              onClick={(event) => event.stopPropagation()}
            >
              <MoreHorizontal className="size-4" />
              <span className="sr-only">Agent actions</span>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-36">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => onEdit(agent)}
              >
                <Pencil className="mr-2 size-4" />
                Edit
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="text-destructive focus:text-destructive cursor-pointer"
                onClick={() => onDelete(agent)}
              >
                <Trash2 className="mr-2 size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Details */}
      <div className="mt-4 flex flex-1 flex-col">
        <h2 className="text-xl font-semibold tracking-tight cursor-pointer">
          {agent.name}
        </h2>

        <p className="mt-1 line-clamp-2 text-sm leading-5 text-muted-foreground">
          {agent.description}
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
