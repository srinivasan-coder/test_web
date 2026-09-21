"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function DeleteGalleryButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [status, setStatus] = useState<"idle" | "deleting" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setStatus("deleting");
    setError(null);

    const res = await fetch(`/api/admin/content/galleries/${id}`, { method: "DELETE" });
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
      <Button type="button" variant="outline" size="sm" onClick={() => setConfirming(true)}>
        Delete
      </Button>
    );
  }

  return (
    <div className="w-full space-y-2 rounded-xl border border-destructive/30 bg-destructive/5 p-3">
      <p className="text-xs text-foreground">
        Delete <span className="font-medium">{title}</span>? It disappears from the portfolio
        immediately. This can&apos;t be undone.
      </p>
      {error && <p className="text-xs text-destructive">{error}</p>}
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
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
