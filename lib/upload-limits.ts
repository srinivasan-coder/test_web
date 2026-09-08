// Shared between the server-side upload validation (lib/admin-upload.ts) and
// the client-side admin uploaders, so both enforce and describe the same cap.
export const MAX_UPLOAD_BYTES = 20 * 1024 * 1024; // 20MB
export const MAX_UPLOAD_LABEL = "20MB";

// Same restriction, shared with the client so it can validate before ever
// hitting the network, and with the server so it can sign/enforce the same
// formats via Cloudinary.
export const IMAGE_FORMAT_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
export const VIDEO_FORMAT_BY_MIME: Record<string, string> = {
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/quicktime": "mov",
};
