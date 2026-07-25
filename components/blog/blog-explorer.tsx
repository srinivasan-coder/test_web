"use client";

import * as React from "react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ResultsSummary } from "@/components/ui/results-summary";
import { EmptyState } from "@/components/ui/empty-state";
import {
  BLOG_PAGE_SIZE,
  filterPosts,
  sortPostsByDate,
} from "@/lib/blog";
import type { BlogFilter, BlogPost } from "@/types";
import { BlogHero } from "./blog-hero";
import { FeaturedArticle } from "./featured-article";
import { BlogCard } from "./blog-card";
import { BlogPagination } from "./blog-pagination";

interface BlogExplorerProps {
  posts: BlogPost[];
}

/**
 * Client orchestrator for the journal index — search, filters, featured, pagination.
 */
export function BlogExplorer({ posts }: BlogExplorerProps) {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<BlogFilter>("all");
  const [page, setPage] = React.useState(1);

  const sorted = React.useMemo(() => sortPostsByDate(posts), [posts]);

  const featured = React.useMemo(() => {
    if (query || category !== "all") return null;
    return sorted.find((post) => post.featured) ?? sorted[0] ?? null;
  }, [sorted, query, category]);

  const filtered = React.useMemo(() => {
    const result = filterPosts(sorted, category, query);
    if (featured) {
      return result.filter((post) => post.id !== featured.id);
    }
    return result;
  }, [sorted, category, query, featured]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / BLOG_PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (safePage - 1) * BLOG_PAGE_SIZE,
    safePage * BLOG_PAGE_SIZE,
  );
  const hasFilters = category !== "all" || query.length > 0;

  React.useEffect(() => {
    setPage(1);
  }, [query, category]);

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
  };

  return (
    <section className="section-y-tight" aria-label="Journal explorer">
      <Container>
        <BlogHero
          query={query}
          onQueryChange={setQuery}
          category={category}
          onCategoryChange={setCategory}
        />

        {featured ? (
          <div className="mt-12">
            <FeaturedArticle post={featured} />
          </div>
        ) : null}

        {pageItems.length > 0 ? (
          <>
            <AnimatedSection className="mt-16">
              <SectionHeading
                eyebrow="Recent posts"
                title="From the journal"
                description="Notes on light, process, gear, and the quiet decisions behind our work."
              />
            </AnimatedSection>

            <ResultsSummary
              className="mt-6"
              visible={pageItems.length}
              total={filtered.length}
              noun="article"
            />

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {pageItems.map((post, index) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  index={index}
                  priority={index < 3 && safePage === 1}
                />
              ))}
            </div>

            <BlogPagination
              className="mt-12"
              page={safePage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        ) : (
          <EmptyState
            className="mt-12"
            title="No articles found"
            description="Try another category or clear your search to browse the full journal."
            actionLabel={hasFilters ? "Clear filters" : undefined}
            onAction={hasFilters ? clearFilters : undefined}
          />
        )}
      </Container>
    </section>
  );
}
