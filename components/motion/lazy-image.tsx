"use client";

import * as React from "react";
import Image, { type ImageProps } from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { EASE_OUT_SOFT, LAZY_VIEWPORT } from "@/lib/animations";

type LazyImageProps = ImageProps & {
  /** Wrapper classes (positioning / aspect). */
  frameClassName?: string;
};

/**
 * Lazy image with scroll + onLoad fade-in — subtle, no bounce.
 */
export function LazyImage({
  className,
  frameClassName,
  alt,
  onLoad,
  ...props
}: LazyImageProps) {
  const reduceMotion = useReducedMotion();
  const [loaded, setLoaded] = React.useState(false);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: loaded || reduceMotion ? 1 : 0.35, y: 0 }}
      viewport={LAZY_VIEWPORT}
      animate={
        reduceMotion
          ? undefined
          : { opacity: loaded ? 1 : 0.35, filter: loaded ? "blur(0px)" : "blur(6px)" }
      }
      transition={{ duration: 0.7, ease: EASE_OUT_SOFT }}
      className={cn("overflow-hidden", frameClassName)}
    >
      <Image
        alt={alt}
        className={cn(
          "transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          className,
        )}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
        {...props}
      />
    </motion.div>
  );
}
