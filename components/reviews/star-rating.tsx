import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  showValue?: boolean;
}

const sizeMap = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
} as const;

/**
 * Filled / empty star row for Google-style review cards.
 */
export function StarRating({
  rating,
  max = 5,
  size = "md",
  className,
  showValue = false,
}: StarRatingProps) {
  const clamped = Math.max(0, Math.min(rating, max));

  return (
    <div
      className={cn("inline-flex items-center gap-1", className)}
      aria-label={`${clamped} out of ${max} stars`}
    >
      {Array.from({ length: max }).map((_, index) => {
        const filled = index < Math.round(clamped);
        return (
          <Star
            key={index}
            className={cn(
              sizeMap[size],
              filled ? "fill-current text-primary" : "text-border",
            )}
          />
        );
      })}
      {showValue ? (
        <span className="ml-1.5 text-sm font-medium text-foreground">
          {clamped.toFixed(1)}
        </span>
      ) : null}
    </div>
  );
}
