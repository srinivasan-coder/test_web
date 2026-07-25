"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Container } from "@/components/ui/container";
import { ResultsSummary } from "@/components/ui/results-summary";
import { EmptyState } from "@/components/ui/empty-state";
import {
  filterGalleries,
  isGalleryCategory,
  PORTFOLIO_PAGE_SIZE,
} from "@/lib/gallery";
import type { Gallery, GalleryFilter } from "@/types";
import { CategoryFilter } from "./category-filter";
import { Search } from "./search";
import { GalleryGrid } from "./gallery-grid";
import { LoadMore } from "./load-more";

interface PortfolioExplorerProps {
  galleries: Gallery[];
  initialCategory?: GalleryFilter;
}

/**
 * Client orchestrator — category chips, search, masonry, lightbox, load more.
 */
export function PortfolioExplorer({
  galleries,
  initialCategory = "all",
}: PortfolioExplorerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [category, setCategory] = React.useState<GalleryFilter>(initialCategory);
  const [query, setQuery] = React.useState("");
  const [visibleCount, setVisibleCount] = React.useState(PORTFOLIO_PAGE_SIZE);

  React.useEffect(() => {
    const param = searchParams.get("category");
    if (!param || param === "all") {
      setCategory("all");
      return;
    }
    if (isGalleryCategory(param)) {
      setCategory(param);
    }
  }, [searchParams]);

  const filtered = React.useMemo(
    () => filterGalleries(galleries, category, query),
    [galleries, category, query],
  );

  const visible = filtered.slice(0, visibleCount);
  const remaining = Math.max(filtered.length - visible.length, 0);
  const hasFilters = category !== "all" || query.length > 0;

  React.useEffect(() => {
    setVisibleCount(PORTFOLIO_PAGE_SIZE);
  }, [category, query]);

  const handleCategoryChange = (next: GalleryFilter) => {
    setCategory(next);
    const params = new URLSearchParams(searchParams.toString());
    if (next === "all") {
      params.delete("category");
    } else {
      params.set("category", next);
    }
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const clearFilters = () => {
    setQuery("");
    handleCategoryChange("all");
  };

  return (
    <section className="section-y-tight" aria-label="Portfolio explorer">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <CategoryFilter value={category} onChange={handleCategoryChange} />
          <Search
            value={query}
            onChange={setQuery}
            placeholder="Search projects…"
            label="Search portfolio"
            className="w-full lg:max-w-sm"
          />
        </div>

        <ResultsSummary
          className="mt-6"
          visible={visible.length}
          total={filtered.length}
          noun="project"
        />

        <div className="mt-10">
          {visible.length > 0 ? (
            <GalleryGrid galleries={visible} />
          ) : (
            <EmptyState
              title="No projects found"
              description="Try another category or clear your search to explore the full portfolio."
              actionLabel={hasFilters ? "Clear filters" : undefined}
              onAction={hasFilters ? clearFilters : undefined}
            />
          )}
        </div>

        <LoadMore
          className="mt-12"
          remaining={remaining}
          onClick={() =>
            setVisibleCount((count) => count + PORTFOLIO_PAGE_SIZE)
          }
        />
      </Container>
    </section>
  );
}
