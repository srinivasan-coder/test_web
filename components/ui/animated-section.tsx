"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";

import { cn } from "@/lib/utils";
import {
  DEFAULT_VIEWPORT,
  fadeInUp,
  staggerContainer,
} from "@/lib/animations";

type MotionTag = "div" | "section" | "ul" | "article";

interface AnimatedSectionProps extends HTMLMotionProps<"div"> {
  /** Override the reveal variant. Defaults to a gentle fade-up. */
  variants?: Variants;
  /** Stagger direct children (each child should be an <AnimatedItem />). */
  stagger?: boolean;
  /** Delay before the animation starts, in seconds. */
  delay?: number;
  as?: MotionTag;
}

function resolveTag(as: MotionTag) {
  return motion[as] as typeof motion.div;
}

/**
 * Scroll-triggered reveal wrapper — Apple-soft fade/lift, no bounce.
 */
export function AnimatedSection({
  children,
  className,
  variants,
  stagger = false,
  delay = 0,
  as = "div",
  ...props
}: AnimatedSectionProps) {
  const reduceMotion = useReducedMotion();
  const Tag = resolveTag(as);
  const resolved = variants ?? (stagger ? staggerContainer : fadeInUp);

  if (reduceMotion) {
    return <div className={cn(className)}>{children as React.ReactNode}</div>;
  }

  return (
    <Tag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={DEFAULT_VIEWPORT}
      variants={resolved}
      transition={delay ? { delay } : undefined}
      {...props}
    >
      {children}
    </Tag>
  );
}

/**
 * Child item for a staggered `AnimatedSection`.
 */
export function AnimatedItem({
  children,
  className,
  variants = fadeInUp,
  as = "div",
  ...props
}: AnimatedSectionProps) {
  const reduceMotion = useReducedMotion();
  const Tag = resolveTag(as);

  if (reduceMotion) {
    return <div className={cn(className)}>{children as React.ReactNode}</div>;
  }

  return (
    <Tag className={cn(className)} variants={variants} {...props}>
      {children}
    </Tag>
  );
}
