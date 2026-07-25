"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedSection } from "@/components/ui/animated-section";
import { cn } from "@/lib/utils";
import { EASE_OUT_SOFT } from "@/lib/animations";
import type { TimelineEvent } from "@/types";

interface TimelineProps {
  events: TimelineEvent[];
}

/**
 * Vertical studio timeline with draw-in line and staggered milestones.
 */
export function Timeline({ events }: TimelineProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-y">
      <Container>
        <AnimatedSection>
          <SectionHeading
            align="center"
            eyebrow="Timeline"
            title="Milestones along the way"
            description="A short history of the studio — from a single bag of gear to a dedicated creative home."
            className="mx-auto items-center"
          />
        </AnimatedSection>

        <div className="relative mx-auto mt-16 max-w-3xl">
          <motion.div
            aria-hidden="true"
            initial={reduceMotion ? { scaleY: 1 } : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.25, ease: EASE_OUT_SOFT }}
            className="absolute bottom-3 left-[0.6875rem] top-3 w-px origin-top bg-border md:left-1/2 md:-translate-x-px"
          />

          <ol className="space-y-12 md:space-y-20">
            {events.map((event, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.li
                  key={event.id}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 32,
                          x: isLeft ? -16 : 16,
                        }
                  }
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.1 + index * 0.08,
                    ease: EASE_OUT_SOFT,
                  }}
                  className="relative md:grid md:grid-cols-2 md:gap-12"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-[0.6875rem] top-2 z-10 size-2.5 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_0_4px_var(--background)] md:left-1/2"
                  />

                  <div
                    className={cn(
                      "pl-10 md:pl-0",
                      isLeft
                        ? "md:col-start-1 md:pr-12 md:text-right"
                        : "md:col-start-2 md:pl-12",
                    )}
                  >
                    <p className="font-serif text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
                      {event.year}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-foreground sm:text-2xl">
                      {event.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base md:max-w-none">
                      {event.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
