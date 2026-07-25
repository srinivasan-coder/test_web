"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { galleryStagger, DEFAULT_VIEWPORT } from "@/lib/animations";
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
 */
export function GalleryGrid({ galleries, className }: GalleryGridProps) {
  const [index, setIndex] = React.useState(-1);
  const reduceMotion = useReducedMotion();

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
        className={cn(
          "columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-3",
          className,
        )}
        initial={reduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={DEFAULT_VIEWPORT}
        variants={galleryStagger}
        role="list"
        aria-label="Portfolio projects"
      >
        <AnimatePresence mode="popLayout">
          {galleries.map((gallery, i) => (
            <GalleryCard
              key={gallery.id}
              gallery={gallery}
              onView={() => setIndex(i)}
              priority={i < 3}
              index={i}
            />
          ))}
        </AnimatePresence>
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
