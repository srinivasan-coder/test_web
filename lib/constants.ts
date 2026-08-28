import type { NavLink, SocialLink } from "@/types";

/**
 * Global site metadata — single source of truth for branding + SEO.
 */
export const SITE_CONFIG = {
  name: "Fotolites Studio",
  shortName: "Fotolites",
  tagline: "Photography, refined.",
  description:
    "Fotolites Studio is a premium photography studio crafting timeless images for people, brands, and spaces.",
  url: "https://aperture.studio",
  email: "fotolitestudioz@gmail.com",
  phone: "+91 93848 16570 / +91 89392 92870",
  /** Digits-only, primary number — used for tel: / wa.me links. */
  phoneE164: "919384816570",
  whatsapp: "https://wa.me/919384816570",
  instagram: "https://www.instagram.com/fotolites_studio_?igsh=eXdzZWdjODFkMmx4",
  instagramHandle: "fotolites_studio_",
  address:
    "12A, West Vanniar 1st Cross Street, Nasapakkam, K.K.Nagar, Chennai - 600078.",
  hours: {
    weekdays: "Mon – Sat, 10:00 AM – 8:30 PM",
    weekend: "Sunday by appointment",
  },
  mapEmbedUrl:
    "https://www.google.com/maps?q=12A+West+Vanniar+1st+Cross+Street,+Nasapakkam,+K.K.Nagar,+Chennai+-+600078&output=embed",
  mapLink:
    "https://www.google.com/maps/search/?api=1&query=12A+West+Vanniar+1st+Cross+Street,+Nasapakkam,+K.K.Nagar,+Chennai+-+600078",
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
  { label: "Contact", href: "/contact" },
];

/**
 * Footer service links.
 */
export const SERVICE_LINKS: NavLink[] = [
  { label: "Wedding", href: "/portfolio?category=wedding" },
  { label: "Pre Wedding", href: "/portfolio?category=pre-wedding" },
  { label: "Engagement", href: "/portfolio?category=engagement" },
  { label: "Babyshower / Maternity", href: "/portfolio?category=maternity" },
  { label: "Baby", href: "/portfolio?category=baby" },
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
  {
    platform: "facebook",
    href: "https://www.facebook.com/fotolitesstudio/",
    label: "Facebook",
  },
  {
    platform: "youtube",
    href: "https://www.youtube.com/channel/UC0KcXZfnSd3w2YAvamckN0Q",
    label: "YouTube",
  },
];
