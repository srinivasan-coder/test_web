"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { useCountUp } from "@/hooks/use-count-up";
import { EASE_OUT_SOFT } from "@/lib/animations";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  decimals?: number;
  className?: string;
  /** Accessible label describing the metric. */
  label: string;
}

/**
 * Scroll-triggered counting number — eased, no bounce.
 */
export function AnimatedCounter({
  value,
  suffix = "",
  decimals = 0,
  className,
  label,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);
  const reduceMotion = useReducedMotion();
  const display = useCountUp({
    end: value,
    decimals,
    active: reduceMotion ? true : active,
    duration: reduceMotion ? 0 : 1600,
  });

  useEffect(() => {
    if (reduceMotion) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <motion.span
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.55, ease: EASE_OUT_SOFT }}
      className={cn("inline-block tabular-nums", className)}
      aria-label={`${value}${suffix} ${label}`}
    >
      {display}
      {suffix}
    </motion.span>
  );
}
