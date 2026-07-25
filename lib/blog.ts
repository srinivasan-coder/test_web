import type { BlogCategory, BlogFilter, BlogPost } from "@/types";

export const BLOG_PAGE_SIZE = 6;

export const BLOG_CATEGORIES: { value: BlogFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "tips", label: "Tips" },
  { value: "behind-the-scenes", label: "Behind the Scenes" },
  { value: "gear", label: "Gear" },
  { value: "inspiration", label: "Inspiration" },
  { value: "news", label: "News" },
];

export const BLOG_CATEGORY_LABELS: Record<BlogCategory, string> = {
  tips: "Tips",
  "behind-the-scenes": "Behind the Scenes",
  gear: "Gear",
  inspiration: "Inspiration",
  news: "News",
};

export function getBlogCategoryLabel(category: BlogCategory): string {
  return BLOG_CATEGORY_LABELS[category];
}

export function isBlogCategory(value: string): value is BlogCategory {
  return value in BLOG_CATEGORY_LABELS;
}

/**
 * Filter posts by category chip and free-text search.
 */
export function filterPosts(
  posts: BlogPost[],
  category: BlogFilter,
  query: string,
): BlogPost[] {
  const normalized = query.trim().toLowerCase();

  return posts.filter((post) => {
    const matchesCategory = category === "all" || post.category === category;
    if (!matchesCategory) return false;
    if (!normalized) return true;

    const haystack = [
      post.title,
      post.excerpt,
      post.category,
      getBlogCategoryLabel(post.category),
      post.author.name,
      ...(post.tags ?? []),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalized);
  });
}

/**
 * Sort newest first.
 */
export function sortPostsByDate(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}
