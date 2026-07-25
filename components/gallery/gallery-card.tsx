"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { getCategoryLabel } from "@/lib/gallery";
import { EASE_OUT_SOFT, staggerItem } from "@/lib/animations";
import type { Gallery } from "@/types";

interface GalleryCardProps {
  gallery: Gallery;
  onView: () => void;
  className?: string;
  /** Prefer eager loading for above-the-fold cards. */
  priority?: boolean;
  index?: number;
}

/**
 * Masonry card — photography-first, bottom scrim, quiet hover.
 */
export function GalleryCard({
  gallery,
  onView,
  className,
  priority = false,
  index = 0,
}: GalleryCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      layout
      role="listitem"
      variants={staggerItem}
      initial={reduceMotion ? false : "hidden"}
      animate="visible"
      exit={reduceMotion ? undefined : { opacity: 0, y: 8 }}
      transition={{
        duration: 0.45,
        delay: reduceMotion ? 0 : Math.min(index * 0.035, 0.24),
        ease: EASE_OUT_SOFT,
      }}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      className={cn("mb-4 break-inside-avoid", className)}
    >
      <button
        type="button"
        onClick={onView}
        aria-label={`View ${gallery.title}`}
        className="group relative block w-full overflow-hidden rounded-2xl bg-secondary text-left shadow-sm transition-shadow duration-500 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0.5, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: EASE_OUT_SOFT }}
          className="overflow-hidden"
        >
          <Image
            src={gallery.cover.src}
            alt={gallery.cover.alt}
            width={gallery.cover.width}
            height={gallery.cover.height}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            className="h-auto w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
        </motion.div>

        <div className="media-scrim absolute inset-0" />

        <div className="absolute inset-0 z-10 flex flex-col justify-between p-5">
          <span className="self-start rounded-full bg-white/12 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-sm">
            {getCategoryLabel(gallery.category)}
          </span>

          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-serif text-xl font-semibold text-white">
                {gallery.title}
              </h3>
              {gallery.location ? (
                <p className="mt-1 truncate text-sm text-white/72">
                  {gallery.location}
                </p>
              ) : null}
            </div>
            <span className="inline-flex shrink-0 translate-y-1 items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-ink opacity-0 shadow-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              View
            </span>
          </div>
        </div>
      </button>
    </motion.article>
  );
}
