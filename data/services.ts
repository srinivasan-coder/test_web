import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "wedding",
    slug: "wedding",
    title: "Wedding Photography",
    summary: "Timeless, unobtrusive coverage of your day.",
    description:
      "We believe the best wedding photographs aren't simply beautiful — they carry emotion.\n\nOur approach blends refined portraits with honest, unscripted moments, allowing your celebration to unfold naturally while we document every meaningful detail.",
    icon: "Heart",
    image: {
      src: "/assets/services/wedding.jpg",
      alt: "Bride and groom embracing during golden hour",
      width: 1800,
      height: 1200,
    },
    includes: [],
    highlights: [],
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
      "A relaxed, creative couple session focused on the connection between you — natural expressions, effortless moments, and beautifully composed frames that feel personal, timeless, and uniquely yours.",
    icon: "Sparkles",
    image: {
      src: "/assets/services/pre-wedding.jpg",
      alt: "Couple during a romantic pre-wedding session",
      width: 1800,
      height: 1200,
    },
    includes: [],
    highlights: [],
    startingPrice: 950,
    currency: "USD",
    priceLabel: "Starting from",
    galleryHref: "/portfolio?category=pre-wedding",
    featured: true,
  },
  {
    id: "engagement",
    slug: "engagement",
    title: "Engagement",
    summary: "A joyful prelude to your wedding story.",
    description:
      "Before the wedding comes a beautiful chapter of its own. We document the excitement, comfort, laughter, and quiet connection between you — creating photographs that bring you back to this moment in your journey together.",
    icon: "Users",
    image: {
      src: "/assets/services/engagement.jpg",
      alt: "Engaged couple laughing together outdoors",
      width: 1800,
      height: 1200,
    },
    includes: [],
    highlights: [],
    galleryHref: "/portfolio?category=engagement",
    featured: true,
  },
  {
    id: "maternity",
    slug: "maternity",
    title: "Babyshower / Maternity",
    summary: "Gentle portraits for this once-in-a-while season.",
    description:
      "A gentle celebration of motherhood, where elegant portraits meet genuine emotion, delicate details, and the beauty of this transformative chapter — timeless portraits that preserve the quiet anticipation of welcoming your little one.",
    icon: "Flower2",
    image: {
      src: "/assets/services/maternity.jpg",
      alt: "Expecting mother in a soft, natural-light portrait",
      width: 1800,
      height: 1200,
    },
    includes: [],
    highlights: [],
    galleryHref: "/portfolio?category=maternity",
    featured: true,
  },
  {
    id: "baby",
    slug: "baby",
    title: "Baby Shoot",
    summary: "Gentle newborn and milestone portraiture.",
    description:
      "A gentle, heartfelt session centered around your little one — natural expressions, tiny details, and beautiful family moments captured with patience, warmth, and care.",
    icon: "Baby",
    image: {
      src: "/assets/services/baby.jpg",
      alt: "Sleeping newborn wrapped in soft linen",
      width: 1800,
      height: 1200,
    },
    includes: [],
    highlights: [],
    startingPrice: 550,
    currency: "USD",
    priceLabel: "Starting from",
    galleryHref: "/portfolio?category=baby",
    featured: true,
  },
];

export const featuredServices = services.filter((s) => s.featured);

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
