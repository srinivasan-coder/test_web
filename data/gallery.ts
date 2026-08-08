import type { Gallery, ImageAsset } from "@/types";

const img = (
  src: string,
  alt: string,
  width = 1200,
  height = 1500,
): ImageAsset => ({ src, alt, width, height });

/**
 * Local portfolio catalogue — varied aspect ratios for a Pinterest-style masonry.
 */
export const galleries: Gallery[] = [
  {
    id: "g-still-morning",
    slug: "a-still-morning",
    title: "A Still Morning",
    description:
      "An intimate coastal wedding captured in soft, natural light along the cliffs.",
    category: "wedding",
    orientation: "portrait",
    location: "Big Sur, California",
    client: "Ella & James",
    date: "2026-05-18",
    featured: true,
    tags: ["wedding", "coastal", "golden hour"],
    cover: img(
      "/assets/gallery/a-still-morning/cover.jpg",
      "Couple embracing at sunset on their wedding day",
    ),
    images: [
      img(
        "/assets/gallery/a-still-morning/1.jpg",
        "Couple embracing at sunset on their wedding day",
      ),
      img(
        "/assets/gallery/a-still-morning/2.jpg",
        "Bride holding a cascading bouquet",
      ),
      img(
        "/assets/gallery/a-still-morning/3.jpg",
        "Wedding table details with florals",
        1600,
        1067,
      ),
    ],
  },
  {
    id: "g-vows-in-linen",
    slug: "vows-in-linen",
    title: "Vows in Linen",
    description:
      "A sunlit garden ceremony with quiet documentary coverage and soft film tones.",
    category: "wedding",
    orientation: "landscape",
    location: "Sonoma, California",
    client: "Maya & Noah",
    date: "2026-04-12",
    featured: true,
    tags: ["wedding", "garden", "ceremony"],
    cover: img(
      "/assets/gallery/vows-in-linen/cover.jpg",
      "Wedding ceremony aisle lined with flowers",
      1600,
      1067,
    ),
    images: [
      img(
        "/assets/gallery/vows-in-linen/1.jpg",
        "Wedding ceremony aisle lined with flowers",
        1600,
        1067,
      ),
      img(
        "/assets/gallery/vows-in-linen/2.jpg",
        "Couple dancing at their reception",
      ),
    ],
  },
  {
    id: "g-midnight-reception",
    slug: "midnight-reception",
    title: "Midnight Reception",
    description:
      "Candlelit reception portraits and candid celebration under string lights.",
    category: "wedding",
    orientation: "portrait",
    location: "Napa Valley",
    date: "2025-10-04",
    tags: ["wedding", "reception", "evening"],
    cover: img(
      "/assets/gallery/midnight-reception/cover.jpg",
      "Evening wedding reception under warm lights",
    ),
    images: [
      img(
        "/assets/gallery/midnight-reception/1.jpg",
        "Evening wedding reception under warm lights",
      ),
    ],
  },
  {
    id: "g-city-promise",
    slug: "city-promise",
    title: "City Promise",
    description:
      "An urban engagement session through quiet streets and late-afternoon light.",
    category: "engagement",
    orientation: "portrait",
    location: "San Francisco",
    client: "Ava & Leo",
    date: "2026-03-22",
    featured: true,
    tags: ["engagement", "city", "couples"],
    cover: img(
      "/assets/gallery/city-promise/cover.jpg",
      "Engaged couple walking hand in hand outdoors",
    ),
    images: [
      img(
        "/assets/gallery/city-promise/1.jpg",
        "Engaged couple walking hand in hand outdoors",
      ),
      img(
        "/assets/gallery/city-promise/2.jpg",
        "Couple sharing a quiet moment together",
      ),
    ],
  },
  {
    id: "g-harbor-light",
    slug: "harbor-light",
    title: "Harbor Light",
    description:
      "Windy waterfront engagement portraits with soft blues and honest laughter.",
    category: "engagement",
    orientation: "landscape",
    location: "Sausalito",
    date: "2026-01-30",
    tags: ["engagement", "waterfront"],
    cover: img(
      "/assets/gallery/harbor-light/cover.jpg",
      "Couple standing by the water at dusk",
      1600,
      1067,
    ),
    images: [
      img(
        "/assets/gallery/harbor-light/1.jpg",
        "Couple standing by the water at dusk",
        1600,
        1067,
      ),
    ],
  },
  {
    id: "g-golden-hour-yes",
    slug: "golden-hour-yes",
    title: "Golden Hour Yes",
    description:
      "A hillside engagement filled with warm light, movement, and easy affection.",
    category: "engagement",
    orientation: "square",
    location: "Marin Headlands",
    date: "2025-09-14",
    tags: ["engagement", "golden hour"],
    cover: img(
      "/assets/gallery/golden-hour-yes/cover.jpg",
      "Couple embracing during golden hour",
      1200,
      1200,
    ),
    images: [
      img(
        "/assets/gallery/golden-hour-yes/1.jpg",
        "Couple embracing during golden hour",
        1200,
        1200,
      ),
    ],
  },
  {
    id: "g-before-the-aisle",
    slug: "before-the-aisle",
    title: "Before the Aisle",
    description:
      "A romantic pre-wedding story session styled with soft neutrals and open sky.",
    category: "pre-wedding",
    orientation: "portrait",
    location: "Malibu",
    client: "Priya & Arjun",
    date: "2026-02-28",
    featured: true,
    tags: ["pre-wedding", "romantic"],
    cover: img(
      "/assets/gallery/before-the-aisle/cover.jpg",
      "Couple posing for a pre-wedding portrait",
    ),
    images: [
      img(
        "/assets/gallery/before-the-aisle/1.jpg",
        "Couple posing for a pre-wedding portrait",
      ),
      img(
        "/assets/gallery/before-the-aisle/2.jpg",
        "Romantic couple portrait outdoors",
      ),
    ],
  },
  {
    id: "g-desert-duet",
    slug: "desert-duet",
    title: "Desert Duet",
    description:
      "Minimal pre-wedding frames against sand, sky, and quiet wind.",
    category: "pre-wedding",
    orientation: "landscape",
    location: "Joshua Tree",
    date: "2025-11-21",
    tags: ["pre-wedding", "desert"],
    cover: img(
      "/assets/gallery/desert-duet/cover.jpg",
      "Couple in an open landscape during a pre-wedding shoot",
      1600,
      1067,
    ),
    images: [
      img(
        "/assets/gallery/desert-duet/1.jpg",
        "Couple in an open landscape during a pre-wedding shoot",
        1600,
        1067,
      ),
    ],
  },
  {
    id: "g-soft-beginnings",
    slug: "soft-beginnings",
    title: "Soft Beginnings",
    description:
      "A newborn session paced around rest, warmth, and gentle natural window light.",
    category: "baby",
    orientation: "portrait",
    location: "Studio, San Francisco",
    client: "The Cole Family",
    date: "2026-03-08",
    featured: true,
    tags: ["baby", "newborn", "studio"],
    cover: img(
      "/assets/gallery/soft-beginnings/cover.jpg",
      "Sleeping newborn wrapped in soft linen",
    ),
    images: [
      img(
        "/assets/gallery/soft-beginnings/1.jpg",
        "Sleeping newborn wrapped in soft linen",
      ),
      img(
        "/assets/gallery/soft-beginnings/2.jpg",
        "Parent holding a newborn baby",
      ),
    ],
  },
  {
    id: "g-first-light",
    slug: "first-light",
    title: "First Light",
    description:
      "Lifestyle baby portraits at home — curious hands, quiet smiles, real mornings.",
    category: "baby",
    orientation: "square",
    location: "Berkeley",
    date: "2025-12-02",
    tags: ["baby", "lifestyle", "family"],
    cover: img(
      "/assets/gallery/first-light/cover.jpg",
      "Baby smiling during a lifestyle portrait session",
      1200,
      1200,
    ),
    images: [
      img(
        "/assets/gallery/first-light/1.jpg",
        "Baby smiling during a lifestyle portrait session",
        1200,
        1200,
      ),
    ],
  },
  {
    id: "g-tiny-toes",
    slug: "tiny-toes",
    title: "Tiny Toes",
    description:
      "Detail-rich baby photography with a calm palette and unhurried pacing.",
    category: "baby",
    orientation: "landscape",
    location: "Studio, San Francisco",
    date: "2025-08-19",
    tags: ["baby", "details"],
    cover: img(
      "/assets/gallery/tiny-toes/cover.jpg",
      "Close-up of a baby's feet",
      1600,
      1067,
    ),
    images: [
      img(
        "/assets/gallery/tiny-toes/1.jpg",
        "Close-up of a baby's feet",
        1600,
        1067,
      ),
    ],
  },
  {
    id: "g-boardroom-calm",
    slug: "boardroom-calm",
    title: "Boardroom Calm",
    description:
      "Executive headshots with clean light, confident posture, and understated polish.",
    category: "corporate",
    orientation: "portrait",
    location: "Financial District, SF",
    client: "Northline Capital",
    date: "2026-02-10",
    featured: true,
    tags: ["corporate", "headshot", "brand"],
    cover: img(
      "/assets/gallery/boardroom-calm/cover.jpg",
      "Professional corporate headshot in natural light",
    ),
    images: [
      img(
        "/assets/gallery/boardroom-calm/1.jpg",
        "Professional corporate headshot in natural light",
      ),
      img(
        "/assets/gallery/boardroom-calm/2.jpg",
        "Corporate portrait of a professional woman",
      ),
    ],
  },
  {
    id: "g-team-in-motion",
    slug: "team-in-motion",
    title: "Team in Motion",
    description:
      "Brand and team photography that feels human, modern, and editorial.",
    category: "corporate",
    orientation: "landscape",
    location: "SoMa, San Francisco",
    client: "Pulse Labs",
    date: "2025-11-03",
    tags: ["corporate", "team", "office"],
    cover: img(
      "/assets/gallery/team-in-motion/cover.jpg",
      "Creative team collaborating in a bright office",
      1600,
      1067,
    ),
    images: [
      img(
        "/assets/gallery/team-in-motion/1.jpg",
        "Creative team collaborating in a bright office",
        1600,
        1067,
      ),
    ],
  },
  {
    id: "g-founder-series",
    slug: "founder-series",
    title: "Founder Series",
    description:
      "Environmental portraits for founders — sharp, approachable, and brand-ready.",
    category: "corporate",
    orientation: "portrait",
    location: "Palo Alto",
    date: "2025-07-16",
    tags: ["corporate", "founder", "portrait"],
    cover: img(
      "/assets/gallery/founder-series/cover.jpg",
      "Founder portrait in a modern workspace",
    ),
    images: [
      img(
        "/assets/gallery/founder-series/1.jpg",
        "Founder portrait in a modern workspace",
      ),
    ],
  },
  {
    id: "g-atelier-lines",
    slug: "atelier-lines",
    title: "Atelier Lines",
    description:
      "A fashion editorial built on silhouette, texture, and architectural shadow.",
    category: "fashion",
    orientation: "portrait",
    location: "Downtown Los Angeles",
    client: "Maison Noir",
    date: "2026-01-18",
    featured: true,
    tags: ["fashion", "editorial", "studio"],
    cover: img(
      "/assets/gallery/atelier-lines/cover.jpg",
      "Fashion model in an editorial pose",
    ),
    images: [
      img(
        "/assets/gallery/atelier-lines/1.jpg",
        "Fashion model in an editorial pose",
      ),
      img(
        "/assets/gallery/atelier-lines/2.jpg",
        "High-fashion portrait with dramatic lighting",
      ),
    ],
  },
  {
    id: "g-runway-hush",
    slug: "runway-hush",
    title: "Runway Hush",
    description:
      "Backstage and lookbook frames with a calm, cinematic finish.",
    category: "fashion",
    orientation: "landscape",
    location: "New York",
    date: "2025-09-27",
    tags: ["fashion", "lookbook"],
    cover: img(
      "/assets/gallery/runway-hush/cover.jpg",
      "Fashion shopping and styling moment",
      1600,
      1067,
    ),
    images: [
      img(
        "/assets/gallery/runway-hush/1.jpg",
        "Fashion shopping and styling moment",
        1600,
        1067,
      ),
    ],
  },
  {
    id: "g-monochrome-muse",
    slug: "monochrome-muse",
    title: "Monochrome Muse",
    description:
      "Black-and-white fashion studies focused on gesture, fabric, and form.",
    category: "fashion",
    orientation: "portrait",
    location: "Studio, Los Angeles",
    date: "2025-06-11",
    tags: ["fashion", "black and white"],
    cover: img(
      "/assets/gallery/monochrome-muse/cover.jpg",
      "Fashion model in a striking editorial look",
    ),
    images: [
      img(
        "/assets/gallery/monochrome-muse/1.jpg",
        "Fashion model in a striking editorial look",
      ),
    ],
  },
  {
    id: "g-ivory-afternoon",
    slug: "ivory-afternoon",
    title: "Ivory Afternoon",
    description:
      "Bridal portraits with airy tones, lace detail, and quiet confidence.",
    category: "wedding",
    orientation: "portrait",
    location: "Carmel",
    date: "2025-05-03",
    tags: ["wedding", "bridal"],
    cover: img(
      "/assets/gallery/ivory-afternoon/cover.jpg",
      "Bride in a white gown during golden light",
    ),
    images: [
      img(
        "/assets/gallery/ivory-afternoon/1.jpg",
        "Bride in a white gown during golden light",
      ),
    ],
  },
  {
    id: "g-ring-and-rain",
    slug: "ring-and-rain",
    title: "Ring and Rain",
    description:
      "An engagement story told through soft rain, reflections, and close frames.",
    category: "engagement",
    orientation: "portrait",
    location: "Portland",
    date: "2025-04-20",
    tags: ["engagement", "rain", "candid"],
    cover: img(
      "/assets/gallery/ring-and-rain/cover.jpg",
      "Couple laughing together during an engagement shoot",
    ),
    images: [
      img(
        "/assets/gallery/ring-and-rain/1.jpg",
        "Couple laughing together during an engagement shoot",
      ),
    ],
  },
  {
    id: "g-silk-and-steel",
    slug: "silk-and-steel",
    title: "Silk and Steel",
    description:
      "Fashion campaign imagery pairing fluid fabrics with industrial geometry.",
    category: "fashion",
    orientation: "landscape",
    location: "Brooklyn",
    client: "Atelier Vale",
    date: "2026-04-01",
    tags: ["fashion", "campaign"],
    cover: img(
      "/assets/gallery/silk-and-steel/cover.jpg",
      "Fashion model walking in an outdoor editorial",
      1600,
      1067,
    ),
    images: [
      img(
        "/assets/gallery/silk-and-steel/1.jpg",
        "Fashion model walking in an outdoor editorial",
        1600,
        1067,
      ),
    ],
  },
  {
    id: "g-summit-portraits",
    slug: "summit-portraits",
    title: "Summit Portraits",
    description:
      "Leadership portraits for an annual report — precise, warm, and approachable.",
    category: "corporate",
    orientation: "square",
    location: "Seattle",
    client: "Harbor Systems",
    date: "2026-03-15",
    tags: ["corporate", "annual report"],
    cover: img(
      "/assets/gallery/summit-portraits/cover.jpg",
      "Corporate leadership portrait",
      1200,
      1200,
    ),
    images: [
      img(
        "/assets/gallery/summit-portraits/1.jpg",
        "Corporate leadership portrait",
        1200,
        1200,
      ),
    ],
  },
];

export const featuredGalleries = galleries.filter((g) => g.featured);

export function getGalleryBySlug(slug: string): Gallery | undefined {
  return galleries.find((g) => g.slug === slug);
}

export function getGalleriesByCategory(category: Gallery["category"]): Gallery[] {
  return galleries.filter((g) => g.category === category);
}
