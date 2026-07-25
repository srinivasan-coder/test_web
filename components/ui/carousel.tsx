"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface CarouselProps {
  children: React.ReactNode;
  className?: string;
  /** Enable gentle autoplay. */
  autoplay?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
  /** Show prev/next controls. */
  controls?: boolean;
  "aria-label"?: string;
}

/**
 * A minimal, accessible Embla carousel wrapper.
 * Wrap each item in <CarouselItem /> to control slide width.
 */
export function Carousel({
  children,
  className,
  autoplay = false,
  autoplayDelay = 5000,
  loop = true,
  controls = true,
  ...props
}: CarouselProps) {
  const plugins = React.useMemo(
    () =>
      autoplay
        ? [Autoplay({ delay: autoplayDelay, stopOnInteraction: false })]
        : [],
    [autoplay, autoplayDelay],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop, align: "start", dragFree: false },
    plugins,
  );

  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div
      className={cn("relative", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={props["aria-label"]}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5">{children}</div>
      </div>

      {controls ? (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!loop && !canPrev}
            aria-label="Previous slide"
            className="inline-flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary disabled:opacity-40"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!loop && !canNext}
            aria-label="Next slide"
            className="inline-flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary disabled:opacity-40"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      ) : null}
    </div>
  );
}

interface CarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tailwind basis classes controlling slide width. */
  basis?: string;
}

export function CarouselItem({
  className,
  basis = "basis-full sm:basis-1/2 lg:basis-1/3",
  ...props
}: CarouselItemProps) {
  return (
    <div
      className={cn("min-w-0 shrink-0 grow-0", basis, className)}
      role="group"
      aria-roledescription="slide"
      {...props}
    />
  );
}
