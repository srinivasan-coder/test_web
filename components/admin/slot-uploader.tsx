"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { AdminSlot } from "@/lib/admin-sections";
import { Button } from "@/components/ui/button";
import { uploadDirectToCloudinary, type SignedUpload } from "@/lib/cloudinary-client-upload";
import { MAX_UPLOAD_BYTES, MAX_UPLOAD_LABEL } from "@/lib/upload-limits";

export function SlotUploader({
  section,
  slot,
  initialSrc,
}: {
  section: string;
  slot: AdminSlot;
  initialSrc: string;
}) {
  const [src, setSrc] = useState(initialSrc);
  const [previewVersion, setPreviewVersion] = useState(0);
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
      const signRes = await fetch("/api/admin/upload/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, slotId: slot.id, mimeType: file.type }),
      });
      const signed: SignedUpload & { error?: string } = await signRes.json();
      if (!signRes.ok) throw new Error(signed.error ?? "Upload failed");

      const url = await uploadDirectToCloudinary(file, signed);

      const finalizeRes = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, slotId: slot.id, url, publicId: signed.publicId }),
      });
      const finalizeBody = await finalizeRes.json().catch(() => ({}));
      if (!finalizeRes.ok) throw new Error(finalizeBody.error ?? "Upload failed");

      // The stored path is reused across uploads (recorded in
      // data/db/site-images.json), so bump a local counter to force this
      // preview to refetch — the same src string wouldn't otherwise re-render.
      setStatus("idle");
      setSrc(finalizeBody.path);
      setPreviewVersion((v) => v + 1);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background">
      <div className="relative aspect-[4/3] bg-secondary">
        <Image
          key={previewVersion}
          src={previewVersion === 0 ? src : `${src}?t=${previewVersion}`}
          alt={slot.label}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
          unoptimized
        />
        {status === "uploading" && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink/40 text-sm text-white">
            Uploading…
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-sm font-medium text-foreground">{slot.label}</p>
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
            Replace image
          </Button>
        </label>
        {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
      </div>
    </div>
  );
}
