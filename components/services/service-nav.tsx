"use client";

import { cn } from "@/lib/utils";
import type { Service } from "@/types";

interface ServiceNavProps {
  services: Service[];
  className?: string;
}

/**
 * Horizontal jump links to each luxury service block.
 */
export function ServiceNav({ services, className }: ServiceNavProps) {
  return (
    <nav
      aria-label="Services"
      className={cn(
        "no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0",
        className,
      )}
    >
      {services.map((service) => (
        <a
          key={service.id}
          href={`#${service.slug}`}
          className="shrink-0 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:border-ink/20 hover:bg-secondary hover:text-foreground"
        >
          {service.title}
        </a>
      ))}
    </nav>
  );
}
