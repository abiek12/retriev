import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type AppPaginationProps = {
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;

  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;

  isFetching?: boolean;
  pageSizeOptions?: number[];
};

export const AppPagination = ({
  page,
  pageSize,
  totalPages,
  totalItems,
  onPageChange,
  onPageSizeChange,
  isFetching = false,
  pageSizeOptions = [10, 20, 50, 100],
}: AppPaginationProps) => {
  const startItem = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;

  const endItem = Math.min(page * pageSize, totalItems);

  const canGoPrevious = page > 1 && !isFetching;
  const canGoNext = page < totalPages && !isFetching;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Results information */}
      <div className="text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-medium text-foreground">
          {startItem}-{endItem}
        </span>{" "}
        of <span className="font-medium text-foreground">{totalItems}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        {/* Page size */}
        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap text-sm text-muted-foreground">
            Rows per page
          </span>

          <Select
            value={String(pageSize)}
            onValueChange={(value) => {
              onPageSizeChange(Number(value));
            }}
            disabled={isFetching}
          >
            <SelectTrigger className="h-9 w-18.75 cursor-pointer">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Page navigation */}
        <Pagination className="mx-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="outline"
                size="icon"
                className="cursor-pointer"
                disabled={!canGoPrevious}
                onClick={() => {
                  if (canGoPrevious) {
                    onPageChange(page - 1);
                  }
                }}
              >
                <ChevronLeft className="size-4" />
              </Button>
            </PaginationItem>

            <PaginationItem>
              <div className="flex h-9 min-w-22.5 items-center justify-center rounded-md border px-3 text-sm">
                <span className="font-medium">{page}</span>

                <span className="mx-1 text-muted-foreground">/</span>

                <span className="text-muted-foreground">{totalPages}</span>
              </div>
            </PaginationItem>

            <PaginationItem>
              <Button
                variant="outline"
                size="icon"
                disabled={!canGoNext}
                className="cursor-pointer"
                onClick={() => {
                  if (canGoNext) {
                    onPageChange(page + 1);
                  }
                }}
              >
                <ChevronRight className="size-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
