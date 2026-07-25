import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "./button";

interface CTAButtonProps extends Omit<ButtonProps, "asChild"> {
  href: string;
  /** Render a trailing arrow that nudges on hover. Defaults to true. */
  withArrow?: boolean;
  external?: boolean;
}

/**
 * A link styled as a Button, with an optional animated arrow.
 * The primary call-to-action element used throughout the site.
 */
export function CTAButton({
  href,
  children,
  withArrow = true,
  external = false,
  variant = "primary",
  size = "lg",
  className,
  ...props
}: CTAButtonProps) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={cn("group", className)}
      {...props}
    >
      <Link href={href} {...externalProps}>
        {children}
        {withArrow ? (
          <ArrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
        ) : null}
      </Link>
    </Button>
  );
}
