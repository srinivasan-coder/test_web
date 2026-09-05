import crypto from "node:crypto";
import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MAX_BYTES = 20 * 1024 * 1024; // 20MB
const FORMAT_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export class UploadValidationError extends Error {}

/**
 * Validates an uploaded image and stores it in Cloudinary, returning its
 * public URL. `pathnameHint` is a naming/organization hint only (e.g.
 * "team/amara-osei.jpg") — the format is always corrected to match the
 * file's ACTUAL content type, and a random suffix is appended so every
 * upload gets a fresh URL (no stale-cache workarounds needed downstream).
 */
export async function saveUploadedImage(
  file: FormDataEntryValue | null | undefined,
  pathnameHint: string,
): Promise<string> {
  if (!(file instanceof File)) {
    throw new UploadValidationError("No file provided");
  }
  const format = FORMAT_BY_MIME[file.type];
  if (!format) {
    throw new UploadValidationError("Only JPEG, PNG, or WebP images are allowed");
  }
  if (file.size > MAX_BYTES) {
    throw new UploadValidationError("Image must be 20MB or smaller");
  }

  const publicId =
    pathnameHint.replace(/\.[^./]+$/, "") + "-" + crypto.randomBytes(4).toString("hex");
  const buffer = Buffer.from(await file.arrayBuffer());

  const result = await new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { public_id: publicId, format, resource_type: "image", overwrite: false },
      (err, res) => (err || !res ? reject(err ?? new Error("Upload failed")) : resolve(res)),
    );
    stream.end(buffer);
  });

  return result.secure_url;
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
