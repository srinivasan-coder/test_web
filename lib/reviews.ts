import type { Review, ReviewCategory, ReviewFilter, RatingSummary } from "@/types";

export const REVIEW_FILTERS: { value: ReviewFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "wedding", label: "Wedding" },
  { value: "corporate", label: "Corporate" },
  { value: "baby", label: "Baby" },
  { value: "birthday", label: "Birthday" },
];

export const REVIEW_CATEGORY_LABELS: Record<ReviewCategory, string> = {
  wedding: "Wedding",
  corporate: "Corporate",
  baby: "Baby",
  birthday: "Birthday",
};

export function getReviewCategoryLabel(category: ReviewCategory): string {
  return REVIEW_CATEGORY_LABELS[category];
}

export function filterReviews(
  reviews: Review[],
  category: ReviewFilter,
): Review[] {
  if (category === "all") return reviews;
  return reviews.filter((review) => review.category === category);
}

/**
 * Build an aggregate rating summary from a review list.
 */
export function getRatingSummary(reviews: Review[]): RatingSummary {
  const distribution: RatingSummary["distribution"] = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  for (const review of reviews) {
    distribution[review.rating] += 1;
  }

  const total = reviews.length;
  const average =
    total === 0
      ? 0
      : reviews.reduce((sum, review) => sum + review.rating, 0) / total;

  return {
    average: Math.round(average * 10) / 10,
    total,
    distribution,
  };
}

/**
 * Initials for Google-style avatar fallbacks.
 */
export function getInitials(name: string): string {
  return name
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
