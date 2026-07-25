import * as React from "react";
import Link from "next/link";
import { Aperture } from "lucide-react";

import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";

interface LogoProps {
  className?: string;
  /** Invert colors for use on dark surfaces (e.g. footer). */
  variant?: "default" | "inverted";
}

/**
 * Wordmark + glyph. Links back to the homepage.
 */
export function Logo({ className, variant = "default" }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${SITE_CONFIG.name} — home`}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-full",
        className,
      )}
    >
      <Aperture
        className={cn(
          "size-6 transition-transform duration-500 ease-out group-hover:rotate-45",
          variant === "inverted" ? "text-white" : "text-primary",
        )}
        strokeWidth={1.75}
      />
      <span
        className={cn(
          "font-serif text-lg font-semibold tracking-tight",
          variant === "inverted" ? "text-white" : "text-foreground",
        )}
      >
        {SITE_CONFIG.name}
      </span>
    </Link>
  );
}
