"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function AddContentForm({
  endpoint,
  children,
  submitLabel = "Add",
  successMessage = "Added — it's live on the site now.",
}: {
  endpoint: string;
  children: ReactNode;
  submitLabel?: string;
  successMessage?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formRef.current) return;
    setStatus("submitting");
    setError(null);

    const formData = new FormData(formRef.current);
    const res = await fetch(endpoint, { method: "POST", body: formData });
    const body = await res.json().catch(() => ({}));

    if (!res.ok) {
      setStatus("error");
      setError(body.error ?? "Something went wrong");
      return;
    }

    setStatus("success");
    formRef.current.reset();
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
      {children}

      {error && <p className="text-sm text-destructive">{error}</p>}
      {status === "success" && (
        <p className="text-sm font-medium text-[color:#16a34a]">{successMessage}</p>
      )}

      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Saving…" : submitLabel}
      </Button>
    </form>
  );
}
