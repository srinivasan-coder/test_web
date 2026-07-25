"use client";

import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  /** Target value to count toward. */
  end: number;
  /** Animation duration in milliseconds. */
  duration?: number;
  /** Decimal places to display. */
  decimals?: number;
  /** Start counting only when `active` becomes true. */
  active?: boolean;
}

/**
 * Eased numeric counter — cubic ease-out, no bounce / overshoot.
 */
export function useCountUp({
  end,
  duration = 1600,
  decimals = 0,
  active = false,
}: UseCountUpOptions): string {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;

    if (duration <= 0) {
      setValue(end);
      return;
    }

    const startTime = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      // Ease-out cubic — Apple-like deceleration (no overshoot).
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(end * eased);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, duration, end]);

  return value.toFixed(decimals);
}
