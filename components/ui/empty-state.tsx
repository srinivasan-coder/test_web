import { cn } from "@/lib/utils";
import { Button } from "./button";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

/**
 * Calm empty / no-results surface with optional reset action.
 */
export function EmptyState({
  title,
  description,
  actionLabel = "Clear filters",
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className={cn(
        "flex flex-col items-center rounded-2xl border border-border bg-secondary/50 px-8 py-16 text-center md:py-20",
        className,
      )}
    >
      <p className="type-headline">{title}</p>
      <p className="type-caption mx-auto mt-3 max-w-md">{description}</p>
      {onAction ? (
        <Button
          type="button"
          variant="outline"
          size="md"
          className="mt-8"
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
