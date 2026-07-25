import type { ImageAsset } from "./gallery";

export type Currency = "USD" | "EUR" | "GBP";

/**
 * Pricing tier attached to a service (optional detailed packages).
 */
export interface PricingTier {
  id: string;
  name: string;
  price: number;
  currency: Currency;
  /** Billing note, e.g. "per day", "starting at". */
  unit?: string;
  description: string;
  features: string[];
  featured?: boolean;
}

/**
 * A studio offering presented as a luxury product section.
 * `icon` maps to a Lucide icon name resolved at render time.
 */
export interface Service {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  icon: string;
  image: ImageAsset;
  /** Deliverables listed under "What's Included". */
  includes: string[];
  /** Package highlights / differentiators. */
  highlights: string[];
  /** Alias used by compact cards (mirrors includes). */
  features?: string[];
  pricing?: PricingTier[];
  startingPrice?: number;
  currency?: Currency;
  /** e.g. "Starting from" — shown with the price placeholder. */
  priceLabel?: string;
  /** Portfolio deep-link for "View Gallery". */
  galleryHref: string;
  featured?: boolean;
}

/**
 * FAQ entry for the Services page.
 */
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
