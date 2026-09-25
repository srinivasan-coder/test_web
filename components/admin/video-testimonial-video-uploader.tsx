"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { uploadDirectToCloudinary, type SignedUpload } from "@/lib/cloudinary-client-upload";
import { MAX_UPLOAD_BYTES, MAX_UPLOAD_LABEL } from "@/lib/upload-limits";

export function VideoTestimonialVideoUploader({
  videoTestimonialId,
  initialSrc,
}: {
  videoTestimonialId: string;
  initialSrc?: string;
}) {
  const [src, setSrc] = useState(initialSrc ?? "");
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_UPLOAD_BYTES) {
      setStatus("error");
      setError(`Video must be ${MAX_UPLOAD_LABEL} or smaller`);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    setStatus("uploading");
    setError(null);

    try {
      const signRes = await fetch("/api/admin/upload/video-testimonial-sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoTestimonialId, field: "video", mimeType: file.type }),
      });
      const signed: SignedUpload & { error?: string } = await signRes.json();
      if (!signRes.ok) throw new Error(signed.error ?? "Upload failed");

      const url = await uploadDirectToCloudinary(file, signed);

      const finalizeRes = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoTestimonialId, field: "video", url, publicId: signed.publicId }),
      });
      const finalizeBody = await finalizeRes.json().catch(() => ({}));
      if (!finalizeRes.ok) throw new Error(finalizeBody.error ?? "Upload failed");

      setStatus("idle");
      setSrc(finalizeBody.path);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function handleDelete() {
    setDeleting(true);
    setError(null);

    const res = await fetch(`/api/admin/content/video-testimonials/${videoTestimonialId}/video`, {
      method: "DELETE",
    });
    const body = await res.json().catch(() => ({}));

    if (!res.ok) {
      setDeleting(false);
      setError(body.error ?? "Something went wrong");
      return;
    }

    setDeleting(false);
    setConfirmingDelete(false);
    setSrc("");
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background">
      <div className="relative flex aspect-[4/3] items-center justify-center bg-secondary">
        {src ? (
          <video key={src} src={src} controls className="size-full object-cover" />
        ) : (
          <p className="px-4 text-center text-sm text-muted-foreground">No video uploaded yet</p>
        )}
        {status === "uploading" && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink/40 text-sm text-white">
            Uploading…
          </div>
        )}
        {src && !confirmingDelete && (
          <button
            type="button"
            aria-label="Delete video"
            onClick={() => setConfirmingDelete(true)}
            className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-ink/60 text-white backdrop-blur transition-colors hover:bg-destructive"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <path d="M3 6h18" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
            </svg>
          </button>
        )}
        {confirmingDelete && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink/85 p-4 text-center backdrop-blur-sm">
            <p className="text-xs text-white">Remove this video? This can&apos;t be undone.</p>
            <div className="flex w-full gap-2 px-2">
              <Button
                type="button"
                variant="inverse-outline"
                size="sm"
                className="flex-1"
                onClick={() => setConfirmingDelete(false)}
                disabled={deleting}
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                className="flex-1 bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Removing…" : "Delete"}
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-sm font-medium text-foreground">Video</p>
        <p className="mt-1 text-xs text-muted-foreground">MP4, WebM, or MOV — up to {MAX_UPLOAD_LABEL}</p>
        <label className="mt-3 block">
          <input
            ref={inputRef}
            type="file"
            accept="video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov"
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
            {src ? "Replace video" : "Upload video"}
          </Button>
        </label>
        {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
      </div>
    </div>
  );
}
