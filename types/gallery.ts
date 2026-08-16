/**
 * A single image with responsive metadata used across galleries + lightboxes.
 */
export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Optional low-quality placeholder (base64 data URL). */
  blurDataURL?: string;
}

export type GalleryCategory =
  | "wedding"
  | "engagement"
  | "pre-wedding"
  | "baby"
  | "maternity"
  | "corporate"
  | "fashion";

export type GalleryOrientation = "portrait" | "landscape" | "square";

/**
 * A curated gallery / project — the core of the portfolio.
 */
export interface Gallery {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: GalleryCategory;
  cover: ImageAsset;
  images: ImageAsset[];
  /** Primary orientation, used to size masonry / grid cells. */
  orientation: GalleryOrientation;
  location?: string;
  client?: string;
  date: string;
  featured?: boolean;
  tags?: string[];
}

/**
 * Lightweight image shape consumed by the portfolio lightbox.
 */
export interface LightboxSlide {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  title?: string;
  description?: string;
}

/** Filter chip including the "All" sentinel. */
export type GalleryFilter = "all" | GalleryCategory;
