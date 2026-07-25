"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BlogPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/**
 * Numbered pagination for the journal grid.
 */
export function BlogPagination({
  page,
  totalPages,
  onPageChange,
  className,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Journal pagination"
      className={cn("flex items-center justify-center gap-2", className)}
    >
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft className="size-4" />
      </Button>

      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          aria-label={`Page ${pageNumber}`}
          aria-current={pageNumber === page ? "page" : undefined}
          onClick={() => onPageChange(pageNumber)}
          className={cn(
            "inline-flex size-11 items-center justify-center rounded-full text-sm font-medium transition-all duration-300",
            pageNumber === page
              ? "bg-ink text-white shadow-sm"
              : "border border-border text-muted-foreground hover:bg-secondary hover:text-foreground",
          )}
        >
          {pageNumber}
        </button>
      ))}

      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Next page"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRight className="size-4" />
      </Button>
    </nav>
  );
}
