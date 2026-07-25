/**
 * A navigation entry (navbar, footer, mobile menu).
 */
export interface NavLink {
  label: string;
  href: string;
  /** Marks external links so we can add rel/target. */
  external?: boolean;
}

export type SocialPlatform =
  | "instagram"
  | "twitter"
  | "facebook"
  | "youtube"
  | "linkedin"
  | "dribbble"
  | "behance";

/**
 * A social profile link.
 */
export interface SocialLink {
  platform: SocialPlatform;
  href: string;
  label: string;
}
