import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "wedding",
    slug: "wedding",
    title: "Wedding Photography",
    summary: "Timeless, unobtrusive coverage of your day.",
    description:
      "A calm, documentary approach to weddings — we capture the honest, in-between moments alongside the milestones, delivering a gallery you'll return to for a lifetime.",
    icon: "Heart",
    image: {
      src: "/assets/services/wedding.jpg",
      alt: "Bride and groom embracing during golden hour",
      width: 1800,
      height: 1200,
    },
    includes: [
      "Full-day coverage with two photographers",
      "Engagement or welcome-dinner mini session",
      "500+ professionally edited images",
      "Private online gallery with print store",
      "Highlight film teaser (optional add-on)",
    ],
    highlights: [
      "Lead + second shooter",
      "Timeline consultation",
      "Heirloom print credit",
      "Next-day sneak peek",
    ],
    startingPrice: 3200,
    currency: "USD",
    priceLabel: "Starting from",
    galleryHref: "/portfolio?category=wedding",
    featured: true,
  },
  {
    id: "pre-wedding",
    slug: "pre-wedding",
    title: "Pre Wedding",
    summary: "A romantic chapter before the vows.",
    description:
      "Story-led pre-wedding sessions designed around your places and pace — soft light, natural movement, and frames that feel like film stills from your own love story.",
    icon: "Sparkles",
    image: {
      src: "/assets/services/pre-wedding.jpg",
      alt: "Couple during a romantic pre-wedding session",
      width: 1800,
      height: 1200,
    },
    includes: [
      "2–3 hour creative session",
      "Location scouting & planning",
      "Outfit guidance for two looks",
      "80+ edited high-resolution images",
      "Online gallery within 10 days",
    ],
    highlights: [
      "Golden-hour priority",
      "Cinematic color grade",
      "Travel within 50 miles included",
      "Print-ready files",
    ],
    startingPrice: 950,
    currency: "USD",
    priceLabel: "Starting from",
    galleryHref: "/portfolio?category=pre-wedding",
    featured: true,
  },
  {
    id: "baby",
    slug: "baby",
    title: "Baby Shoot",
    summary: "Gentle newborn and milestone portraiture.",
    description:
      "Unhurried baby sessions paced around rest and comfort. Soft natural light, patient posing, and heirloom frames of the smallest details — tiny hands, quiet smiles, first light.",
    icon: "Baby",
    image: {
      src: "/assets/services/baby.jpg",
      alt: "Sleeping newborn wrapped in soft linen",
      width: 1800,
      height: 1200,
    },
    includes: [
      "Studio or in-home session (up to 3 hours)",
      "Parent & sibling portraits included",
      "Safety-first posing & wraps",
      "40+ edited images",
      "Heirloom print guide",
    ],
    highlights: [
      "Climate-controlled studio option",
      "Soft, timeless retouching",
      "Flexible feeding breaks",
      "Family album credit",
    ],
    startingPrice: 550,
    currency: "USD",
    priceLabel: "Starting from",
    galleryHref: "/portfolio?category=baby",
    featured: true,
  },
  {
    id: "engagement",
    slug: "engagement",
    title: "Engagement",
    summary: "A joyful prelude to your wedding story.",
    description:
      "Relaxed, story-led engagement sessions that capture the ease and excitement of this chapter — natural light, genuine connection, and frames that set the tone for the wedding to come.",
    icon: "Users",
    image: {
      src: "/assets/services/engagement.jpg",
      alt: "Engaged couple laughing together outdoors",
      width: 1800,
      height: 1200,
    },
    includes: [
      "1–2 hour creative session",
      "Location scouting & planning",
      "Outfit guidance for two looks",
      "60+ edited high-resolution images",
      "Online gallery within 10 days",
    ],
    highlights: [
      "Golden-hour priority",
      "Cinematic color grade",
      "Travel within 50 miles included",
      "Print-ready files",
    ],
    galleryHref: "/portfolio?category=engagement",
    featured: true,
  },
  {
    id: "maternity",
    slug: "maternity",
    title: "Maternity",
    summary: "Gentle portraits for this once-in-a-while season.",
    description:
      "Soft, unhurried maternity sessions that honor this fleeting chapter — natural light, comfortable posing, and timeless portraits of the quiet anticipation before baby arrives.",
    icon: "Flower2",
    image: {
      src: "/assets/services/maternity.jpg",
      alt: "Expecting mother in a soft, natural-light portrait",
      width: 1800,
      height: 1200,
    },
    includes: [
      "Studio or in-home session (up to 2 hours)",
      "Partner & family portraits included",
      "Wardrobe & posing guidance",
      "40+ edited images",
      "Heirloom print guide",
    ],
    highlights: [
      "Climate-controlled studio option",
      "Soft, timeless retouching",
      "Flexible scheduling",
      "Family album credit",
    ],
    galleryHref: "/portfolio?category=maternity",
    featured: true,
  },
];

export const featuredServices = services.filter((s) => s.featured);

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
