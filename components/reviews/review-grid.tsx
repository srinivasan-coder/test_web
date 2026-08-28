"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ResultsSummary } from "@/components/ui/results-summary";
import { EmptyState } from "@/components/ui/empty-state";
import { filterReviews } from "@/lib/reviews";
import type { Review, ReviewFilter as ReviewFilterValue } from "@/types";
import { ReviewFilter } from "./review-filter";
import { ReviewCard } from "./review-card";

interface ReviewGridProps {
  reviews: Review[];
}

/**
 * Filterable Google-style review card grid.
 */
export function ReviewGrid({ reviews }: ReviewGridProps) {
  const [category, setCategory] =
    React.useState<ReviewFilterValue>("all");

  const filtered = React.useMemo(
    () => filterReviews(reviews, category),
    [reviews, category],
  );

  return (
    <section className="section-y">
      <Container>
        <AnimatedSection className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Client reviews"
            title="What people are saying"
            description="Real feedback from weddings, families, and celebrations — styled with the clarity of a Google review."
          />
          <ReviewFilter value={category} onChange={setCategory} />
        </AnimatedSection>

        <ResultsSummary
          className="mt-6"
          visible={filtered.length}
          total={filtered.length}
          noun="review"
        />

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((review, index) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <ReviewCard review={review} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            className="mt-8"
            title="No reviews in this category"
            description="Try another filter to explore more client feedback."
            actionLabel="Show all reviews"
            onAction={() => setCategory("all")}
          />
        ) : null}
      </Container>
    </section>
  );
}
