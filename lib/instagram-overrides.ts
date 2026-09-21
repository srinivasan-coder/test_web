import { readJsonDoc, writeJsonDoc } from "@/lib/json-store";
import type { InstagramPost } from "@/types/instagram";

const OVERRIDES_PATHNAME = "data-db/instagram-overrides.json";

/**
 * A partial patch applied on top of an Instagram tile (seed or added) at
 * read time — mirrors lib/gallery-overrides.ts's approach so seed and added
 * tiles are edited/deleted identically.
 */
export type InstagramOverride = Partial<Pick<InstagramPost, "href" | "image">> & {
  hidden?: boolean;
};

type InstagramOverrides = Record<string, InstagramOverride>;

export async function getInstagramOverrides(): Promise<InstagramOverrides> {
  return readJsonDoc<InstagramOverrides>(OVERRIDES_PATHNAME, {});
}

/** Shallow-merges `patch` into the existing override for `id`. */
export async function setInstagramOverride(id: string, patch: InstagramOverride): Promise<void> {
  const overrides = await getInstagramOverrides();
  overrides[id] = { ...overrides[id], ...patch };
  await writeJsonDoc(OVERRIDES_PATHNAME, overrides);
}
