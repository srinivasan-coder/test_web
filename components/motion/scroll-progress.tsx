"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/**
 * Thin top-of-viewport reading progress indicator.
 */
export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-primary"
      style={{ scaleX: reduceMotion ? scrollYProgress : scaleX }}
    />
  );
}
