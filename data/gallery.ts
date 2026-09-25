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
    id: "g-before-baby",
    slug: "before-baby",
    title: "Before Baby",
    description:
      "Soft, unhurried maternity portraits framed in warm window light, honoring the quiet weeks before baby arrives.",
    category: "maternity",
    orientation: "landscape",
    location: "Studio, San Francisco",
    date: "2026-02-14",
    featured: true,
    tags: ["maternity", "studio", "natural light"],
    cover: img(
      "/assets/gallery/before-baby/cover.jpg",
      "Expecting mother in a soft, natural-light portrait",
      1600,
      1062,
    ),
    images: [
      img(
        "/assets/gallery/before-baby/1.jpg",
        "Expecting mother in a soft, natural-light portrait",
        1600,
        1062,
      ),
    ],
  },
  {
    id: "g-a-quiet-anticipation",
    slug: "a-quiet-anticipation",
    title: "A Quiet Anticipation",
    description:
      "An intimate babyshower gathering told through candid, documentary frames — laughter, soft pastels, and anticipation.",
    category: "maternity",
    orientation: "landscape",
    location: "Private residence, Palo Alto",
    date: "2025-12-06",
    tags: ["babyshower", "celebration", "family"],
    cover: img(
      "/assets/gallery/a-quiet-anticipation/cover.jpg",
      "Family and friends gathered at a babyshower celebration",
      1600,
      1062,
    ),
    images: [
      img(
        "/assets/gallery/a-quiet-anticipation/1.jpg",
        "Family and friends gathered at a babyshower celebration",
        1600,
        1062,
      ),
    ],
  },
  {
    id: "g-blooming",
    slug: "blooming",
    title: "Blooming",
    description:
      "A golden-hour maternity session outdoors, tracing the last glowing weeks of pregnancy.",
    category: "maternity",
    orientation: "landscape",
    location: "Golden Gate Park",
    date: "2025-10-22",
    tags: ["maternity", "outdoor", "golden hour"],
    cover: img(
      "/assets/gallery/blooming/cover.jpg",
      "Expecting mother walking outdoors during golden hour",
      1600,
      1062,
    ),
    images: [
      img(
        "/assets/gallery/blooming/1.jpg",
        "Expecting mother walking outdoors during golden hour",
        1600,
        1062,
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
];

export const featuredGalleries = galleries.filter((g) => g.featured);

export function getGalleryBySlug(slug: string): Gallery | undefined {
  return galleries.find((g) => g.slug === slug);
}

export function getGalleriesByCategory(category: Gallery["category"]): Gallery[] {
  return galleries.filter((g) => g.category === category);
}
