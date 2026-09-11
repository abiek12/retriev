import { Skeleton } from "@/components/ui/skeleton";

export const AgentCardSkeleton = () => {
  return (
    <div
      aria-hidden="true"
      className="flex min-h-52 w-full flex-col rounded-lg border bg-card p-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton className="size-9 rounded-sm" />
        <Skeleton className="h-5 w-14 rounded-sm" />
      </div>

      {/* Details */}
      <div className="mt-4 flex flex-1 flex-col">
        <Skeleton className="h-7 w-3/5" />

        <div className="mt-1 space-y-1.5">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-4/5" />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
};
