import { Container } from "@/components/ui/container";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  AnimatedSection,
  AnimatedItem,
} from "@/components/ui/animated-section";
import { staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { Stat } from "@/types";

interface StatsStripProps {
  stats: Stat[];
  className?: string;
  bordered?: boolean;
}

/**
 * Shared animated statistics strip used on Home and Reviews.
 */
export function StatsStrip({
  stats,
  className,
  bordered = true,
}: StatsStripProps) {
  return (
    <section
      className={cn(bordered && "border-y border-border", className)}
    >
      <Container className="section-y-band">
        <AnimatedSection
          variants={staggerContainer}
          className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4 lg:gap-8"
        >
          {stats.map((stat) => (
            <AnimatedItem key={stat.id} className="text-center">
              <p className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals ?? 0}
                  label={stat.label}
                />
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground sm:text-sm sm:normal-case sm:tracking-normal">
                {stat.label}
              </p>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </Container>
    </section>
  );
}
