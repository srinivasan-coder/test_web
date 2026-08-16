import type { TeamMember } from "@/types";

export const team: TeamMember[] = [
  {
    id: "t-1",
    slug: "srinivas",
    name: "Srinivas",
    role: "Founder & Lead Photographer",
    bio: "Founder and lead photographer at Fotolites Studio. Srinivas brings a candid, unobtrusive eye to every wedding — blending natural light, genuine emotion, and quiet direction into photographs that feel timeless.",
    avatar: "/assets/team/srinivas.jpg",
    featured: true,
  },
];

export const featuredTeam = team.filter((m) => m.featured);
