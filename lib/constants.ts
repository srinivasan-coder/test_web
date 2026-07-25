import type { NavLink, SocialLink } from "@/types";

/**
 * Global site metadata — single source of truth for branding + SEO.
 */
export const SITE_CONFIG = {
  name: "Aperture Studio",
  shortName: "Aperture",
  tagline: "Photography, refined.",
  description:
    "Aperture Studio is a premium photography studio crafting timeless images for people, brands, and spaces.",
  url: "https://aperture.studio",
  email: "hello@aperture.studio",
  phone: "+1 (415) 555-0132",
  /** Digits-only for tel: / wa.me links. */
  phoneE164: "14155550132",
  whatsapp: "https://wa.me/14155550132",
  instagram: "https://instagram.com",
  address: "17 Marina Boulevard, San Francisco, CA",
  hours: {
    weekdays: "Mon – Fri, 10:00 – 18:00",
    weekend: "Sat by appointment",
    note: "Sundays reserved for weddings & events",
  },
  /** Placeholder map embed — replace with a real Google Maps iframe src. */
  mapEmbedUrl:
    "https://www.google.com/maps?q=17+Marina+Boulevard,+San+Francisco,+CA&output=embed",
  mapLink:
    "https://www.google.com/maps/search/?api=1&query=17+Marina+Boulevard,+San+Francisco,+CA",
  /** Served by `app/opengraph-image.tsx`. */
  ogImage: "/opengraph-image",
} as const;

/**
 * Primary navigation used by the navbar and mobile menu.
 */
export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

/**
 * Footer service links.
 */
export const SERVICE_LINKS: NavLink[] = [
  { label: "Wedding", href: "/portfolio?category=wedding" },
  { label: "Engagement", href: "/portfolio?category=engagement" },
  { label: "Pre Wedding", href: "/portfolio?category=pre-wedding" },
  { label: "Baby", href: "/portfolio?category=baby" },
  { label: "Corporate", href: "/portfolio?category=corporate" },
  { label: "Fashion", href: "/portfolio?category=fashion" },
];

/**
 * Social profiles rendered in the footer + contact page.
 */
export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "instagram", href: SITE_CONFIG.instagram, label: "Instagram" },
  {
    platform: "linkedin",
    href: "https://linkedin.com/company/aperture-studio",
    label: "LinkedIn",
  },
];
