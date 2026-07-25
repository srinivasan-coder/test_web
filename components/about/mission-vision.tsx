"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { getIcon } from "@/lib/icon-map";
import { EASE_OUT_SOFT } from "@/lib/animations";
import type { StudioPrinciple } from "@/types";

interface MissionVisionProps {
  mission: StudioPrinciple;
  vision: StudioPrinciple;
}

/**
 * Side-by-side Mission and Vision cards.
 */
export function MissionVision({ mission, vision }: MissionVisionProps) {
  const reduceMotion = useReducedMotion();
  const items = [mission, vision];

  return (
    <section className="border-y border-border bg-secondary/40">
      <Container className="py-20 md:py-28">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((item, index) => {
            const Icon = getIcon(item.icon);
            return (
              <motion.article
                key={item.id}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.1,
                  ease: EASE_OUT_SOFT,
                }}
                className="rounded-2xl border border-border bg-card p-8 shadow-sm transition-shadow duration-500 hover:shadow-md md:p-10"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <h2 className="mt-6 font-serif text-2xl font-semibold sm:text-3xl">
                  {item.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
