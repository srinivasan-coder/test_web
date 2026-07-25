import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  AnimatedSection,
  AnimatedItem,
} from "@/components/ui/animated-section";
import { staggerContainer } from "@/lib/animations";
import { getIcon } from "@/lib/icon-map";
import { features } from "@/data/features";

/**
 * Three studio pillars — editorial, photography-specific, not SaaS icons.
 */
export function WhyChooseUs() {
  return (
    <section className="section-y">
      <Container>
        <AnimatedSection>
          <SectionHeading
            align="center"
            eyebrow="The studio way"
            title="What we protect in every frame"
            description="A quieter approach to photography — prepared, present, and finished with care."
            className="mx-auto"
          />
        </AnimatedSection>

        <AnimatedSection
          variants={staggerContainer}
          className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-3 md:gap-y-0 md:divide-x md:divide-border"
        >
          {features.map((feature, index) => {
            const Icon = getIcon(feature.icon);
            return (
              <AnimatedItem
                key={feature.id}
                className="flex flex-col md:px-8 first:md:pl-0 last:md:pr-0"
              >
                <div className="flex items-center gap-3">
                  <span className="font-serif text-sm font-medium tabular-nums text-primary">
                    0{index + 1}
                  </span>
                  <span className="inline-flex size-10 items-center justify-center rounded-full bg-secondary text-foreground">
                    <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                </div>
                <h3 className="mt-6 type-headline">{feature.title}</h3>
                <p className="type-caption mt-3 max-w-sm">
                  {feature.description}
                </p>
              </AnimatedItem>
            );
          })}
        </AnimatedSection>
      </Container>
    </section>
  );
}
