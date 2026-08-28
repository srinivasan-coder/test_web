"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CTAButton } from "@/components/ui/cta-button";
import { getIcon } from "@/lib/icon-map";
import { EASE_OUT_SOFT } from "@/lib/animations";
import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
  /** Alternate image/content placement for a product-page rhythm. */
  reverse?: boolean;
  priority?: boolean;
  className?: string;
}

/**
 * Luxury product-style service block — hero image, inclusions, CTAs.
 */
export function ServiceCard({
  service,
  reverse = false,
  priority = false,
  className,
}: ServiceCardProps) {
  const reduceMotion = useReducedMotion();
  const Icon = getIcon(service.icon);

  return (
    <motion.article
      id={service.slug}
      initial={reduceMotion ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: EASE_OUT_SOFT }}
      className={cn(
        "scroll-mt-28 overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-500 hover:shadow-md",
        className,
      )}
    >
      <div
        className={cn(
          "grid grid-cols-1 lg:grid-cols-2",
          reverse && "lg:[&>*:first-child]:order-2",
        )}
      >
        {/* Image reveal */}
        <div className="relative min-h-[16rem] overflow-hidden bg-secondary sm:min-h-[22rem] lg:min-h-full">
          <motion.div
            initial={
              reduceMotion ? false : { scale: 1.05, opacity: 0.65 }
            }
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE_OUT_SOFT }}
            className="absolute inset-0"
          >
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={priority}
              loading={priority ? "eager" : "lazy"}
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03]"
            />
          </motion.div>
          <div className="absolute inset-0 bg-ink/10" />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
          <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
            <Icon className="size-5" strokeWidth={1.75} />
          </div>

          <h2 className="mt-6 font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            {service.title}
          </h2>
          <div className="mt-4 space-y-4">
            {service.description.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {service.includes.length > 0 || service.highlights.length > 0 ? (
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {service.includes.length > 0 ? (
                <div>
                  <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
                    What&apos;s included
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {service.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground"
                      >
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-primary"
                          strokeWidth={2}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {service.highlights.length > 0 ? (
                <div>
                  <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
                    Package highlights
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {service.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground"
                      >
                        <Sparkles
                          className="mt-0.5 size-4 shrink-0 text-primary"
                          strokeWidth={1.75}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ) : null}

          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-border pt-8">
            <Button asChild variant="outline" size="lg">
              <Link href={service.galleryHref}>View Gallery</Link>
            </Button>
            <CTAButton
              href={`/contact?eventType=${service.slug}`}
              size="lg"
              withArrow={false}
            >
              Book Now
            </CTAButton>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
