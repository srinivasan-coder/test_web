import { put } from "@vercel/blob";

const MAX_BYTES = 20 * 1024 * 1024; // 20MB
const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

export class UploadValidationError extends Error {}

/**
 * Validates an uploaded image and stores it in Vercel Blob, returning its
 * public URL. `pathnameHint` is a naming/organization hint only (e.g.
 * "team/amara-osei.jpg") — the extension is always corrected to match the
 * file's ACTUAL content type, and Blob appends a random suffix so every
 * upload gets a fresh URL (no stale-cache workarounds needed downstream).
 */
export async function saveUploadedImage(
  file: FormDataEntryValue | null | undefined,
  pathnameHint: string,
): Promise<string> {
  if (!(file instanceof File)) {
    throw new UploadValidationError("No file provided");
  }
  const correctExt = EXT_BY_MIME[file.type];
  if (!correctExt) {
    throw new UploadValidationError("Only JPEG, PNG, or WebP images are allowed");
  }
  if (file.size > MAX_BYTES) {
    throw new UploadValidationError("Image must be 20MB or smaller");
  }

  const pathname = pathnameHint.replace(/\.[^./]+$/, "") + correctExt;
  const buffer = Buffer.from(await file.arrayBuffer());
  const blob = await put(pathname, buffer, {
    access: "public",
    contentType: file.type,
    addRandomSuffix: true,
  });
  return blob.url;
}

export function parseTags(value: FormDataEntryValue | null): string[] | undefined {
  if (typeof value !== "string" || !value.trim()) return undefined;
  const tags = value
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  return tags.length ? tags : undefined;
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}
