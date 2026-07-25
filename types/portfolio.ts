import type { ImageAsset } from "./gallery";

/**
 * Portfolio category shown on the home Featured Portfolio grid.
 */
export interface PortfolioCategory {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: ImageAsset;
  /** Approximate number of projects in this category. */
  count: number;
}
