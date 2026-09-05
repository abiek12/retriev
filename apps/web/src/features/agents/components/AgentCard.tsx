import { MoreHorizontal } from "lucide-react";

export const AgentCard = () => {
  return (
    <div className="group relative flex min-h-52 w-full flex-col rounded-lg border bg-card p-4 transition-colors hover:border-ring cursor-pointer">
      {/* Header */}
      <div className="flex items-center justify-between">
        {/* Agent icon */}
        <div className="flex size-9 items-center justify-center rounded-sm bg-surface-container-high text-sm font-medium">
          CS
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
            <span className="size-1.5 rounded-full bg-green-500" />

            <span className="text-foreground">Live</span>
          </div>

          {/* Actions */}
          <button
            type="button"
            aria-label="Agent actions"
            className="
              absolute right-0
              flex size-8 items-center justify-center
              rounded-md text-muted-foreground
              opacity-0 translate-x-2
              transition-all duration-200 ease-out
              group-hover:translate-x-0
              group-hover:opacity-100
              hover:bg-surface-container-high
              hover:text-foreground
              cursor-pointer
            "
          >
            <MoreHorizontal className="size-4" />
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="mt-4 flex flex-1 flex-col">
        <h2 className="text-xl font-semibold tracking-tight cursor-pointer">
          Customer Support
        </h2>

        <p className="mt-1 line-clamp-2 text-sm leading-5 text-muted-foreground">
          Handles tier 1 support inquiries and routes complex issues to human
          agents...
        </p>
      </div>

      {/* Footer */}
      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Updated</span>

          <span>2 hours ago</span>
        </div>
      </div>
    </div>
  );
};
