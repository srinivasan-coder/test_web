import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

export interface SelectProps extends React.ComponentProps<"select"> {}

/**
 * Native select styled to match Input — keeps forms light without Radix Select.
 */
function Select({ className, children, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        data-slot="select"
        className={cn(
          "flex h-11 w-full appearance-none rounded-2xl border border-input bg-background px-4 py-2 pr-10 text-sm text-foreground shadow-xs transition-colors duration-200",
          "hover:border-[color-mix(in_srgb,var(--color-line)_70%,var(--color-slate))]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
    </div>
  );
}

export { Select };
