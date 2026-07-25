import * as React from "react";

import { cn } from "@/lib/utils";

export interface LabelProps extends React.ComponentProps<"label"> {}

/**
 * Accessible form label with quiet, refined typography.
 */
function Label({ className, ...props }: LabelProps) {
  return (
    <label
      data-slot="label"
      className={cn(
        "text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
