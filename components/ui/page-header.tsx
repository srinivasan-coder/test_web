import * as React from "react";

import { cn } from "@/lib/utils";
import { Container } from "./container";
import { AnimatedSection, AnimatedItem } from "./animated-section";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface PageHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Optional actions (buttons) rendered below the description. */
  actions?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

/**
 * Interior page hero — calm, spacious, consistent type rhythm.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  align = "center",
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "relative overflow-hidden border-b border-border bg-secondary/50",
        className,
      )}
    >
      <Container className="section-y">
        <AnimatedSection
          variants={staggerContainer}
          className={cn(
            "flex flex-col gap-5",
            align === "center" && "mx-auto items-center text-center",
          )}
        >
          {eyebrow ? (
            <AnimatedItem variants={fadeInUp}>
              <span className="eyebrow">{eyebrow}</span>
            </AnimatedItem>
          ) : null}

          <AnimatedItem variants={fadeInUp}>
            <h1 className="type-display max-w-4xl">{title}</h1>
          </AnimatedItem>

          {description ? (
            <AnimatedItem variants={fadeInUp}>
              <p className="type-body max-w-2xl">{description}</p>
            </AnimatedItem>
          ) : null}

          {actions ? (
            <AnimatedItem
              variants={fadeInUp}
              className="mt-3 flex flex-wrap items-center gap-3"
            >
              {actions}
            </AnimatedItem>
          ) : null}
        </AnimatedSection>
      </Container>
    </header>
  );
}
