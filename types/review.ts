/**
 * Review categories used by the Reviews page filters.
 */
export type ReviewCategory =
  | "wedding"
  | "engagement"
  | "pre-wedding"
  | "baby"
  | "maternity"
  | "corporate"
  | "birthday";

export type ReviewFilter = "all" | ReviewCategory;

export type ReviewSource = "google" | "studio";

/**
 * A client testimonial / review.
 */
export interface Review {
  id: string;
  author: string;
  /** Role or context, e.g. "Bride", "Creative Director". */
  role?: string;
  company?: string;
  avatar?: string;
  /** Whole-number rating from 1–5. */
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  date: string;
  category: ReviewCategory;
  source?: ReviewSource;
  /** Optional link to the related project / service. */
  serviceSlug?: string;
  featured?: boolean;
  /** Longer narrative used in Featured Stories. */
  story?: string;
  location?: string;
  /** Large visual for Featured Stories. */
  cover?: string;
}

/**
 * Video testimonial placeholder for the Reviews carousel.
 */
export interface VideoTestimonial {
  id: string;
  title: string;
  client: string;
  category: ReviewCategory;
  /** Poster / thumbnail image. */
  poster: string;
  duration: string;
  quote: string;
}

/**
 * Aggregate rating summary for the Reviews hero.
 */
export interface RatingSummary {
  average: number;
  total: number;
  /** Distribution counts for stars 5 → 1. */
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
}
