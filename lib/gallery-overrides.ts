import { readJsonDoc, writeJsonDoc } from "@/lib/json-store";
import type { Gallery } from "@/types/gallery";

const OVERRIDES_PATHNAME = "data-db/gallery-overrides.json";

/**
 * A partial patch applied on top of a gallery (seed or added) at read time —
 * lets Manage Galleries edit/hide any gallery without mutating seed code or
 * needing to distinguish seed vs. added anywhere else.
 */
export type GalleryOverride = Partial<
  Pick<
    Gallery,
    | "title"
    | "description"
    | "category"
    | "orientation"
    | "location"
    | "client"
    | "date"
    | "featured"
    | "tags"
    | "cover"
    | "images"
  >
> & { hidden?: boolean };

type GalleryOverrides = Record<string, GalleryOverride>;

export async function getGalleryOverrides(): Promise<GalleryOverrides> {
  return readJsonDoc<GalleryOverrides>(OVERRIDES_PATHNAME, {});
}

/** Shallow-merges `patch` into the existing override for `id`. */
export async function setGalleryOverride(id: string, patch: GalleryOverride): Promise<void> {
  const overrides = await getGalleryOverrides();
  overrides[id] = { ...overrides[id], ...patch };
  await writeJsonDoc(OVERRIDES_PATHNAME, overrides);
}
