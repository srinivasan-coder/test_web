"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { CARD_HOVER, CARD_TAP, EASE_OUT_SOFT } from "@/lib/animations";

interface CardProps
  extends Omit<
    React.ComponentProps<"div">,
    "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
  > {
  /** Disable hover lift for static surfaces. */
  lift?: boolean;
}

/**
 * Surface primitive — soft border, subtle shadow, 16px radius, optional lift.
 */
function Card({ className, lift = true, ...props }: CardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      data-slot="card"
      whileHover={lift && !reduceMotion ? CARD_HOVER : undefined}
      whileTap={lift && !reduceMotion ? CARD_TAP : undefined}
      transition={{ duration: 0.35, ease: EASE_OUT_SOFT }}
      className={cn(
        "flex flex-col rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition-shadow duration-500 hover:shadow-md",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5 p-6", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn("text-xl font-semibold leading-snug", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("p-6 pt-0", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
