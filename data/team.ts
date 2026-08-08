import type { TeamMember } from "@/types";

export const team: TeamMember[] = [
  {
    id: "t-1",
    slug: "amara-osei",
    name: "Amara Osei",
    role: "Photographer",
    bio: "Founder and lead photographer. Amara shapes every session with quiet direction, natural light, and a documentary eye for the in-between moments.",
    avatar: "/assets/team/amara-osei.jpg",
    specialties: ["Weddings", "Portraits", "Fashion"],
    featured: true,
    socials: [
      { platform: "instagram", href: "https://instagram.com", label: "Instagram" },
    ],
  },
  {
    id: "t-2",
    slug: "leon-hart",
    name: "Leon Hart",
    role: "Videographer",
    bio: "Leon crafts cinematic films that move with the same restraint as our stills — soft motion, honest sound, and stories that linger.",
    avatar: "/assets/team/leon-hart.jpg",
    specialties: ["Wedding Films", "Brand Films", "Aerial"],
    featured: true,
    socials: [
      { platform: "instagram", href: "https://instagram.com", label: "Instagram" },
    ],
  },
  {
    id: "t-3",
    slug: "noor-rahman",
    name: "Noor Rahman",
    role: "Editor",
    bio: "Noor leads post-production with meticulous color and retouching — ensuring every gallery feels cohesive, timeless, and print-ready.",
    avatar: "/assets/team/noor-rahman.jpg",
    specialties: ["Color Grading", "Retouching", "Delivery"],
    featured: true,
  },
];

export const featuredTeam = team.filter((m) => m.featured);
