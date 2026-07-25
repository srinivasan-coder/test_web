import * as React from "react";

import { cn } from "@/lib/utils";
import type { SocialLink, SocialPlatform } from "@/types";

type IconProps = React.SVGProps<SVGSVGElement>;

/**
 * Brand icons are provided as inline SVGs because Lucide removed its social /
 * brand icon set. Each glyph inherits `currentColor`.
 */
const BRAND_ICONS: Record<SocialPlatform, (props: IconProps) => React.ReactElement> = {
  instagram: (props) => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
    </svg>
  ),
  twitter: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.53 3H20.5l-6.49 7.41L21.75 21h-5.98l-4.68-6.11L5.7 21H2.73l6.94-7.93L2.25 3h6.13l4.23 5.59L17.53 3Zm-1.05 16.2h1.65L7.6 4.71H5.83L16.48 19.2Z" />
    </svg>
  ),
  facebook: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  ),
  youtube: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M23.5 7.2a3 3 0 0 0-2.1-2.12C19.5 4.55 12 4.55 12 4.55s-7.5 0-9.4.53A3 3 0 0 0 .5 7.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.12c1.9.53 9.4.53 9.4.53s7.5 0 9.4-.53a3 3 0 0 0 2.1-2.12A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-4.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
    </svg>
  ),
  linkedin: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  ),
  dribbble: (props) => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9.4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 7.5c3.2 3 8.5 5 14 4.4M8.6 3.6C12 8 14 13.5 14.4 20.4M20.5 14c-4.5-1.2-8.7-.3-11.6 3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  behance: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M8.2 11.3c.9-.45 1.4-1.15 1.4-2.25 0-2.15-1.6-2.7-3.45-2.7H1v11.3h5.35c1.95 0 3.8-.95 3.8-3.15 0-1.35-.65-2.35-1.95-2.5ZM3.5 8.2h2.1c.8 0 1.5.2 1.5 1.15 0 .85-.55 1.2-1.35 1.2H3.5V8.2Zm2.35 6.85H3.5v-2.6h2.4c.95 0 1.6.4 1.6 1.35 0 .95-.75 1.25-1.65 1.25ZM23 12.2c0-2.4-1.4-4.4-3.95-4.4-2.5 0-4.15 1.9-4.15 4.35 0 2.55 1.55 4.3 4.15 4.3 1.95 0 3.25-.9 3.8-2.55h-2.15c-.2.6-.85.9-1.55.9-1 0-1.6-.6-1.7-1.65H23v-.95Zm-5.5-1.1c.1-.9.65-1.5 1.55-1.5.95 0 1.4.65 1.45 1.5H17.5ZM15.3 7.4h4.9V6.3h-4.9v1.1Z" />
    </svg>
  ),
};

interface SocialIconsProps {
  links: SocialLink[];
  className?: string;
  size?: "sm" | "md";
}

/**
 * Renders a row of accessible social links.
 */
export function SocialIcons({ links, className, size = "md" }: SocialIconsProps) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {links.map((link) => {
        const Icon = BRAND_ICONS[link.platform];
        return (
          <li key={link.platform}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className={cn(
                "inline-flex items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-300 hover:border-primary hover:text-primary",
                size === "md" ? "size-10" : "size-9",
              )}
            >
              {Icon ? (
                <Icon className={size === "md" ? "size-[18px]" : "size-4"} />
              ) : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
