"use client";

import { FilterChips } from "@/components/ui/filter-chips";
import { GALLERY_CATEGORIES } from "@/lib/gallery";
import type { GalleryFilter } from "@/types";

interface CategoryFilterProps {
  value: GalleryFilter;
  onChange: (value: GalleryFilter) => void;
  className?: string;
}

/**
 * Portfolio category chips.
 */
export function CategoryFilter({
  value,
  onChange,
  className,
}: CategoryFilterProps) {
  return (
    <FilterChips
      options={GALLERY_CATEGORIES}
      value={value}
      onChange={onChange}
      label="Filter portfolio by category"
      className={className}
    />
  );
}
