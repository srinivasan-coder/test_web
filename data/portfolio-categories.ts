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
      src: "/assets/portfolio-categories/wedding.jpg",
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
      src: "/assets/portfolio-categories/engagement.jpg",
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
      src: "/assets/portfolio-categories/pre-wedding.jpg",
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
      src: "/assets/portfolio-categories/baby.jpg",
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
      src: "/assets/portfolio-categories/corporate.jpg",
      alt: "Professional corporate headshot in natural light",
      width: 1400,
      height: 1750,
    },
  },
];
