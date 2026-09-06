// Shared between the server-side upload validation (lib/admin-upload.ts) and
// the client-side admin uploaders, so both enforce and describe the same cap.
export const MAX_UPLOAD_BYTES = 20 * 1024 * 1024; // 20MB
export const MAX_UPLOAD_LABEL = "20MB";
