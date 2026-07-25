"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { cn, formatDate } from "@/lib/utils";
import {
  getInitials,
  getReviewCategoryLabel,
} from "@/lib/reviews";
import { EASE_OUT_SOFT } from "@/lib/animations";
import type { Review } from "@/types";
import { StarRating } from "./star-rating";

interface ReviewCardProps {
  review: Review;
  className?: string;
  index?: number;
}

/**
 * Google-style review card — avatar, stars, quote, meta.
 */
export function ReviewCard({ review, className, index = 0 }: ReviewCardProps) {
  const reduceMotion = useReducedMotion();
  const initials = getInitials(review.author);

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.05, 0.3),
        ease: EASE_OUT_SOFT,
      }}
      className={cn(
        "flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-md sm:p-7",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative size-11 shrink-0 overflow-hidden rounded-full bg-secondary">
            {review.avatar ? (
              <Image
                src={review.avatar}
                alt={review.author}
                fill
                sizes="44px"
                className="object-cover"
              />
            ) : (
              <span className="flex size-full items-center justify-center text-sm font-semibold text-primary">
                {initials}
              </span>
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              {review.author}
            </p>
            <p className="text-xs text-muted-foreground">
              {[review.role, review.company].filter(Boolean).join(" · ")}
            </p>
          </div>
        </div>
        <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {getReviewCategoryLabel(review.category)}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <StarRating rating={review.rating} size="sm" />
        <time
          dateTime={review.date}
          className="text-xs text-muted-foreground"
        >
          {formatDate(review.date, { month: "short", day: "numeric", year: "numeric" })}
        </time>
      </div>

      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground sm:text-base">
        “{review.quote}”
      </blockquote>

      <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
        <span>
          {review.source === "google" ? "Posted on Google" : "Studio review"}
        </span>
        {review.location ? <span>{review.location}</span> : null}
      </div>
    </motion.article>
  );
}
