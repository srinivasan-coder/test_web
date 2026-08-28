import type { TeamMember } from "@/types";

export const team: TeamMember[] = [
  {
    id: "t-1",
    slug: "srinivas",
    name: "Srinivas",
    role: "Founder & Lead Photographer",
    bio: "With a vision to tell stories through emotion and creativity, Fotolites Studio was founded in 2019 by Mr. Srinivas D, driven by a deep passion for photography and a desire to preserve the feelings, connections, and memories that make each story unique.\n\nWhat started as a passion for photography gradually grew into a creative journey shaped by the people we've had the privilege of photographing. From weddings and intimate celebrations to families, milestones, and everything in between, every assignment has taught us to look beyond the obvious and find the moments that truly matter.\n\nOver the years, Fotolites Studio has grown through the trust of our clients and the stories they've shared with us. Our approach remains rooted in the same values that started it all — thoughtful storytelling, genuine connection, and photographs that stand the test of time.\n\nToday, the vision continues: to create images that don't simply document a moment, but allow you to feel it all over again.",
    avatar: "/assets/team/srinivas.jpg",
    featured: true,
  },
];

export const featuredTeam = team.filter((m) => m.featured);
