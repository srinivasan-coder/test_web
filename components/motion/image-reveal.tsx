"use client";

import * as React from "react";
import Image, { type ImageProps } from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import {
  DEFAULT_VIEWPORT,
  imageReveal,
  TRANSITION_SLOW,
} from "@/lib/animations";

type ImageRevealProps = Omit<ImageProps, "onLoad"> & {
  /** Extra classes for the outer overflow clip. */
  frameClassName?: string;
  /** Delay before the reveal starts (seconds). */
  delay?: number;
};

/**
 * Scroll-triggered image reveal — soft scale settle inside a clipped frame.
 */
export function ImageReveal({
  className,
  frameClassName,
  delay = 0,
  alt,
  ...props
}: ImageRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn("overflow-hidden", frameClassName)}>
      <motion.div
        initial={reduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={DEFAULT_VIEWPORT}
        variants={imageReveal}
        transition={{ ...TRANSITION_SLOW, delay }}
        className="size-full"
      >
        <Image alt={alt} className={cn(className)} {...props} />
      </motion.div>
    </div>
  );
}
