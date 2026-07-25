import type { ImageAsset } from "./gallery";

/**
 * Minimal author reference used on blog cards.
 */
export interface BlogAuthor {
  name: string;
  avatar?: string;
  role?: string;
}

export type BlogCategory =
  | "tips"
  | "behind-the-scenes"
  | "gear"
  | "inspiration"
  | "news";

export type BlogFilter = "all" | BlogCategory;

/**
 * A journal / blog article.
 * `content` is Markdown-ready and rendered on the article page.
 */
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Markdown body for the article page. */
  content: string;
  cover: ImageAsset;
  category: BlogCategory;
  author: BlogAuthor;
  publishedAt: string;
  /** Estimated reading time in minutes. */
  readingTime: number;
  tags?: string[];
  featured?: boolean;
}
