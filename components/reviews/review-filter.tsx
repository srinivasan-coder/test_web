"use client";

import { FilterChips } from "@/components/ui/filter-chips";
import { REVIEW_FILTERS } from "@/lib/reviews";
import type { ReviewFilter as ReviewFilterValue } from "@/types";

interface ReviewFilterProps {
  value: ReviewFilterValue;
  onChange: (value: ReviewFilterValue) => void;
  className?: string;
}

/**
 * Reviews category chips.
 */
export function ReviewFilter({
  value,
  onChange,
  className,
}: ReviewFilterProps) {
  return (
    <FilterChips
      options={REVIEW_FILTERS}
      value={value}
      onChange={onChange}
      label="Filter reviews by category"
      className={className}
    />
  );
}
