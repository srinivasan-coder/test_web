"use client";

import { Award as AwardIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedSection } from "@/components/ui/animated-section";
import { EASE_OUT_SOFT } from "@/lib/animations";
import type { Award } from "@/types";

interface AwardsProps {
  items: Award[];
}

/**
 * Awards and certificates placeholders.
 */
export function Awards({ items }: AwardsProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-y bg-secondary/40">
      <Container>
        <AnimatedSection>
          <SectionHeading
            align="center"
            eyebrow="Recognition"
            title="Awards & certificates"
            description="A selection of honors and professional certificates — placeholders for the studio's growing recognition."
            className="mx-auto items-center"
          />
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {items.map((item, index) => (
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
              className="flex gap-5 rounded-2xl border border-border bg-card p-7 shadow-sm transition-shadow duration-500 hover:shadow-md"
            >
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
                <AwardIcon className="size-5" strokeWidth={1.75} />
              </span>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-serif text-xl font-semibold">
                    {item.title}
                  </h3>
                  <span className="text-sm font-medium text-primary">
                    {item.year}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-muted-foreground">
                  {item.issuer}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
