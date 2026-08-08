import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import type { Gallery } from "@/types/gallery";
import type { TeamMember } from "@/types/team";
import type { Review, VideoTestimonial } from "@/types/review";
import type { InstagramPost } from "@/types/instagram";
import type { BlogPost } from "@/types/blog";
import type { Service } from "@/types/service";
import type { PortfolioCategory } from "@/types/portfolio";
import type { StudioStory } from "@/types/about";

const FILE = path.join(process.cwd(), "data", "db", "site-images.json");

type Override = { path: string; updatedAt: number };
type Overrides = Record<string, Override>;

function key(section: string, slotId: string): string {
  return `${section}:${slotId}`;
}

async function readOverrides(): Promise<Overrides> {
  try {
    const raw = await readFile(FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

/** All current overrides — one file read, reused across a whole page render. */
export async function getImageOverrides(): Promise<Overrides> {
  return readOverrides();
}

function resolve(overrides: Overrides, section: string, slotId: string, fallbackPath: string): string {
  const override = overrides[key(section, slotId)];
  if (!override) return fallbackPath;
  // The file path itself stays fixed (reusing a path Next's dev server has
  // already served avoids a dev-mode race on brand-new files), but the URL
  // still needs to change per update — otherwise Next's own server-side
  // image-optimization cache keeps serving the old cached render even after
  // the source file changes. A version query does that without touching disk.
  return `${override.path}?v=${override.updatedAt}`;
}

export async function setImageOverride(section: string, slotId: string, filePath: string): Promise<void> {
  const overrides = await readOverrides();
  overrides[key(section, slotId)] = { path: filePath, updatedAt: Date.now() };
  await writeFile(FILE, JSON.stringify(overrides, null, 2));
}

/** Resolves a single fixed-slot image (hero, cta, about studio story). */
export async function resolveSingleImage(
  section: string,
  slotId: string,
  fallbackPath: string,
): Promise<string> {
  const overrides = await getImageOverrides();
  return resolve(overrides, section, slotId, fallbackPath);
}

export async function resolveServices(seed: Service[]): Promise<Service[]> {
  const overrides = await getImageOverrides();
  return seed.map((s) => ({
    ...s,
    image: { ...s.image, src: resolve(overrides, "services", s.slug, s.image.src) },
  }));
}

export async function resolvePortfolioCategories(
  seed: PortfolioCategory[],
): Promise<PortfolioCategory[]> {
  const overrides = await getImageOverrides();
  return seed.map((c) => ({
    ...c,
    image: { ...c.image, src: resolve(overrides, "portfolio-categories", c.slug, c.image.src) },
  }));
}

export async function resolveStudioStory(seed: StudioStory): Promise<StudioStory> {
  const overrides = await getImageOverrides();
  return {
    ...seed,
    image: { ...seed.image, src: resolve(overrides, "about", "studio-story", seed.image.src) },
  };
}

/** Resolves seed team avatars using overrides already loaded by the caller. */
export function resolveTeamSeedWith(overrides: Overrides, seed: TeamMember[]): TeamMember[] {
  return seed.map((m) => ({
    ...m,
    avatar: resolve(overrides, "team", m.slug, m.avatar),
  }));
}

export function resolveGallerySeedWith(overrides: Overrides, seed: Gallery[]): Gallery[] {
  return seed.map((g) => {
    const section = `gallery-${g.slug}`;
    return {
      ...g,
      cover: { ...g.cover, src: resolve(overrides, section, "cover", g.cover.src) },
      images: g.images.map((img, i) => ({
        ...img,
        src: resolve(overrides, section, String(i + 1), img.src),
      })),
    };
  });
}

export function resolveReviewSeedWith(overrides: Overrides, seed: Review[]): Review[] {
  return seed.map((r) => ({
    ...r,
    avatar: r.avatar ? resolve(overrides, "reviews", `avatar-${r.id}`, r.avatar) : r.avatar,
    cover: r.cover ? resolve(overrides, "reviews", `cover-${r.id}`, r.cover) : r.cover,
  }));
}

export async function resolveVideoTestimonials(seed: VideoTestimonial[]): Promise<VideoTestimonial[]> {
  const overrides = await getImageOverrides();
  return seed.map((v) => ({
    ...v,
    poster: resolve(overrides, "video-testimonials", v.id, v.poster),
  }));
}

export function resolveInstagramSeedWith(overrides: Overrides, seed: InstagramPost[]): InstagramPost[] {
  return seed.map((post) => ({
    ...post,
    image: { ...post.image, src: resolve(overrides, "instagram", post.id, post.image.src) },
  }));
}

const BLOG_AUTHOR_SLOTS: Record<string, string> = {
  "Amara Osei": "author-amara",
  "Leon Hart": "author-leon",
  "Noor Rahman": "author-noor",
};

export function resolveBlogSeedWith(overrides: Overrides, seed: BlogPost[]): BlogPost[] {
  return seed.map((p) => {
    const authorSlot = BLOG_AUTHOR_SLOTS[p.author.name];
    return {
      ...p,
      cover: { ...p.cover, src: resolve(overrides, "blog", p.slug, p.cover.src) },
      author:
        p.author.avatar && authorSlot
          ? { ...p.author, avatar: resolve(overrides, "blog", authorSlot, p.author.avatar) }
          : p.author,
    };
  });
}
