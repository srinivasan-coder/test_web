import type { Variants, Transition } from "framer-motion";

import { motion } from "@/lib/tokens";

/**
 * Shared easing — soft Apple-like ease-out.
 * Never use bounce / overshoot springs for UI motion.
 */
export const EASE_OUT_SOFT: Transition["ease"] = motion.easeOutSoft;

/** Primary transition preset used across the site. */
export const TRANSITION_SOFT: Transition = {
  duration: motion.duration.slow,
  ease: EASE_OUT_SOFT,
};

export const TRANSITION_FAST: Transition = {
  duration: motion.duration.base,
  ease: EASE_OUT_SOFT,
};

export const TRANSITION_SLOW: Transition = {
  duration: motion.duration.reveal,
  ease: EASE_OUT_SOFT,
};

/** Page enter / leave — quiet opacity settle. */
export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.32, ease: EASE_OUT_SOFT },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: EASE_OUT_SOFT },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: motion.duration.slow, ease: EASE_OUT_SOFT },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motion.duration.slow, ease: EASE_OUT_SOFT },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motion.duration.slow, ease: EASE_OUT_SOFT },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.985 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: motion.duration.slow, ease: EASE_OUT_SOFT },
  },
};

/** Image / media reveal — soft scale settle (no bounce). */
export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: motion.duration.reveal, ease: EASE_OUT_SOFT },
  },
};

/** Clip-path wipe used for premium image reveals. */
export const imageClipReveal: Variants = {
  hidden: { clipPath: "inset(6% 6% 6% 6% round 16px)", opacity: 0.7 },
  visible: {
    clipPath: "inset(0% 0% 0% 0% round 16px)",
    opacity: 1,
    transition: { duration: motion.duration.reveal, ease: EASE_OUT_SOFT },
  },
};

/**
 * Stagger container — children reveal sequentially.
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.03,
    },
  },
};

/** Tighter stagger for dense grids (gallery). */
export const galleryStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
};

/**
 * Item variant intended to be used inside a stagger container.
 */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motion.duration.slow, ease: EASE_OUT_SOFT },
  },
};

/** Card hover lift — applied via whileHover (no bounce). */
export const CARD_HOVER = {
  y: -4,
  transition: TRANSITION_FAST,
} as const;

export const CARD_TAP = {
  scale: 0.995,
  transition: { duration: motion.duration.fast, ease: EASE_OUT_SOFT },
} as const;

/**
 * Standard viewport config for scroll-triggered reveals.
 */
export const DEFAULT_VIEWPORT = { once: true, amount: 0.18 } as const;

export const LAZY_VIEWPORT = { once: true, amount: 0.12, margin: "100px" } as const;
