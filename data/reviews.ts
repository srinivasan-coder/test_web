import type { Review, Stat, VideoTestimonial } from "@/types";

export const reviews: Review[] = [
  {
    id: "r-1",
    author: "Ella Mercer",
    role: "Bride",
    rating: 5,
    quote:
      "They captured our day exactly as it felt — quiet, warm, and completely us. Every frame is a memory we didn't know we needed.",
    story:
      "From the first planning call to the final gallery, Aperture felt like family. They anticipated moments before they happened and gave us space to simply be present. Our parents still cry looking through the album.",
    date: "2026-05-24",
    category: "wedding",
    source: "google",
    location: "Big Sur, CA",
    serviceSlug: "wedding",
    featured: true,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    cover:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "r-2",
    author: "Daniel Kim",
    role: "Creative Director",
    company: "Maison Noir",
    rating: 5,
    quote:
      "The most considered commercial work we've commissioned. Clean, precise, and delivered ahead of schedule.",
    story:
      "We needed leadership portraits and campaign stills that felt human, not corporate-stock. The team matched our brand guide perfectly and delivered a library we still use across every channel.",
    date: "2026-02-02",
    category: "corporate",
    source: "google",
    location: "San Francisco, CA",
    serviceSlug: "corporate",
    featured: true,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    cover:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "r-3",
    author: "Hannah Cole",
    role: "New mother",
    rating: 5,
    quote:
      "Gentle, unhurried newborn photography. Our little one slept through most of it — and every image is perfect.",
    story:
      "As first-time parents we were nervous. The studio was warm, patient, and endlessly flexible with feeding breaks. The gallery feels like a love letter to these early days.",
    date: "2025-10-14",
    category: "baby",
    source: "google",
    location: "Berkeley, CA",
    serviceSlug: "baby",
    featured: true,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    cover:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "r-4",
    author: "Marcus Bell",
    role: "Father",
    rating: 5,
    quote:
      "They photographed our daughter's first birthday with so much patience. We revisit the gallery every week.",
    date: "2025-11-08",
    category: "birthday",
    source: "google",
    location: "Oakland, CA",
    serviceSlug: "birthday",
    featured: true,
  },
  {
    id: "r-5",
    author: "Priya & Arjun Shah",
    role: "Couple",
    rating: 5,
    quote:
      "Our wedding photos feel cinematic without ever looking staged. Guests still message us about how beautiful the gallery is.",
    date: "2026-03-18",
    category: "wedding",
    source: "google",
    location: "Napa Valley, CA",
    serviceSlug: "wedding",
    featured: true,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "r-6",
    author: "Lauren Hayes",
    role: "Head of People",
    company: "Pulse Labs",
    rating: 5,
    quote:
      "Our entire team looks polished and approachable. The on-site session was seamless and surprisingly fun.",
    date: "2026-01-09",
    category: "corporate",
    source: "google",
    location: "SoMa, SF",
    serviceSlug: "corporate",
  },
  {
    id: "r-7",
    author: "Sofia Alvarez",
    role: "Mother",
    rating: 5,
    quote:
      "The baby session felt calm from the moment we walked in. Soft light, soft direction — absolute magic.",
    date: "2025-12-02",
    category: "baby",
    source: "studio",
    location: "Studio, SF",
    serviceSlug: "baby",
  },
  {
    id: "r-8",
    author: "Jordan Blake",
    role: "Birthday celebrant",
    rating: 4,
    quote:
      "Vibrant coverage of my 40th without the party feeling interrupted. Beautiful candids and group shots.",
    date: "2025-09-21",
    category: "birthday",
    source: "google",
    location: "Marin, CA",
    serviceSlug: "birthday",
  },
  {
    id: "r-9",
    author: "Maya Chen",
    role: "Bride",
    rating: 5,
    quote:
      "Elegant, emotional, and so thoughtfully paced. We barely noticed the cameras — yet every moment is there.",
    story:
      "We wanted documentary wedding photography with a fine-art finish. Aperture delivered beyond that brief: intimate family frames, glowing portraits, and a gallery that feels like cinema stills from our favorite day.",
    date: "2025-08-30",
    category: "wedding",
    source: "google",
    location: "Carmel, CA",
    serviceSlug: "wedding",
    featured: true,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    cover:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "r-10",
    author: "Thomas Reed",
    role: "CEO",
    company: "Harbor Systems",
    rating: 5,
    quote:
      "Executive portraits that finally look like us — confident, warm, and ready for the annual report.",
    date: "2026-03-15",
    category: "corporate",
    source: "google",
    location: "Seattle / SF",
    serviceSlug: "corporate",
    featured: true,
  },
  {
    id: "r-11",
    author: "Amelia Grant",
    role: "Mother",
    rating: 5,
    quote:
      "Six-month milestone session was effortless. The detail shots of tiny hands still get me every time.",
    date: "2026-04-11",
    category: "baby",
    source: "google",
    location: "Palo Alto, CA",
    serviceSlug: "baby",
  },
  {
    id: "r-12",
    author: "Nina Patel",
    role: "Host",
    rating: 5,
    quote:
      "They made my daughter's sweet sixteen feel cinematic. Guests keep asking who the photographer was.",
    date: "2026-02-28",
    category: "birthday",
    source: "google",
    location: "Los Altos, CA",
    serviceSlug: "birthday",
    featured: true,
  },
];

export const featuredReviews = reviews.filter((r) => r.featured);

export const featuredStories = reviews.filter(
  (r) => r.featured && Boolean(r.story),
);

export const videoTestimonials: VideoTestimonial[] = [
  {
    id: "vt-1",
    title: "Ella & James — Wedding Film",
    client: "Ella Mercer",
    category: "wedding",
    poster:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    duration: "2:14",
    quote: "It felt like reliving the day — only softer, and somehow more true.",
  },
  {
    id: "vt-2",
    title: "Maison Noir — Brand Stories",
    client: "Daniel Kim",
    category: "corporate",
    poster:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    duration: "1:48",
    quote: "Our team finally has film that matches the quality of the product.",
  },
  {
    id: "vt-3",
    title: "First Light — Baby Session",
    client: "Hannah Cole",
    category: "baby",
    poster:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1200&q=80",
    duration: "1:12",
    quote: "A quiet film of the earliest days — we'll treasure it forever.",
  },
  {
    id: "vt-4",
    title: "Turning One — Birthday Recap",
    client: "Marcus Bell",
    category: "birthday",
    poster:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80",
    duration: "1:36",
    quote: "Joy, cake, grandparents — all of it captured with such heart.",
  },
];

export const reviewStats: Stat[] = [
  {
    id: "rs-rating",
    value: 4.9,
    suffix: "★",
    decimals: 1,
    label: "Average Rating",
  },
  {
    id: "rs-reviews",
    value: 320,
    suffix: "+",
    label: "Client Reviews",
  },
  {
    id: "rs-recommend",
    value: 98,
    suffix: "%",
    label: "Would Recommend",
  },
  {
    id: "rs-repeat",
    value: 45,
    suffix: "%",
    label: "Return Clients",
  },
];
