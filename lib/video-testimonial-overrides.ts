import { readJsonDoc, writeJsonDoc } from "@/lib/json-store";
import type { VideoTestimonial } from "@/types/review";

const OVERRIDES_PATHNAME = "data-db/video-testimonial-overrides.json";

/**
 * A partial patch applied on top of a video testimonial (seed or added) at
 * read time — mirrors lib/gallery-overrides.ts's approach.
 */
export type VideoTestimonialOverride = Partial<
  Pick<VideoTestimonial, "title" | "client" | "category" | "poster" | "duration" | "quote" | "videoUrl">
> & { hidden?: boolean };

type VideoTestimonialOverrides = Record<string, VideoTestimonialOverride>;

export async function getVideoTestimonialOverrides(): Promise<VideoTestimonialOverrides> {
  return readJsonDoc<VideoTestimonialOverrides>(OVERRIDES_PATHNAME, {});
}

/** Shallow-merges `patch` into the existing override for `id`. */
export async function setVideoTestimonialOverride(
  id: string,
  patch: VideoTestimonialOverride,
): Promise<void> {
  const overrides = await getVideoTestimonialOverrides();
  overrides[id] = { ...overrides[id], ...patch };
  await writeJsonDoc(OVERRIDES_PATHNAME, overrides);
}
