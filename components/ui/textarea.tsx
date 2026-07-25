import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.ComponentProps<"textarea"> {}

/**
 * Multi-line text field matching the Input surface treatment.
 */
function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-32 w-full resize-y rounded-2xl border border-input bg-background px-4 py-3 text-sm text-foreground shadow-xs transition-colors duration-200",
        "placeholder:text-muted-foreground",
        "hover:border-[color-mix(in_srgb,var(--color-line)_70%,var(--color-slate))]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
