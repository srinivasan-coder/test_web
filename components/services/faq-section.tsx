"use client";

import * as React from "react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedSection } from "@/components/ui/animated-section";
import type { FaqItem as FaqItemType } from "@/types";
import { FaqItem } from "./faq-item";

interface FaqSectionProps {
  items: FaqItemType[];
  eyebrow?: string;
  title?: string;
  description?: string;
}

/**
 * Accordion FAQ block for the Services page.
 */
export function FaqSection({
  items,
  eyebrow = "FAQ",
  title = "Questions, answered",
  description = "Everything you need to know before booking a session with the studio.",
}: FaqSectionProps) {
  const [openId, setOpenId] = React.useState<string | null>(items[0]?.id ?? null);

  return (
    <section className="section-y bg-secondary/40">
      <Container size="narrow">
        <AnimatedSection>
          <SectionHeading
            align="center"
            eyebrow={eyebrow}
            title={title}
            description={description}
            className="mx-auto items-center"
          />
        </AnimatedSection>

        <AnimatedSection className="mt-12">
          <div className="rounded-2xl border border-border bg-card px-6 shadow-sm sm:px-8">
            {items.map((item) => (
              <FaqItem
                key={item.id}
                item={item}
                open={openId === item.id}
                onToggle={() =>
                  setOpenId((current) =>
                    current === item.id ? null : item.id,
                  )
                }
              />
            ))}
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
