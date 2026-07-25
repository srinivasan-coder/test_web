import { MapPin } from "lucide-react";

import { SITE_CONFIG } from "@/lib/constants";

/**
 * Google Maps embed with a graceful placeholder fallback treatment.
 */
export function MapPlaceholder() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-secondary shadow-sm">
      <div className="relative aspect-[16/11] w-full">
        <iframe
          title={`${SITE_CONFIG.name} location map`}
          src={SITE_CONFIG.mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full border-0 grayscale-[20%]"
          allowFullScreen
        />

        {/* Soft overlay card for premium polish / offline fallback feel */}
        <div className="pointer-events-none absolute bottom-4 left-4 right-4 sm:right-auto">
          <div className="pointer-events-auto inline-flex max-w-xs items-start gap-3 rounded-2xl border border-border bg-background/95 p-4 shadow-md backdrop-blur-sm">
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
              <MapPin className="size-4" strokeWidth={1.75} />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {SITE_CONFIG.name}
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                {SITE_CONFIG.address}
              </p>
              <a
                href={SITE_CONFIG.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-xs font-medium text-primary transition-colors hover:text-[var(--color-accent-hover)]"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
