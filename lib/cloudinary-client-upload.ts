// Client-safe: no server-only imports. Mirrors the shape returned by
// createUploadSignature() in lib/admin-upload.ts without importing that
// module (which configures the Cloudinary SDK with server secrets).
export type SignedUpload = {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  signature: string;
  publicId: string;
  format: string;
  resourceType: "image" | "video";
};

/** Uploads `file` straight to Cloudinary using a signature from /api/admin/upload/sign. */
export async function uploadDirectToCloudinary(file: File, signed: SignedUpload): Promise<string> {
  const formData = new FormData();
  formData.set("file", file);
  formData.set("api_key", signed.apiKey);
  formData.set("timestamp", String(signed.timestamp));
  formData.set("signature", signed.signature);
  formData.set("public_id", signed.publicId);
  formData.set("format", signed.format);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${signed.cloudName}/${signed.resourceType}/upload`, {
    method: "POST",
    body: formData,
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(body?.error?.message ?? "Upload failed");
  }
  return body.secure_url as string;
}
