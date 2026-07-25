"use client";

import { SearchField } from "@/components/ui/search-field";
import { BlogCategoryFilter } from "./blog-category-filter";
import type { BlogFilter } from "@/types";

interface BlogHeroProps {
  query: string;
  onQueryChange: (value: string) => void;
  category: BlogFilter;
  onCategoryChange: (value: BlogFilter) => void;
}

/**
 * Journal controls — search + category filters beneath the page header.
 */
export function BlogHero({
  query,
  onQueryChange,
  category,
  onCategoryChange,
}: BlogHeroProps) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <BlogCategoryFilter value={category} onChange={onCategoryChange} />
      <SearchField
        value={query}
        onChange={onQueryChange}
        placeholder="Search articles…"
        label="Search journal"
        className="w-full lg:max-w-sm"
      />
    </div>
  );
}
