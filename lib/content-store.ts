import { readJsonDoc, writeJsonDoc } from "@/lib/json-store";

import { galleries as seedGalleries } from "@/data/gallery";
import { team as seedTeam } from "@/data/team";
import { reviews as seedReviews } from "@/data/reviews";
import { instagramPosts as seedInstagramPosts } from "@/data/instagram";
import {
  getImageOverrides,
  resolveGallerySeedWith,
  resolveTeamSeedWith,
  resolveReviewSeedWith,
  resolveInstagramSeedWith,
} from "@/lib/site-images";
import { getGalleryOverrides } from "@/lib/gallery-overrides";
import { getInstagramOverrides } from "@/lib/instagram-overrides";
import type { Gallery, GalleryCategory } from "@/types/gallery";
import type { TeamMember } from "@/types/team";
import type { Review } from "@/types/review";
import type { InstagramPost } from "@/types/instagram";

async function readStore<T>(file: string): Promise<T[]> {
  return readJsonDoc<T[]>(`data-db/${file}`, []);
}

async function appendToStore<T extends { id: string }>(file: string, item: T): Promise<void> {
  const existing = await readStore<T>(file);
  existing.push(item);
  await writeJsonDoc(`data-db/${file}`, existing);
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
  const [imageOverrides, galleryOverrides, added] = await Promise.all([
    getImageOverrides(),
    getGalleryOverrides(),
    readStore<Gallery>("galleries.json"),
  ]);
  const seedResolved = resolveGallerySeedWith(imageOverrides, seedGalleries);
  const merged: Array<Gallery & { hidden?: boolean }> = [...seedResolved, ...added].map((g) => {
    const patch = galleryOverrides[g.id];
    return patch ? { ...g, ...patch } : g;
  });
  return merged.filter((g) => !g.hidden);
}

export async function getGalleryByIdAsync(id: string): Promise<Gallery | undefined> {
  return (await getAllGalleries()).find((g) => g.id === id);
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

export async function getReviewIds(): Promise<Set<string>> {
  return new Set((await getAllReviews()).map((r) => r.id));
}

export async function addReview(review: Review): Promise<void> {
  await appendToStore("reviews.json", review);
}

// --- Instagram ---------------------------------------------------------------

export async function getAllInstagramPosts(): Promise<InstagramPost[]> {
  const [overrides, instagramOverrides, added] = await Promise.all([
    getImageOverrides(),
    getInstagramOverrides(),
    readStore<InstagramPost>("instagram.json"),
  ]);
  const seedResolved = resolveInstagramSeedWith(overrides, seedInstagramPosts);
  const merged: Array<InstagramPost & { hidden?: boolean }> = [...seedResolved, ...added].map(
    (post) => {
      const patch = instagramOverrides[post.id];
      return patch ? { ...post, ...patch } : post;
    },
  );
  return merged.filter((post) => !post.hidden);
}

export async function getInstagramPostByIdAsync(id: string): Promise<InstagramPost | undefined> {
  return (await getAllInstagramPosts()).find((post) => post.id === id);
}

export async function getInstagramIds(): Promise<Set<string>> {
  return new Set((await getAllInstagramPosts()).map((p) => p.id));
}

export async function addInstagramPost(post: InstagramPost): Promise<void> {
  await appendToStore("instagram.json", post);
}
