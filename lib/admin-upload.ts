import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const MAX_BYTES = 10 * 1024 * 1024; // 10MB
const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};
const ASSETS_ROOT = path.join(process.cwd(), "public", "assets");

export class UploadValidationError extends Error {}

/**
 * Validates and writes an uploaded image to public/assets/<relativePath>.
 * The extension on `relativePath` is a naming hint only — the file is always
 * saved with the extension matching its ACTUAL content type, so a PNG never
 * ends up mislabeled as ".jpg" (which breaks decoding for some viewers since
 * the server would advertise the wrong Content-Type for it).
 */
export async function saveUploadedImage(
  file: FormDataEntryValue | null | undefined,
  relativePath: string,
): Promise<string> {
  if (!(file instanceof File)) {
    throw new UploadValidationError("No file provided");
  }
  const correctExt = EXT_BY_MIME[file.type];
  if (!correctExt) {
    throw new UploadValidationError("Only JPEG, PNG, or WebP images are allowed");
  }
  if (file.size > MAX_BYTES) {
    throw new UploadValidationError("Image must be 10MB or smaller");
  }

  const finalRelativePath = relativePath.replace(/\.[^./]+$/, "") + correctExt;
  const destination = path.join(ASSETS_ROOT, finalRelativePath);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, Buffer.from(await file.arrayBuffer()));
  return `/assets/${finalRelativePath}`;
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
