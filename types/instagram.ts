import type { ImageAsset } from "./gallery";

/**
 * An Instagram preview tile on the home page.
 */
export interface InstagramPost {
  id: string;
  href: string;
  image: ImageAsset;
}
