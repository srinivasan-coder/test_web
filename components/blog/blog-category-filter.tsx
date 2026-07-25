"use client";

import { FilterChips } from "@/components/ui/filter-chips";
import { BLOG_CATEGORIES } from "@/lib/blog";
import type { BlogFilter } from "@/types";

interface BlogCategoryFilterProps {
  value: BlogFilter;
  onChange: (value: BlogFilter) => void;
  className?: string;
}

/**
 * Journal category chips.
 */
export function BlogCategoryFilter({
  value,
  onChange,
  className,
}: BlogCategoryFilterProps) {
  return (
    <FilterChips
      options={BLOG_CATEGORIES}
      value={value}
      onChange={onChange}
      label="Filter journal by category"
      className={className}
    />
  );
}
