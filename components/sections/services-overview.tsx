import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTAButton } from "@/components/ui/cta-button";
import {
  AnimatedSection,
  AnimatedItem,
} from "@/components/ui/animated-section";
import { staggerContainer } from "@/lib/animations";
import { featuredServices } from "@/data/services";
import { resolveServices } from "@/lib/site-images";

/**
 * Photo-led services preview — imagery first, not icon cards.
 */
export async function ServicesOverview() {
  const services = (await resolveServices(featuredServices)).slice(0, 4);

  return (
    <section className="section-y bg-secondary/40">
      <Container>
        <AnimatedSection className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Services"
            title="Considered work, across every occasion"
            description="From weddings to every milestone worth celebrating."
          />
          <CTAButton
            href="/services"
            variant="outline"
            size="md"
            className="shrink-0 self-start md:self-auto"
          >
            All services
          </CTAButton>
        </AnimatedSection>

        <AnimatedSection
          variants={staggerContainer}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5"
        >
          {services.map((service) => (
            <AnimatedItem key={service.id}>
              <Link
                href={`/services#${service.slug}`}
                className="group relative block overflow-hidden rounded-2xl bg-background shadow-sm transition-shadow duration-500 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                  <div className="media-scrim absolute inset-0" />
                </div>
                <div className="flex items-start justify-between gap-4 p-6 md:p-7">
                  <div>
                    <h3 className="font-serif text-xl font-semibold tracking-tight md:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {service.summary}
                    </p>
                  </div>
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-foreground transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    <ArrowUpRight className="size-4" aria-hidden="true" />
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
