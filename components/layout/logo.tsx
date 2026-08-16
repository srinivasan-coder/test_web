import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";

interface LogoProps {
  className?: string;
  /** Invert colors for use on dark surfaces (e.g. transparent hero navbar). */
  variant?: "default" | "inverted";
}

/**
 * Monogram + wordmark. Links back to the homepage.
 *
 * Both wordmark images are the same source artwork, just recolored per
 * variant — `inverted` (white) for dark surfaces, `default` (ink) for
 * light ones — so the brand's exact typography never changes, only color.
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
      <Image
        src="/assets/brand/monogram.png"
        alt=""
        width={511}
        height={512}
        priority
        className="h-14 w-14 shrink-0 object-contain transition-transform duration-500 ease-out group-hover:rotate-12"
      />
      <Image
        src={
          variant === "inverted"
            ? "/assets/brand/wordmark-white.png"
            : "/assets/brand/wordmark-dark.png"
        }
        alt={SITE_CONFIG.name}
        width={1200}
        height={250}
        priority
        className="h-14 w-auto object-contain"
      />
    </Link>
  );
}
