export type AdminSlot = {
  id: string;
  label: string;
  /** Path relative to /public/assets */
  path: string;
};

export type AdminSection = {
  slug: string;
  title: string;
  description: string;
  slots: AdminSlot[];
};

const galleries: { slug: string; title: string; imageCount: number }[] = [
  { slug: "a-still-morning", title: "A Still Morning", imageCount: 3 },
  { slug: "vows-in-linen", title: "Vows in Linen", imageCount: 2 },
  { slug: "midnight-reception", title: "Midnight Reception", imageCount: 1 },
  { slug: "city-promise", title: "City Promise", imageCount: 2 },
  { slug: "harbor-light", title: "Harbor Light", imageCount: 1 },
  { slug: "golden-hour-yes", title: "Golden Hour Yes", imageCount: 1 },
  { slug: "before-the-aisle", title: "Before the Aisle", imageCount: 2 },
  { slug: "desert-duet", title: "Desert Duet", imageCount: 1 },
  { slug: "soft-beginnings", title: "Soft Beginnings", imageCount: 2 },
  { slug: "first-light", title: "First Light", imageCount: 1 },
  { slug: "tiny-toes", title: "Tiny Toes", imageCount: 1 },
  { slug: "boardroom-calm", title: "Boardroom Calm", imageCount: 2 },
  { slug: "team-in-motion", title: "Team in Motion", imageCount: 1 },
  { slug: "founder-series", title: "Founder Series", imageCount: 1 },
  { slug: "atelier-lines", title: "Atelier Lines", imageCount: 2 },
  { slug: "runway-hush", title: "Runway Hush", imageCount: 1 },
  { slug: "monochrome-muse", title: "Monochrome Muse", imageCount: 1 },
  { slug: "ivory-afternoon", title: "Ivory Afternoon", imageCount: 1 },
  { slug: "ring-and-rain", title: "Ring and Rain", imageCount: 1 },
  { slug: "silk-and-steel", title: "Silk and Steel", imageCount: 1 },
  { slug: "summit-portraits", title: "Summit Portraits", imageCount: 1 },
];

const galleryGroups: AdminSection[] = galleries.map((g) => ({
  slug: `gallery-${g.slug}`,
  title: `Gallery — ${g.title}`,
  description: "Portfolio gallery cover and photos.",
  slots: [
    { id: "cover", label: "Cover", path: `gallery/${g.slug}/cover.jpg` },
    ...Array.from({ length: g.imageCount }, (_, i) => ({
      id: String(i + 1),
      label: `Photo ${i + 1}`,
      path: `gallery/${g.slug}/${i + 1}.jpg`,
    })),
  ],
}));

export const adminSections: AdminSection[] = [
  {
    slug: "hero",
    title: "Home — Hero",
    description: "Full-viewport image on the homepage.",
    slots: [{ id: "home", label: "Hero image", path: "hero/home.jpg" }],
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
      { id: "pre-wedding", label: "Pre Wedding", path: "services/pre-wedding.jpg" },
      { id: "baby", label: "Baby Shoot", path: "services/baby.jpg" },
      { id: "corporate", label: "Corporate", path: "services/corporate.jpg" },
      { id: "fashion", label: "Fashion", path: "services/fashion.jpg" },
      { id: "product", label: "Product", path: "services/product.jpg" },
    ],
  },
  {
    slug: "team",
    title: "Team",
    description: "Avatar for each team member.",
    slots: [
      { id: "amara-osei", label: "Amara Osei", path: "team/amara-osei.jpg" },
      { id: "leon-hart", label: "Leon Hart", path: "team/leon-hart.jpg" },
      { id: "noor-rahman", label: "Noor Rahman", path: "team/noor-rahman.jpg" },
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
      { id: "corporate", label: "Corporate", path: "portfolio-categories/corporate.jpg" },
    ],
  },
  ...galleryGroups,
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
    description: "Poster frame for each video testimonial.",
    slots: [
      { id: "vt-1", label: "Ella & James — Wedding Film", path: "video-testimonials/vt-1.jpg" },
      { id: "vt-2", label: "Maison Noir — Brand Stories", path: "video-testimonials/vt-2.jpg" },
      { id: "vt-3", label: "First Light — Baby Session", path: "video-testimonials/vt-3.jpg" },
      { id: "vt-4", label: "Turning One — Birthday Recap", path: "video-testimonials/vt-4.jpg" },
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
  {
    slug: "blog",
    title: "Journal / Blog",
    description: "Post covers and author avatars.",
    slots: [
      { id: "the-art-of-natural-light", label: "The Art of Natural Light", path: "blog/the-art-of-natural-light.jpg" },
      { id: "behind-the-scenes-paper-cities", label: "Behind the Scenes: Paper Cities", path: "blog/behind-the-scenes-paper-cities.jpg" },
      { id: "our-everyday-camera-bag", label: "What's in Our Everyday Camera Bag", path: "blog/our-everyday-camera-bag.jpg" },
      { id: "how-to-prepare-for-your-wedding-timeline", label: "How to Prepare for Your Wedding Timeline", path: "blog/how-to-prepare-for-your-wedding-timeline.jpg" },
      { id: "color-that-ages-well", label: "Color That Ages Well", path: "blog/color-that-ages-well.jpg" },
      { id: "studio-notes-marina-boulevard", label: "Studio Notes from Marina Boulevard", path: "blog/studio-notes-marina-boulevard.jpg" },
      { id: "filming-with-restraint", label: "Filming with Restraint", path: "blog/filming-with-restraint.jpg" },
      { id: "five-frames-that-changed-how-we-see", label: "Five Frames That Changed How We See", path: "blog/five-frames-that-changed-how-we-see.jpg" },
      { id: "drone-coverage-when-it-helps", label: "Drone Coverage: When It Helps", path: "blog/drone-coverage-when-it-helps.jpg" },
      { id: "author-amara", label: "Author avatar — Amara Osei", path: "blog/authors/amara.jpg" },
      { id: "author-leon", label: "Author avatar — Leon Hart", path: "blog/authors/leon.jpg" },
      { id: "author-noor", label: "Author avatar — Noor Rahman", path: "blog/authors/noor.jpg" },
    ],
  },
];

export function getSection(sectionSlug: string): AdminSection | undefined {
  return adminSections.find((s) => s.slug === sectionSlug);
}

export function getSlot(sectionSlug: string, slotId: string): AdminSlot | undefined {
  return getSection(sectionSlug)?.slots.find((s) => s.id === slotId);
}
