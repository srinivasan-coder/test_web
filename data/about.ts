import type {
  Award,
  EquipmentItem,
  StudioPrinciple,
  StudioStory,
  TimelineEvent,
} from "@/types";

export const studioStory: StudioStory = {
  eyebrow: "Our story",
  title: "A quieter kind of photography",
  paragraphs: [
    "Aperture Studio began with a simple belief: the best images are made when people feel at ease. Founded in San Francisco in 2018, we set out to build a practice that values patience over spectacle — honest light, considered composition, and work that ages beautifully.",
    "Today we are a small, senior team of photographers, videographers, and editors. We photograph weddings, families, and brands with the same calm precision — never rushing the moment, always protecting the feeling.",
  ],
  image: {
    src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1800&q=80",
    alt: "Photographer working with natural window light in the studio",
    width: 1800,
    height: 1200,
  },
};

export const mission: StudioPrinciple = {
  id: "mission",
  title: "Mission",
  description:
    "To craft timeless photographs that feel intimate, intentional, and true — images our clients return to for decades, not just a season.",
  icon: "Heart",
};

export const vision: StudioPrinciple = {
  id: "vision",
  title: "Vision",
  description:
    "To be the studio people trust when the moment matters most — known for quiet luxury, technical excellence, and a human approach to every frame.",
  icon: "Sparkles",
};

export const timeline: TimelineEvent[] = [
  {
    id: "tl-2018",
    year: "2018",
    title: "Started",
    description:
      "Aperture Studio opened its doors with a single camera bag, a borrowed loft, and a promise to photograph with restraint and care.",
  },
  {
    id: "tl-2020",
    year: "2020",
    title: "100 Weddings",
    description:
      "We celebrated our hundredth wedding — a milestone that affirmed our documentary approach and deepened our love for storytelling.",
  },
  {
    id: "tl-2022",
    year: "2022",
    title: "Expanded Team",
    description:
      "Videography and dedicated editing joined the studio, allowing us to deliver cohesive photo and film collections under one roof.",
  },
  {
    id: "tl-2024",
    year: "2024",
    title: "Premium Studio",
    description:
      "We moved into our Marina Boulevard space — a light-filled studio designed for portraits, product, and quiet creative collaboration.",
  },
];

export const equipment: EquipmentItem[] = [
  {
    id: "eq-canon",
    brand: "Canon",
    category: "Cameras & Lenses",
    description:
      "EOS R systems paired with fast primes for natural skin tones and shallow, cinematic depth.",
    icon: "Camera",
  },
  {
    id: "eq-sony",
    brand: "Sony",
    category: "Mirrorless Bodies",
    description:
      "Silent Alpha bodies for ceremonies and events where discretion matters as much as clarity.",
    icon: "Aperture",
  },
  {
    id: "eq-dji",
    brand: "DJI",
    category: "Aerial & Stabilized",
    description:
      "Drone and gimbal systems for sweeping venue reveals and fluid motion film.",
    icon: "Plane",
  },
  {
    id: "eq-godox",
    brand: "Godox",
    category: "Lighting",
    description:
      "Portable strobes and modifiers for consistent, flattering light on location and in-studio.",
    icon: "Zap",
  },
];

export const awards: Award[] = [
  {
    id: "aw-1",
    title: "Best Wedding Photographer",
    issuer: "Bay Area Creative Awards",
    year: "2023",
    description: "Recognized for documentary wedding storytelling and consistent client care.",
  },
  {
    id: "aw-2",
    title: "Portrait Excellence",
    issuer: "Pacific Image Guild",
    year: "2022",
    description: "Certificate of excellence for natural-light portraiture and family work.",
  },
  {
    id: "aw-3",
    title: "Brand Photography Merit",
    issuer: "Studio Collective",
    year: "2024",
    description: "Merit award for corporate and product imagery with commercial polish.",
  },
  {
    id: "aw-4",
    title: "Certified Professional Photographer",
    issuer: "Professional Photographers of America",
    year: "2021",
    description: "Placeholder certificate — formal accreditation in professional practice.",
  },
];
