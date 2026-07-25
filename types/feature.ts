/**
 * A "Why Choose Us" differentiator card.
 */
export interface Feature {
  id: string;
  title: string;
  description: string;
  /** Lucide icon name resolved via `getIcon`. */
  icon: string;
}
