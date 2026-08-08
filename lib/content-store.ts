import { readJsonBlob, writeJsonBlob } from "@/lib/blob-store";

import { galleries as seedGalleries } from "@/data/gallery";
import { team as seedTeam } from "@/data/team";
import { reviews as seedReviews } from "@/data/reviews";
import { instagramPosts as seedInstagramPosts } from "@/data/instagram";
import { blogPosts as seedBlogPosts } from "@/data/blog";
import {
  getImageOverrides,
  resolveGallerySeedWith,
  resolveTeamSeedWith,
  resolveReviewSeedWith,
  resolveInstagramSeedWith,
  resolveBlogSeedWith,
} from "@/lib/site-images";
import type { Gallery, GalleryCategory } from "@/types/gallery";
import type { TeamMember } from "@/types/team";
import type { Review } from "@/types/review";
import type { InstagramPost } from "@/types/instagram";
import type { BlogPost } from "@/types/blog";

async function readStore<T>(file: string): Promise<T[]> {
  return readJsonBlob<T[]>(`data-db/${file}`, []);
}

async function appendToStore<T extends { id: string }>(file: string, item: T): Promise<void> {
  const existing = await readStore<T>(file);
  existing.push(item);
  await writeJsonBlob(`data-db/${file}`, existing);
}

/** Turns "A New Gallery!" into "a-new-gallery", de-duped against a list of taken slugs. */
export function slugify(input: string, taken: Set<string>): string {
  const base =
    input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "item";
  let slug = base;
  let n = 2;
  while (taken.has(slug)) {
    slug = `${base}-${n}`;
    n += 1;
  }
  return slug;
}

// --- Galleries ---------------------------------------------------------

export async function getAllGalleries(): Promise<Gallery[]> {
  const [overrides, added] = await Promise.all([
    getImageOverrides(),
    readStore<Gallery>("galleries.json"),
  ]);
  return [...resolveGallerySeedWith(overrides, seedGalleries), ...added];
}

export async function getFeaturedGalleries(): Promise<Gallery[]> {
  return (await getAllGalleries()).filter((g) => g.featured);
}

export async function getGalleryBySlugAsync(slug: string): Promise<Gallery | undefined> {
  return (await getAllGalleries()).find((g) => g.slug === slug);
}

export async function getGalleriesByCategoryAsync(category: GalleryCategory): Promise<Gallery[]> {
  return (await getAllGalleries()).filter((g) => g.category === category);
}

export async function getGallerySlugs(): Promise<Set<string>> {
  return new Set((await getAllGalleries()).map((g) => g.slug));
}

export async function addGallery(gallery: Gallery): Promise<void> {
  await appendToStore("galleries.json", gallery);
}

// --- Team ----------------------------------------------------------------

export async function getAllTeam(): Promise<TeamMember[]> {
  const [overrides, added] = await Promise.all([
    getImageOverrides(),
    readStore<TeamMember>("team.json"),
  ]);
  return [...resolveTeamSeedWith(overrides, seedTeam), ...added];
}

export async function getFeaturedTeam(): Promise<TeamMember[]> {
  return (await getAllTeam()).filter((m) => m.featured);
}

export async function getTeamSlugs(): Promise<Set<string>> {
  return new Set((await getAllTeam()).map((m) => m.slug));
}

export async function addTeamMember(member: TeamMember): Promise<void> {
  await appendToStore("team.json", member);
}

// --- Reviews ---------------------------------------------------------------

export async function getAllReviews(): Promise<Review[]> {
  const [overrides, added] = await Promise.all([
    getImageOverrides(),
    readStore<Review>("reviews.json"),
  ]);
  return [...resolveReviewSeedWith(overrides, seedReviews), ...added];
}

export async function getFeaturedReviewsAsync(): Promise<Review[]> {
  return (await getAllReviews()).filter((r) => r.featured);
}

export async function getFeaturedStoriesAsync(): Promise<Review[]> {
  return (await getAllReviews()).filter((r) => r.featured && Boolean(r.story));
}

export async function getReviewIds(): Promise<Set<string>> {
  return new Set((await getAllReviews()).map((r) => r.id));
}

export async function addReview(review: Review): Promise<void> {
  await appendToStore("reviews.json", review);
}

// --- Instagram ---------------------------------------------------------------

export async function getAllInstagramPosts(): Promise<InstagramPost[]> {
  const [overrides, added] = await Promise.all([
    getImageOverrides(),
    readStore<InstagramPost>("instagram.json"),
  ]);
  return [...resolveInstagramSeedWith(overrides, seedInstagramPosts), ...added];
}

export async function getInstagramIds(): Promise<Set<string>> {
  return new Set((await getAllInstagramPosts()).map((p) => p.id));
}

export async function addInstagramPost(post: InstagramPost): Promise<void> {
  await appendToStore("instagram.json", post);
}

// --- Blog ---------------------------------------------------------------

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const [overrides, added] = await Promise.all([
    getImageOverrides(),
    readStore<BlogPost>("blog.json"),
  ]);
  return [...resolveBlogSeedWith(overrides, seedBlogPosts), ...added];
}

export async function getFeaturedBlogPostsAsync(): Promise<BlogPost[]> {
  return (await getAllBlogPosts()).filter((p) => p.featured);
}

export async function getBlogPostBySlugAsync(slug: string): Promise<BlogPost | undefined> {
  return (await getAllBlogPosts()).find((p) => p.slug === slug);
}

export async function getAllBlogSlugsAsync(): Promise<string[]> {
  return (await getAllBlogPosts()).map((p) => p.slug);
}

export async function getBlogSlugs(): Promise<Set<string>> {
  return new Set((await getAllBlogPosts()).map((p) => p.slug));
}

export async function addBlogPost(post: BlogPost): Promise<void> {
  await appendToStore("blog.json", post);
}
