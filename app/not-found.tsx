import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { CTAButton } from "@/components/ui/cta-button";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Page not found",
  description: "The page you are looking for does not exist.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <section className="section-y flex min-h-[70vh] items-center">
      <Container className="text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          This page is out of frame
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
          Let&apos;s get you back to the light.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <CTAButton href="/" withArrow={false}>
            Back home
          </CTAButton>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Contact the studio</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
