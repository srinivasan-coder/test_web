"use client";

import { Star } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselItem } from "@/components/ui/carousel";
import { CTAButton } from "@/components/ui/cta-button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { featuredReviews } from "@/data/reviews";

/**
 * Auto-scrolling testimonial preview using Embla.
 */
export function Testimonials() {
  return (
    <section className="section-y bg-secondary/40">
      <Container>
        <AnimatedSection className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Testimonials"
            title="Loved by the people we photograph"
            description="A few words from couples, families, and brands who've trusted us with their story."
          />
          <CTAButton
            href="/reviews"
            variant="outline"
            size="md"
            withArrow={false}
            className="shrink-0 self-start md:self-auto"
          >
            Read all reviews
          </CTAButton>
        </AnimatedSection>

        <AnimatedSection className="mt-12">
          <Carousel
            autoplay
            autoplayDelay={4800}
            controls
            aria-label="Client testimonials"
          >
            {featuredReviews.map((review) => (
              <CarouselItem
                key={review.id}
                basis="basis-[88%] sm:basis-[58%] lg:basis-[40%]"
              >
                <Card
                  lift={false}
                  className="flex h-full flex-col gap-6 p-7 shadow-sm md:p-8"
                >
                  <div
                    className="flex items-center gap-0.5 text-primary"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="size-4 fill-current"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <blockquote className="flex-1 font-serif text-lg leading-relaxed text-foreground md:text-xl">
                    “{review.quote}”
                  </blockquote>
                  <footer className="border-t border-border pt-5">
                    <p className="text-sm font-semibold text-foreground">
                      {review.author}
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {[review.role, review.company].filter(Boolean).join(" · ")}
                    </p>
                  </footer>
                </Card>
              </CarouselItem>
            ))}
          </Carousel>
        </AnimatedSection>
      </Container>
    </section>
  );
}
