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
  const [index, setIndex] = React.useState(-1);
  const reduceMotion = useReducedMotion();

  const isLg = useMediaQuery("(min-width: 1024px)");
  const isSm = useMediaQuery("(min-width: 640px)");
  const columnCount = isLg ? 3 : isSm ? 2 : 1;

  const columns = React.useMemo(
    () => distributeIntoColumns(galleries, columnCount),
    [galleries, columnCount],
  );

  const slides: LightboxSlide[] = React.useMemo(
    () =>
      galleries.map((gallery) => ({
        src: gallery.cover.src,
        alt: gallery.cover.alt,
        width: gallery.cover.width,
        height: gallery.cover.height,
        title: gallery.title,
        description: [gallery.location, gallery.category.replace("-", " ")]
          .filter(Boolean)
          .join(" · "),
      })),
    [galleries],
  );

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
                  onView={() => setIndex(itemIndex)}
                  priority={itemIndex < 3}
                  index={itemIndex}
                />
              ))}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>

      {index >= 0 ? (
        <Lightbox
          open
          index={index}
          slides={slides}
          onClose={() => setIndex(-1)}
          onIndexChange={setIndex}
        />
      ) : null}
    </>
  );
}
