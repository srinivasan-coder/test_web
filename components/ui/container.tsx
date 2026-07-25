import * as React from "react";
import { cn } from "@/lib/utils";

type ContainerElement = "div" | "section" | "main" | "article" | "header" | "footer";

interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  as?: ContainerElement;
  /** Constrain to a narrower reading width. */
  size?: "default" | "narrow" | "wide";
}

const sizeMap: Record<NonNullable<ContainerProps["size"]>, string> = {
  narrow: "max-w-3xl",
  default: "max-w-[var(--container-content)]",
  wide: "max-w-[88rem]",
};

/**
 * Centered, padded content wrapper with consistent max-widths + gutters.
 */
export function Container({
  as: Component = "div",
  size = "default",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-6 sm:px-8 lg:px-10",
        sizeMap[size],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
