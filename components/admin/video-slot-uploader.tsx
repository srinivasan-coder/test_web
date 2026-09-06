"use client";

import { useRef, useState } from "react";
import type { AdminSlot } from "@/lib/admin-sections";
import { Button } from "@/components/ui/button";
import { MAX_UPLOAD_BYTES, MAX_UPLOAD_LABEL } from "@/lib/upload-limits";

export function VideoSlotUploader({
  section,
  slot,
  initialSrc,
}: {
  section: string;
  slot: AdminSlot;
  initialSrc: string;
}) {
  const [src, setSrc] = useState(initialSrc);
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
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

    const formData = new FormData();
    formData.set("section", section);
    formData.set("slotId", slot.id);
    formData.set("file", file);

    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    const body = await res.json().catch(() => ({}));

    if (!res.ok) {
      setStatus("error");
      setError(body.error ?? "Upload failed");
      return;
    }

    setStatus("idle");
    setSrc(body.path);
    if (inputRef.current) inputRef.current.value = "";
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
      </div>
      <div className="p-4">
        <p className="text-sm font-medium text-foreground">{slot.label}</p>
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
