import type { ImageAsset } from "./gallery";

/**
 * A milestone on the studio timeline.
 */
export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
}

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
 * Camera / lighting brand featured in Equipment.
 */
export interface EquipmentItem {
  id: string;
  brand: string;
  category: string;
  description: string;
  icon: string;
}

/**
 * Award or certificate placeholder.
 */
export interface Award {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
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
