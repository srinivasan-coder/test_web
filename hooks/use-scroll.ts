"use client";

import { useEffect, useState } from "react";

/**
 * Tracks whether the window has scrolled past a threshold.
 * Used to toggle the navbar's frosted-glass state.
 */
export function useScroll(threshold = 8): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
