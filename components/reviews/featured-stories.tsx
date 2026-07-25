"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedSection } from "@/components/ui/animated-section";
import {
  getInitials,
  getReviewCategoryLabel,
} from "@/lib/reviews";
import { EASE_OUT_SOFT } from "@/lib/animations";
import type { Review } from "@/types";
import { StarRating } from "./star-rating";

interface FeaturedStoriesProps {
  stories: Review[];
}

/**
 * Longer-form featured client stories.
 */
export function FeaturedStories({ stories }: FeaturedStoriesProps) {
  const reduceMotion = useReducedMotion();

  if (stories.length === 0) return null;

  return (
    <section className="section-y">
      <Container>
        <AnimatedSection>
          <SectionHeading
            align="center"
            eyebrow="Featured stories"
            title="Moments that stayed with us"
            description="A closer look at a few client journeys — the people, the day, and why the work mattered."
            className="mx-auto items-center"
          />
        </AnimatedSection>

        <div className="mt-14 flex flex-col gap-6">
          {stories.map((story, index) => {
            const reverse = index % 2 === 1;
            return (
              <motion.article
                key={story.id}
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.08,
                  ease: EASE_OUT_SOFT,
                }}
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-500 hover:shadow-md"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 ${
                    reverse ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative min-h-[16rem] bg-secondary lg:min-h-[22rem]">
                    {story.cover || story.avatar ? (
                      <Image
                        src={story.cover ?? story.avatar!}
                        alt={story.author}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        loading="lazy"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center">
                        <span className="font-serif text-5xl font-semibold text-primary">
                          {getInitials(story.author)}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-ink/15" />
                  </div>

                  <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12">
                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
                      {getReviewCategoryLabel(story.category)}
                      {story.location ? ` · ${story.location}` : ""}
                    </span>
                    <StarRating rating={story.rating} className="mt-4" />
                    <h3 className="mt-4 font-serif text-2xl font-semibold sm:text-3xl">
                      {story.author}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {[story.role, story.company].filter(Boolean).join(" · ")}
                    </p>
                    <p className="mt-5 text-base leading-relaxed text-foreground sm:text-lg">
                      “{story.story ?? story.quote}”
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
