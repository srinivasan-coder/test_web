import crypto from "node:crypto";
import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import {
  IMAGE_FORMAT_BY_MIME,
  MAX_UPLOAD_BYTES,
  MAX_UPLOAD_LABEL,
  VIDEO_FORMAT_BY_MIME,
} from "@/lib/upload-limits";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

export type SignedUpload = {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  signature: string;
  publicId: string;
  format: string;
  maxFileSize: number;
  resourceType: "image" | "video";
};

/**
 * Signs the params for a browser-to-Cloudinary direct upload, so large
 * files (video especially) never pass through our own serverless function
 * and its ~4.5MB request body cap. Enforces the same type/size restriction
 * as {@link saveUploadedImage}/{@link saveUploadedVideo} — Cloudinary itself
 * rejects anything over `maxFileSize` or signed to a disallowed `format`.
 */
export function createUploadSignature(
  pathnameHint: string,
  resourceType: "image" | "video",
  mimeType: string,
): SignedUpload {
  const formatByMime = resourceType === "video" ? VIDEO_FORMAT_BY_MIME : IMAGE_FORMAT_BY_MIME;
  const format = formatByMime[mimeType];
  if (!format) {
    throw new UploadValidationError(
      resourceType === "video"
        ? "Only MP4, WebM, or MOV videos are allowed"
        : "Only JPEG, PNG, or WebP images are allowed",
    );
  }

  const publicId =
    pathnameHint.replace(/\.[^./]+$/, "") + "-" + crypto.randomBytes(4).toString("hex");
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { public_id: publicId, format, max_file_size: MAX_UPLOAD_BYTES, timestamp },
    process.env.CLOUDINARY_API_SECRET!,
  );

  return {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
    apiKey: process.env.CLOUDINARY_API_KEY!,
    timestamp,
    signature,
    publicId,
    format,
    maxFileSize: MAX_UPLOAD_BYTES,
    resourceType,
  };
}

/**
 * Cloudinary's `max_file_size` upload parameter only applies to upload
 * presets, not ad-hoc signed uploads, so it can't be relied on to enforce
 * our 20MB cap for the direct browser-to-Cloudinary upload. This asks
 * Cloudinary for the resource's actual stored size (never trusting a
 * client-supplied number) and deletes it if it's over the limit, matching
 * the same restriction {@link saveUploadedImage}/{@link saveUploadedVideo}
 * enforce for the server-buffered upload path.
 */
export async function enforceUploadedSize(
  publicId: string,
  resourceType: "image" | "video",
): Promise<void> {
  const resource = await cloudinary.api.resource(publicId, { resource_type: resourceType });
  if (resource.bytes > MAX_UPLOAD_BYTES) {
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType }).catch(() => {});
    throw new UploadValidationError(
      `${resourceType === "video" ? "Video" : "Image"} must be ${MAX_UPLOAD_LABEL} or smaller`,
    );
  }
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
