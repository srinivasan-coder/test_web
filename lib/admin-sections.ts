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

// Per-gallery image slots used to live here (one AdminSection per seed
// gallery, e.g. "Gallery — A Still Morning"). That's now handled by Manage
// Galleries (/admin/manage/galleries), which also covers text fields and
// added (not just seed) galleries — see lib/gallery-overrides.ts. Keeping
// both would let the two silently shadow each other's edits.
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
  {
    slug: "reviews",
    title: "Reviews",
    description: "Reviewer avatars and story cover photos.",
    slots: [
      { id: "avatar-r-1", label: "Ella Mercer — avatar", path: "reviews/avatars/r-1.jpg" },
      { id: "avatar-r-2", label: "Daniel Kim — avatar", path: "reviews/avatars/r-2.jpg" },
      { id: "avatar-r-3", label: "Hannah Cole — avatar", path: "reviews/avatars/r-3.jpg" },
      { id: "avatar-r-5", label: "Priya & Arjun Shah — avatar", path: "reviews/avatars/r-5.jpg" },
      { id: "avatar-r-9", label: "Maya Chen — avatar", path: "reviews/avatars/r-9.jpg" },
      { id: "cover-r-1", label: "Ella Mercer — story cover", path: "reviews/covers/r-1.jpg" },
      { id: "cover-r-2", label: "Daniel Kim — story cover", path: "reviews/covers/r-2.jpg" },
      { id: "cover-r-3", label: "Hannah Cole — story cover", path: "reviews/covers/r-3.jpg" },
      { id: "cover-r-9", label: "Maya Chen — story cover", path: "reviews/covers/r-9.jpg" },
    ],
  },
  {
    slug: "video-testimonials",
    title: "Video Testimonials",
    description: "Poster frame and video file for each testimonial.",
    slots: [
      { id: "vt-1", label: "Ella & James — Wedding Film (poster)", path: "video-testimonials/vt-1.jpg" },
      { id: "vt-1-video", label: "Ella & James — Wedding Film (video)", path: "video-testimonials/vt-1.mp4", kind: "video" },
      { id: "vt-2", label: "Maison Noir — Brand Stories (poster)", path: "video-testimonials/vt-2.jpg" },
      { id: "vt-2-video", label: "Maison Noir — Brand Stories (video)", path: "video-testimonials/vt-2.mp4", kind: "video" },
      { id: "vt-3", label: "First Light — Baby Session (poster)", path: "video-testimonials/vt-3.jpg" },
      { id: "vt-3-video", label: "First Light — Baby Session (video)", path: "video-testimonials/vt-3.mp4", kind: "video" },
      { id: "vt-4", label: "Turning One — Birthday Recap (poster)", path: "video-testimonials/vt-4.jpg" },
      { id: "vt-4-video", label: "Turning One — Birthday Recap (video)", path: "video-testimonials/vt-4.mp4", kind: "video" },
    ],
  },
  {
    slug: "instagram",
    title: "Instagram Feed Preview",
    description: "Six-tile Instagram preview grid on the homepage.",
    slots: Array.from({ length: 6 }, (_, i) => ({
      id: `ig-${i + 1}`,
      label: `Tile ${i + 1}`,
      path: `instagram/ig-${i + 1}.jpg`,
    })),
  },
];

export function getSection(sectionSlug: string): AdminSection | undefined {
  return adminSections.find((s) => s.slug === sectionSlug);
}

export function getSlot(sectionSlug: string, slotId: string): AdminSlot | undefined {
  return getSection(sectionSlug)?.slots.find((s) => s.id === slotId);
}
