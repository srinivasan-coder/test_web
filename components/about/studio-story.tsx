"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { EASE_OUT_SOFT } from "@/lib/animations";
import type { StudioStory } from "@/types";

interface StudioStorySectionProps {
  story: StudioStory;
}

/**
 * Origin story — large image reveal beside narrative copy.
 */
export function StudioStorySection({ story }: StudioStorySectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-y">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE_OUT_SOFT }}
          >
            <span className="eyebrow">{story.eyebrow}</span>
            <h2 className="mt-4 text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-5xl">
              {story.title}
            </h2>
            <div className="mt-6 space-y-5">
              {story.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-base leading-relaxed text-muted-foreground sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 1.06 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: EASE_OUT_SOFT }}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary shadow-md sm:aspect-[5/4] lg:aspect-[4/5]"
          >
            <Image
              src={story.image.src}
              alt={story.image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
