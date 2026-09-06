import crypto from "node:crypto";
import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import { MAX_UPLOAD_BYTES, MAX_UPLOAD_LABEL } from "@/lib/upload-limits";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const IMAGE_FORMAT_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
const VIDEO_FORMAT_BY_MIME: Record<string, string> = {
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/quicktime": "mov",
};

export class UploadValidationError extends Error {}

async function uploadToCloudinary(
  file: FormDataEntryValue | null | undefined,
  pathnameHint: string,
  formatByMime: Record<string, string>,
  resourceType: "image" | "video",
  invalidTypeMessage: string,
): Promise<string> {
  if (!(file instanceof File)) {
    throw new UploadValidationError("No file provided");
  }
  const format = formatByMime[file.type];
  if (!format) {
    throw new UploadValidationError(invalidTypeMessage);
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new UploadValidationError(
      `${resourceType === "video" ? "Video" : "Image"} must be ${MAX_UPLOAD_LABEL} or smaller`,
    );
  }

  const publicId =
    pathnameHint.replace(/\.[^./]+$/, "") + "-" + crypto.randomBytes(4).toString("hex");
  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { public_id: publicId, format, resource_type: resourceType, overwrite: false },
        (err, res) => (err || !res ? reject(err ?? new Error("Upload failed")) : resolve(res)),
      );
      stream.end(buffer);
    });
    return result.secure_url;
  } catch (err) {
    // Cloudinary rejects e.g. a corrupt or unsupported file at upload time
    // (not just by MIME type) — surface its message instead of a bare 500.
    // Its SDK rejects with a plain { message, http_code } object, not a real Error.
    const message =
      err && typeof err === "object" && "message" in err && typeof err.message === "string"
        ? err.message
        : "Upload failed";
    throw new UploadValidationError(message);
  }
}

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
  return uploadToCloudinary(
    file,
    pathnameHint,
    IMAGE_FORMAT_BY_MIME,
    "image",
    "Only JPEG, PNG, or WebP images are allowed",
  );
}

/**
 * Same as {@link saveUploadedImage}, for MP4/WebM/MOV video files.
 */
export async function saveUploadedVideo(
  file: FormDataEntryValue | null | undefined,
  pathnameHint: string,
): Promise<string> {
  return uploadToCloudinary(
    file,
    pathnameHint,
    VIDEO_FORMAT_BY_MIME,
    "video",
    "Only MP4, WebM, or MOV videos are allowed",
  );
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
