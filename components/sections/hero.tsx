"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { Container } from "@/components/ui/container";
import { CTAButton } from "@/components/ui/cta-button";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";
import { fadeInUp, staggerContainer, EASE_OUT_SOFT } from "@/lib/animations";

/**
 * Full-viewport cinematic hero — brand-led, photography-first.
 */
export function Hero({ src }: { src: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-dvh items-end overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          initial={reduceMotion ? false : { scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: EASE_OUT_SOFT }}
          className="absolute inset-0"
        >
          <Image
            src={src}
            alt="Couple sharing a quiet moment in soft natural light"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_30%]"
          />
        </motion.div>
        {/* Single bottom legibility band — keeps photography visible */}
        <div className="absolute inset-0 bg-ink/25" />
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-ink/55" />
      </div>

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
            Premium photography for weddings, families, and brands — crafted
            with calm precision and cinematic light.
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

      <motion.a
        href="#featured-portfolio"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/65 transition-colors duration-300 hover:text-white"
        aria-label="Scroll to featured portfolio"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.22em]">
          Scroll
        </span>
        <motion.span
          animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 2.2, repeat: Infinity, ease: EASE_OUT_SOFT }
          }
        >
          <ChevronDown className="size-5" strokeWidth={1.5} aria-hidden="true" />
        </motion.span>
      </motion.a>
    </section>
  );
}
