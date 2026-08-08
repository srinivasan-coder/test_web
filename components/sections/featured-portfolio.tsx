"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTAButton } from "@/components/ui/cta-button";
import {
  AnimatedSection,
  AnimatedItem,
} from "@/components/ui/animated-section";
import { EASE_OUT_SOFT, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { PortfolioCategory } from "@/types/portfolio";

/**
 * Large premium category cards for the home portfolio preview.
 */
export function FeaturedPortfolio({
  categories,
}: {
  categories: PortfolioCategory[];
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="featured-portfolio" className="section-y scroll-mt-24">
      <Container>
        <AnimatedSection className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Portfolio"
            title="Work across life's milestones"
            description="Explore our most requested categories — each collection shaped by light, emotion, and craft."
          />
          <CTAButton
            href="/portfolio"
            variant="outline"
            size="md"
            className="shrink-0 self-start md:self-auto"
          >
            View all work
          </CTAButton>
        </AnimatedSection>

        <AnimatedSection
          variants={staggerContainer}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
        >
          {categories.map((category, index) => (
            <AnimatedItem
              key={category.id}
              className={cn(
                index === 0 && "sm:col-span-2 lg:col-span-2 lg:row-span-2",
              )}
            >
              <Link
                href={`/portfolio?category=${category.slug}`}
                className={cn(
                  "group relative block overflow-hidden rounded-2xl bg-secondary shadow-sm transition-shadow duration-500 hover:shadow-md",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  index === 0
                    ? "aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[36rem]"
                    : "aspect-[4/5]",
                )}
              >
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0.55, scale: 1.04 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: EASE_OUT_SOFT }}
                  className="absolute inset-0"
                >
                  <Image
                    src={category.image.src}
                    alt={category.image.alt}
                    fill
                    sizes={
                      index === 0
                        ? "(max-width: 1024px) 100vw, 66vw"
                        : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    }
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                </motion.div>

                <div className="media-scrim absolute inset-0" />

                <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-6 md:p-8">
                  <div>
                    <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">
                      {category.count}+ sessions
                    </span>
                    <h3
                      className={cn(
                        "mt-1.5 font-serif font-semibold text-white",
                        index === 0 ? "text-3xl md:text-4xl" : "text-2xl",
                      )}
                    >
                      {category.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-2 max-w-md text-sm leading-relaxed text-white/78",
                        index !== 0 && "line-clamp-2",
                      )}
                    >
                      {category.description}
                    </p>
                  </div>
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    <ArrowUpRight className="size-5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </Container>
    </section>
  );
}
