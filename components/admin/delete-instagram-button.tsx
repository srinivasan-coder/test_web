"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

/**
 * Same icon-overlay + confirm-scrim pattern as DeleteGalleryButton
 * (components/admin/delete-gallery-button.tsx) — lives inside the
 * (relative-positioned) thumbnail of an Instagram tile card.
 */
export function DeleteInstagramButton({ id, alt }: { id: string; alt: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [status, setStatus] = useState<"idle" | "deleting" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setStatus("deleting");
    setError(null);

    const res = await fetch(`/api/admin/content/instagram/${id}`, { method: "DELETE" });
    const body = await res.json().catch(() => ({}));

    if (!res.ok) {
      setStatus("error");
      setError(body.error ?? "Something went wrong");
      return;
    }

    router.refresh();
  }

  if (!confirming) {
    return (
      <button
        type="button"
        aria-label={`Delete ${alt}`}
        onClick={() => setConfirming(true)}
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
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink/85 p-4 text-center backdrop-blur-sm">
      <p className="text-xs text-white">
        Delete <span className="font-medium">{alt}</span>? It disappears from the homepage
        immediately. This can&apos;t be undone.
      </p>
      {error && <p className="text-xs text-[color:#fca5a5]">{error}</p>}
      <div className="flex w-full gap-2 px-2">
        <Button
          type="button"
          variant="inverse-outline"
          size="sm"
          className="flex-1"
          onClick={() => setConfirming(false)}
          disabled={status === "deleting"}
        >
          Cancel
        </Button>
        <Button
          type="button"
          size="sm"
          className="flex-1 bg-destructive text-destructive-foreground hover:bg-destructive/90"
          onClick={handleDelete}
          disabled={status === "deleting"}
        >
          {status === "deleting" ? "Deleting…" : "Delete"}
        </Button>
      </div>
    </div>
  );
}
