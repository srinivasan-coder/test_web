import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.ComponentProps<"input"> {}

/**
 * Minimal text input aligned with the studio form language.
 */
function Input({ className, type = "text", ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-11 w-full rounded-2xl border border-input bg-background px-4 py-2 text-sm text-foreground shadow-xs transition-colors duration-200",
        "placeholder:text-muted-foreground",
        "hover:border-[color-mix(in_srgb,var(--color-line)_70%,var(--color-slate))]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "file:mr-4 file:h-8 file:cursor-pointer file:rounded-full file:border-0 file:bg-secondary file:px-4 file:text-sm file:font-medium file:text-secondary-foreground file:transition-colors hover:file:bg-[color-mix(in_srgb,var(--color-surface)_55%,var(--color-line))]",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
