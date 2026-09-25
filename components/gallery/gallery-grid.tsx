"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { galleryStagger, DEFAULT_VIEWPORT } from "@/lib/animations";
import { distributeIntoColumns } from "@/lib/gallery";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { Gallery, LightboxSlide } from "@/types";
import { GalleryCard } from "./gallery-card";

const Lightbox = dynamic(
  () => import("./lightbox").then((mod) => mod.Lightbox),
  { ssr: false },
);

interface GalleryGridProps {
  galleries: Gallery[];
  className?: string;
}

/**
 * Pinterest-style masonry grid with staggered reveal + lightbox.
 *
 * Columns are computed in JS (shortest-column-first) rather than relying on
 * CSS multi-column layout, which fills column 1 top-to-bottom before moving
 * to column 2 and can leave one column noticeably shorter than the rest.
 */
export function GalleryGrid({ galleries, className }: GalleryGridProps) {
  // Which gallery's own photo set is open, and which photo within it —
  // not a flat index into `galleries`, so next/prev stays inside that one
  // gallery's cover + images instead of jumping to a different project.
  const [activeGalleryId, setActiveGalleryId] = React.useState<string | null>(null);
  const [slideIndex, setSlideIndex] = React.useState(0);
  const reduceMotion = useReducedMotion();

  const isLg = useMediaQuery("(min-width: 1024px)");
  const isSm = useMediaQuery("(min-width: 640px)");
  const columnCount = isLg ? 3 : isSm ? 2 : 1;

  const columns = React.useMemo(
    () => distributeIntoColumns(galleries, columnCount),
    [galleries, columnCount],
  );

  const activeGallery = React.useMemo(
    () => galleries.find((g) => g.id === activeGalleryId) ?? null,
    [galleries, activeGalleryId],
  );

  const slides: LightboxSlide[] = React.useMemo(() => {
    if (!activeGallery) return [];
    const description = [activeGallery.location, activeGallery.category.replace("-", " ")]
      .filter(Boolean)
      .join(" · ");
    return [activeGallery.cover, ...activeGallery.images].map((image) => ({
      src: image.src,
      alt: image.alt,
      width: image.width,
      height: image.height,
      title: activeGallery.title,
      description,
    }));
  }, [activeGallery]);

  return (
    <>
      <motion.div
        className={cn("flex gap-4", className)}
        initial={reduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={DEFAULT_VIEWPORT}
        variants={galleryStagger}
        role="list"
        aria-label="Portfolio projects"
      >
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="flex min-w-0 flex-1 flex-col gap-4">
            <AnimatePresence mode="popLayout">
              {column.map(({ gallery, index: itemIndex }) => (
                <GalleryCard
                  key={gallery.id}
                  gallery={gallery}
                  onView={() => {
                    setActiveGalleryId(gallery.id);
                    setSlideIndex(0);
                  }}
                  priority={itemIndex < 3}
                  index={itemIndex}
                />
              ))}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>

      {activeGallery ? (
        <Lightbox
          open
          index={slideIndex}
          slides={slides}
          onClose={() => setActiveGalleryId(null)}
          onIndexChange={setSlideIndex}
        />
      ) : null}
    </>
  );
}
