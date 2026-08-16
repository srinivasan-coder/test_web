import type { Gallery, GalleryCategory, GalleryFilter } from "@/types";

export const GALLERY_CATEGORIES: {
  value: GalleryFilter;
  label: string;
}[] = [
  { value: "all", label: "All" },
  { value: "wedding", label: "Wedding" },
  { value: "engagement", label: "Engagement" },
  { value: "pre-wedding", label: "Pre Wedding" },
  { value: "baby", label: "Baby" },
  { value: "maternity", label: "Maternity" },
];

export const CATEGORY_LABELS: Record<GalleryCategory, string> = {
  wedding: "Wedding",
  engagement: "Engagement",
  "pre-wedding": "Pre Wedding",
  baby: "Baby",
  maternity: "Maternity",
  corporate: "Corporate",
  fashion: "Fashion",
};

export const PORTFOLIO_PAGE_SIZE = 9;

export function getCategoryLabel(category: GalleryCategory): string {
  return CATEGORY_LABELS[category];
}

export function isGalleryCategory(value: string): value is GalleryCategory {
  return value in CATEGORY_LABELS;
}

/**
 * Filter galleries by category chip and free-text search.
 */
export function filterGalleries(
  galleries: Gallery[],
  category: GalleryFilter,
  query: string,
): Gallery[] {
  const normalized = query.trim().toLowerCase();

  return galleries.filter((gallery) => {
    const matchesCategory =
      category === "all" || gallery.category === category;

    if (!matchesCategory) return false;
    if (!normalized) return true;

    const haystack = [
      gallery.title,
      gallery.description,
      gallery.location,
      gallery.client,
      gallery.category,
      getCategoryLabel(gallery.category),
      ...(gallery.tags ?? []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalized);
  });
}
