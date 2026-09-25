export type AdminSlot = {
  id: string;
  label: string;
  /** Path relative to /public/assets */
  path: string;
  /** Defaults to "image" when omitted. */
  kind?: "image" | "video";
};

export type AdminSection = {
  slug: string;
  title: string;
  description: string;
  slots: AdminSlot[];
};

// Per-gallery image slots, the Instagram Feed Preview grid, and the Video
// Testimonials poster/video slots used to live here. All three are now
// handled by their own Manage pages (/admin/manage/galleries,
// /admin/manage/instagram, /admin/manage/video-testimonials), which also
// cover text fields and added (not just seed) items — see
// lib/gallery-overrides.ts, lib/instagram-overrides.ts, and
// lib/video-testimonial-overrides.ts. Keeping both systems would let them
// silently shadow each other's edits.
export const adminSections: AdminSection[] = [
  {
    slug: "hero",
    title: "Home — Hero",
    description: "Full-viewport rotating slideshow on the homepage.",
    slots: [
      { id: "slide-1", label: "Slide 1", path: "hero/slide-1.jpg" },
      { id: "slide-2", label: "Slide 2", path: "hero/slide-2.jpg" },
      { id: "slide-3", label: "Slide 3", path: "hero/slide-3.jpg" },
      { id: "slide-4", label: "Slide 4", path: "hero/slide-4.jpg" },
    ],
  },
  {
    slug: "cta",
    title: "Closing Call-to-Action Banner",
    description: "Full-bleed image shown before the footer on multiple pages.",
    slots: [{ id: "banner", label: "CTA banner", path: "cta/banner.jpg" }],
  },
  {
    slug: "about",
    title: "About — Studio Story",
    description: "Image beside the studio story on the About page.",
    slots: [{ id: "studio-story", label: "Studio story image", path: "about/studio-story.jpg" }],
  },
  {
    slug: "services",
    title: "Services",
    description: "One image per service card.",
    slots: [
      { id: "wedding", label: "Wedding", path: "services/wedding.jpg" },
      { id: "engagement", label: "Engagement", path: "services/engagement.jpg" },
      { id: "pre-wedding", label: "Pre Wedding", path: "services/pre-wedding.jpg" },
      { id: "baby", label: "Baby Shoot", path: "services/baby.jpg" },
      { id: "maternity", label: "Babyshower / Maternity", path: "services/maternity.jpg" },
    ],
  },
  {
    slug: "team",
    title: "Team",
    description: "Avatar for each team member.",
    slots: [
      { id: "srinivas", label: "Srinivas", path: "team/srinivas.jpg" },
    ],
  },
  {
    slug: "portfolio-categories",
    title: "Portfolio Category Tiles",
    description: "Thumbnail for each category tile on the Portfolio page.",
    slots: [
      { id: "wedding", label: "Wedding", path: "portfolio-categories/wedding.jpg" },
      { id: "engagement", label: "Engagement", path: "portfolio-categories/engagement.jpg" },
      { id: "pre-wedding", label: "Pre Wedding", path: "portfolio-categories/pre-wedding.jpg" },
      { id: "baby", label: "Baby", path: "portfolio-categories/baby.jpg" },
      { id: "maternity", label: "Babyshower / Maternity", path: "portfolio-categories/maternity.jpg" },
    ],
  },
];

export function getSection(sectionSlug: string): AdminSection | undefined {
  return adminSections.find((s) => s.slug === sectionSlug);
}

export function getSlot(sectionSlug: string, slotId: string): AdminSlot | undefined {
  return getSection(sectionSlug)?.slots.find((s) => s.id === slotId);
}
