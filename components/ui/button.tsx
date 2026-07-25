"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { EASE_OUT_SOFT } from "@/lib/animations";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-[color,background-color,border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-sm hover:bg-[var(--color-accent-hover)] hover:shadow-md active:translate-y-px",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_srgb,var(--color-surface)_55%,var(--color-line))] active:translate-y-px",
        outline:
          "border border-border bg-background text-foreground shadow-xs hover:bg-secondary hover:border-[color-mix(in_srgb,var(--color-line)_65%,var(--color-slate))] active:translate-y-px",
        ghost: "text-foreground hover:bg-secondary active:translate-y-px",
        inverse:
          "bg-white text-ink shadow-sm hover:bg-white/92 hover:shadow-md active:translate-y-px",
        "inverse-outline":
          "border border-white/35 bg-transparent text-white hover:bg-white/10 hover:border-white/55 active:translate-y-px",
        link: "rounded-none px-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6",
        lg: "h-12 px-8 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends Omit<
      React.ComponentProps<"button">,
      "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
    >,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const reduceMotion = useReducedMotion();

  if (asChild) {
    return (
      <Slot
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </Slot>
    );
  }

  return (
    <motion.button
      data-slot="button"
      whileHover={reduceMotion || variant === "link" ? undefined : { y: -1 }}
      whileTap={reduceMotion || variant === "link" ? undefined : { scale: 0.985 }}
      transition={{ duration: 0.22, ease: EASE_OUT_SOFT }}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export { Button, buttonVariants };
