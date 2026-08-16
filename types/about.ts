import type { ImageAsset } from "./gallery";

/**
 * Mission / vision / values style content block.
 */
export interface StudioPrinciple {
  id: string;
  title: string;
  description: string;
  icon: string;
}

/**
 * Studio story hero content for the About page.
 */
export interface StudioStory {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  image: ImageAsset;
}
