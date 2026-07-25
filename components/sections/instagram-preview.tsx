import Image from "next/image";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTAButton } from "@/components/ui/cta-button";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import {
  AnimatedSection,
  AnimatedItem,
} from "@/components/ui/animated-section";
import { staggerContainer } from "@/lib/animations";
import { instagramPosts } from "@/data/instagram";
import { SITE_CONFIG } from "@/lib/constants";

/**
 * Instagram-style image grid — photography first, quiet hover.
 */
export function InstagramPreview() {
  return (
    <section className="section-y">
      <Container>
        <AnimatedSection className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="On Instagram"
            title="Frames from the field"
            description="Quiet moments from weddings, portraits, and the studio bench."
          />
          <CTAButton
            href={SITE_CONFIG.instagram}
            variant="outline"
            size="md"
            external
            withArrow={false}
            className="shrink-0 self-start md:self-auto"
          >
            <InstagramIcon className="size-4" aria-hidden="true" />
            @{SITE_CONFIG.shortName.toLowerCase()}
          </CTAButton>
        </AnimatedSection>

        <AnimatedSection
          variants={staggerContainer}
          className="mt-12 grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 md:gap-4"
        >
          {instagramPosts.map((post) => (
            <AnimatedItem key={post.id}>
              <a
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-2xl bg-secondary shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label={post.image.alt}
              >
                <Image
                  src={post.image.src}
                  alt={post.image.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/25" />
                <span className="absolute bottom-3 left-3 inline-flex size-8 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100">
                  <InstagramIcon className="size-3.5" aria-hidden="true" />
                </span>
              </a>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </Container>
    </section>
  );
}
