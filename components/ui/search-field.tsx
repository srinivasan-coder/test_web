"use client";

import { Search as SearchIcon, X } from "lucide-react";

import { cn } from "@/lib/utils";

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Accessible name for the input. */
  label?: string;
  className?: string;
}

/**
 * Shared search field with clear control.
 */
export function SearchField({
  value,
  onChange,
  placeholder = "Search…",
  label = "Search",
  className,
}: SearchFieldProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <SearchIcon
        className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={label}
        className={cn(
          "h-12 w-full rounded-2xl border border-input bg-background py-2 pl-11 pr-11 text-sm text-foreground shadow-xs transition-colors",
          "placeholder:text-muted-foreground",
          "hover:border-[color-mix(in_srgb,var(--color-line)_70%,var(--color-slate))]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        )}
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}
