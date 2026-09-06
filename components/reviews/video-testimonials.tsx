"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import LightboxLib from "yet-another-react-lightbox";
import VideoPlugin from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Carousel, CarouselItem } from "@/components/ui/carousel";
import { getReviewCategoryLabel } from "@/lib/reviews";
import { EASE_OUT_SOFT } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { VideoTestimonial } from "@/types";

interface VideoTestimonialsProps {
  videos: VideoTestimonial[];
}

/**
 * Auto-scrolling video testimonial carousel. Cards without an uploaded
 * video (no admin upload yet) show their poster without a play action.
 */
export function VideoTestimonials({ videos }: VideoTestimonialsProps) {
  const reduceMotion = useReducedMotion();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const playableVideos = videos.filter((v) => v.videoUrl);

  return (
    <section className="section-y bg-secondary/40">
      <Container>
        <AnimatedSection>
          <SectionHeading
            align="center"
            eyebrow="Video testimonials"
            title="Hear it in their words"
            description="Short films from recent clients, in their own words."
            className="mx-auto items-center"
          />
        </AnimatedSection>

        <AnimatedSection className="mt-14">
          <Carousel
            autoplay={!reduceMotion}
            autoplayDelay={4500}
            controls
            aria-label="Video testimonials"
          >
            {videos.map((video) => {
              const playable = Boolean(video.videoUrl);
              return (
              <CarouselItem
                key={video.id}
                basis="basis-[88%] sm:basis-[60%] lg:basis-[42%]"
              >
                <motion.article
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  transition={{ duration: 0.35, ease: EASE_OUT_SOFT }}
                  className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (!playable) return;
                      const index = playableVideos.findIndex((v) => v.id === video.id);
                      if (index >= 0) setLightboxIndex(index);
                    }}
                    className={cn(
                      "group relative block aspect-[16/10] w-full overflow-hidden bg-secondary text-left",
                      !playable && "cursor-default",
                    )}
                    aria-label={
                      playable
                        ? `Play video testimonial: ${video.title}`
                        : `${video.title} — video coming soon`
                    }
                  >
                    <Image
                      src={video.poster}
                      alt={video.title}
                      fill
                      sizes="(max-width: 1024px) 80vw, 40vw"
                      loading="lazy"
                      className={cn(
                        "object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        playable && "group-hover:scale-[1.04]",
                      )}
                    />
                    <div className="absolute inset-0 bg-ink/35 transition-colors duration-500 group-hover:bg-ink/45" />
                    {playable && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="inline-flex size-14 items-center justify-center rounded-full bg-white text-ink shadow-md transition-transform duration-500 group-hover:scale-105">
                          <Play className="size-5 fill-current" />
                        </span>
                      </span>
                    )}
                    <span className="absolute bottom-4 right-4 rounded-full bg-ink/70 px-2.5 py-1 text-xs font-medium text-white">
                      {playable ? video.duration : "Coming soon"}
                    </span>
                  </button>
                  <div className="p-6">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
                      {getReviewCategoryLabel(video.category)}
                    </p>
                    <h3 className="mt-2 font-serif text-xl font-semibold">
                      {video.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {video.client}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-foreground">
                      “{video.quote}”
                    </p>
                  </div>
                </motion.article>
              </CarouselItem>
              );
            })}
          </Carousel>
        </AnimatedSection>
      </Container>

      {lightboxIndex !== null && (
        <LightboxLib
          open
          close={() => setLightboxIndex(null)}
          index={lightboxIndex}
          slides={playableVideos.map((video) => ({
            type: "video" as const,
            poster: video.poster,
            width: 1280,
            height: 720,
            sources: [{ src: video.videoUrl as string, type: "video/mp4" }],
          }))}
          plugins={[VideoPlugin]}
          video={{ autoPlay: true, controls: true }}
          on={{ view: ({ index }) => setLightboxIndex(index) }}
          styles={{ container: { backgroundColor: "rgba(17, 24, 39, 0.96)" } }}
        />
      )}
    </section>
  );
}
