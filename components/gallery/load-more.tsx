"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LoadMoreProps {
  onClick: () => void;
  remaining: number;
  loading?: boolean;
  className?: string;
}

/**
 * Pagination control for the portfolio masonry.
 */
export function LoadMore({
  onClick,
  remaining,
  loading = false,
  className,
}: LoadMoreProps) {
  if (remaining <= 0) return null;

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <Button
        type="button"
        variant="outline"
        size="lg"
        onClick={onClick}
        disabled={loading}
      >
        {loading ? "Loading…" : "Load more"}
      </Button>
      <p className="text-sm text-muted-foreground">
        {remaining} more {remaining === 1 ? "project" : "projects"}
      </p>
    </div>
  );
}
