"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { uploadDirectToCloudinary, type SignedUpload } from "@/lib/cloudinary-client-upload";
import { MAX_UPLOAD_BYTES, MAX_UPLOAD_LABEL } from "@/lib/upload-limits";

/** Appends a brand-new photo to a gallery's images[] — distinct from
 * GalleryPhotoUploader, which only ever replaces an existing one. */
export function AddGalleryPhoto({ galleryId }: { galleryId: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_UPLOAD_BYTES) {
      setStatus("error");
      setError(`Image must be ${MAX_UPLOAD_LABEL} or smaller`);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    setStatus("uploading");
    setError(null);

    try {
      const signRes = await fetch("/api/admin/upload/gallery-sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ galleryId, field: "photo-new", mimeType: file.type }),
      });
      const signed: SignedUpload & { error?: string } = await signRes.json();
      if (!signRes.ok) throw new Error(signed.error ?? "Upload failed");

      const url = await uploadDirectToCloudinary(file, signed);

      const finalizeRes = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ galleryId, field: "photo-new", url, publicId: signed.publicId }),
      });
      const finalizeBody = await finalizeRes.json().catch(() => ({}));
      if (!finalizeRes.ok) throw new Error(finalizeBody.error ?? "Upload failed");

      setStatus("idle");
      router.refresh();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-dashed border-border bg-background">
      <div className="flex aspect-[4/3] items-center justify-center bg-secondary/40">
        <span className="flex size-11 items-center justify-center rounded-full bg-secondary text-2xl leading-none text-foreground">
          +
        </span>
      </div>
      <div className="p-4">
        <p className="text-sm font-medium text-foreground">Add photo</p>
        <p className="mt-1 text-xs text-muted-foreground">JPEG, PNG, or WebP — up to {MAX_UPLOAD_LABEL}</p>
        <label className="mt-3 block">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
            className="sr-only"
            onChange={handleFileChange}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => inputRef.current?.click()}
            disabled={status === "uploading"}
          >
            {status === "uploading" ? "Uploading…" : "Add photo"}
          </Button>
        </label>
        {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
      </div>
    </div>
  );
}
