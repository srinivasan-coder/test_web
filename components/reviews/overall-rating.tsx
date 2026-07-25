"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { EASE_OUT_SOFT } from "@/lib/animations";
import type { RatingSummary } from "@/types";
import { StarRating } from "./star-rating";

interface OverallRatingProps {
  summary: RatingSummary;
}

/**
 * Aggregate rating hero — average score, stars, and distribution bars.
 */
export function OverallRating({ summary }: OverallRatingProps) {
  const reduceMotion = useReducedMotion();
  const maxCount = Math.max(...Object.values(summary.distribution), 1);

  return (
    <section className="border-b border-border bg-secondary/40">
      <Container className="py-14 md:py-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: EASE_OUT_SOFT }}
          className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16"
        >
          <div className="text-center lg:text-left">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
              Overall rating
            </p>
            <p className="mt-4 font-serif text-6xl font-semibold tracking-tight text-foreground sm:text-7xl">
              {summary.average.toFixed(1)}
            </p>
            <div className="mt-3 flex justify-center lg:justify-start">
              <StarRating rating={summary.average} size="lg" />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Based on {summary.total.toLocaleString()} client reviews
            </p>
          </div>

          <div className="space-y-3">
            {([5, 4, 3, 2, 1] as const).map((star) => {
              const count = summary.distribution[star];
              const width = `${(count / maxCount) * 100}%`;
              return (
                <div key={star} className="flex items-center gap-3">
                  <span className="w-10 shrink-0 text-right text-sm font-medium text-muted-foreground">
                    {star}★
                  </span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-border/70">
                    <motion.div
                      initial={reduceMotion ? { width } : { width: 0 }}
                      whileInView={{ width }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.8,
                        delay: (5 - star) * 0.06,
                        ease: EASE_OUT_SOFT,
                      }}
                      className="h-full rounded-full bg-primary"
                    />
                  </div>
                  <span className="w-8 shrink-0 text-sm text-muted-foreground">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
