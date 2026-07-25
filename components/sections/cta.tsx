import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { CTAButton } from "@/components/ui/cta-button";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { fadeInUp } from "@/lib/animations";

const CTA_IMAGE =
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=2200&q=80";

/**
 * Full-bleed closing CTA — edge-to-edge photography, clear conversion.
 */
export function CallToAction() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={CTA_IMAGE}
          alt="Couple walking hand in hand through soft evening light"
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-ink/50" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-ink/40" />
      </div>

      <Container className="relative z-10">
        <AnimatedSection
          variants={fadeInUp}
          className="flex min-h-[26rem] flex-col items-center justify-center py-24 text-center md:min-h-[30rem] md:py-32"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/70 sm:text-xs">
            Begin your story
          </span>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl font-semibold leading-[1.1] text-white sm:text-4xl lg:text-5xl">
            Ready to create something you&apos;ll keep forever?
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/78 sm:text-lg">
            Tell us about your celebration or brand — we&apos;ll craft a session
            tailored to your light and your people.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <CTAButton href="/contact" variant="inverse" withArrow={false}>
              Book a session
            </CTAButton>
            <Button asChild variant="inverse-outline" size="lg">
              <Link href="/portfolio">View portfolio</Link>
            </Button>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
