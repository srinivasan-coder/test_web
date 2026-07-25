"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { pageTransition } from "@/lib/animations";

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * Soft Apple-like route transitions — fade + slight vertical settle.
 * No bounce. Respects prefers-reduced-motion.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
