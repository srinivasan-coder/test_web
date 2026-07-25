import type { PortfolioCategory } from "@/types";

export const portfolioCategories: PortfolioCategory[] = [
  {
    id: "cat-wedding",
    slug: "wedding",
    title: "Wedding",
    description:
      "Documentary coverage that preserves the quiet glances and joyful chaos of your day.",
    count: 180,
    image: {
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80",
      alt: "Bride and groom embracing during golden hour",
      width: 1400,
      height: 1750,
    },
  },
  {
    id: "cat-engagement",
    slug: "engagement",
    title: "Engagement",
    description:
      "Intimate sessions that feel like a private film — soft light, real laughter, your places.",
    count: 110,
    image: {
      src: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1400&q=80",
      alt: "Engaged couple sharing a quiet outdoor moment",
      width: 1400,
      height: 1750,
    },
  },
  {
    id: "cat-pre-wedding",
    slug: "pre-wedding",
    title: "Pre Wedding",
    description:
      "Romantic story sessions in locations that feel personal to your chapter.",
    count: 140,
    image: {
      src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=80",
      alt: "Couple posing for a pre-wedding portrait",
      width: 1400,
      height: 1750,
    },
  },
  {
    id: "cat-baby",
    slug: "baby",
    title: "Baby",
    description:
      "Soft, timeless newborn and family portraits captured with patience and care.",
    count: 95,
    image: {
      src: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1400&q=80",
      alt: "Sleeping newborn wrapped in soft linen",
      width: 1400,
      height: 1750,
    },
  },
  {
    id: "cat-corporate",
    slug: "corporate",
    title: "Corporate",
    description:
      "Polished headshots and brand imagery for teams, executives, and campaigns.",
    count: 120,
    image: {
      src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1400&q=80",
      alt: "Professional corporate headshot in natural light",
      width: 1400,
      height: 1750,
    },
  },
];
