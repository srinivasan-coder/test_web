"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedSection } from "@/components/ui/animated-section";
import { getIcon } from "@/lib/icon-map";
import { EASE_OUT_SOFT } from "@/lib/animations";
import type { EquipmentItem } from "@/types";

interface EquipmentProps {
  items: EquipmentItem[];
}

/**
 * Equipment brands — Canon, Sony, DJI, Godox.
 */
export function Equipment({ items }: EquipmentProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-y">
      <Container>
        <AnimatedSection>
          <SectionHeading
            align="center"
            eyebrow="Equipment"
            title="Tools we trust"
            description="Reliable systems chosen for color, discretion, and the freedom to work in any light."
            className="mx-auto items-center"
          />
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = getIcon(item.icon);
            return (
              <motion.article
                key={item.id}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                  ease: EASE_OUT_SOFT,
                }}
                className="rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <p className="mt-6 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  {item.category}
                </p>
                <h3 className="mt-2 font-serif text-2xl font-semibold">
                  {item.brand}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
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
