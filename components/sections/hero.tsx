"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { Container } from "@/components/ui/container";
import { CTAButton } from "@/components/ui/cta-button";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";
import { fadeInUp, staggerContainer, EASE_OUT_SOFT } from "@/lib/animations";

/**
 * Full-viewport cinematic hero — brand-led, photography-first.
 * Background rotates through `images` as an autoplaying, full-bleed slideshow.
 */
export function Hero({ images }: { images: string[] }) {
  const reduceMotion = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const plugins = React.useMemo(
    () =>
      reduceMotion || images.length < 2
        ? []
        : [Autoplay({ delay: 6000, stopOnInteraction: false })],
    [reduceMotion, images.length],
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, plugins);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="relative flex min-h-dvh items-end overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, ease: EASE_OUT_SOFT }}
      >
        <div className="h-full overflow-hidden" ref={emblaRef}>
          <div className="flex h-full">
            {images.map((src, i) => (
              <div
                key={src}
                className="relative h-full min-w-0 shrink-0 grow-0 basis-full"
              >
                <Image
                  src={src}
                  alt="Aperture Studio photography"
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover object-[center_30%]"
                />
              </div>
            ))}
          </div>
        </div>
        {/* Single bottom legibility band — keeps photography visible */}
        <div className="absolute inset-0 bg-ink/25" />
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-ink/55" />
      </motion.div>

      <Container className="relative z-10 w-full pb-24 pt-[calc(var(--header-height)+4rem)] md:pb-28">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex max-w-3xl flex-col items-start gap-5 text-white md:gap-6"
        >
          <motion.p
            variants={fadeInUp}
            className="font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-[2.75rem]"
          >
            {SITE_CONFIG.name}
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            className="max-w-2xl font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Moments that
            <br />
            <span className="italic font-normal">last forever.</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="max-w-md text-base leading-relaxed text-white/78 sm:text-lg"
          >
            Premium photography for weddings, engagements, and every
            milestone — crafted with calm precision and cinematic light.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-2 flex flex-wrap items-center gap-3"
          >
            <CTAButton href="/portfolio" variant="inverse">
              Explore Portfolio
            </CTAButton>
            <Button asChild variant="inverse-outline" size="lg">
              <Link href="/contact">Book a session</Link>
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {images.length > 1 ? (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5"
          role="tablist"
          aria-label="Hero slides"
        >
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={selectedIndex === i}
              aria-label={`Show slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                selectedIndex === i
                  ? "w-7 bg-white"
                  : "w-1.5 bg-white/45 hover:bg-white/70"
              }`}
            />
          ))}
        </motion.div>
      ) : null}
    </section>
  );
}
