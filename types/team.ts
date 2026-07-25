import type { SocialLink } from "./navigation";

/**
 * A studio team member.
 */
export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  /** Areas of focus, e.g. ["Weddings", "Editorial"]. */
  specialties?: string[];
  socials?: SocialLink[];
  featured?: boolean;
}
