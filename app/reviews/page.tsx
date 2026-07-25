import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { PageHeader } from "@/components/ui/page-header";
import { CallToAction } from "@/components/sections/cta";
import {
  OverallRating,
  ClientStatistics,
  FeaturedStories,
} from "@/components/reviews";
import {
  reviews,
  featuredStories,
  videoTestimonials,
  reviewStats,
} from "@/data/reviews";
import { getRatingSummary } from "@/lib/reviews";
import { SITE_CONFIG } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Reviews",
  description: `Read client reviews for ${SITE_CONFIG.name} — weddings, corporate, baby, and birthday photography rated by real clients.`,
  path: "/reviews",
});

const ReviewGrid = dynamic(
  () =>
    import("@/components/reviews/review-grid").then((mod) => mod.ReviewGrid),
  {
    loading: () => (
      <div className="section-y" aria-busy="true">
        <div className="mx-auto max-w-7xl px-6 text-sm text-muted-foreground">
          Loading reviews…
        </div>
      </div>
    ),
  },
);

const VideoTestimonials = dynamic(
  () =>
    import("@/components/reviews/video-testimonials").then(
      (mod) => mod.VideoTestimonials,
    ),
);

export default function ReviewsPage() {
  const summary = getRatingSummary(reviews);

  return (
    <>
      <PageHeader
        eyebrow="Reviews"
        title="Trusted by the people we photograph"
        description="Honest feedback from couples, families, and brands — a clear picture of what it's like to work with the studio."
      />

      <OverallRating summary={summary} />
      <ReviewGrid reviews={reviews} />
      <VideoTestimonials videos={videoTestimonials} />
      <ClientStatistics stats={reviewStats} />
      <FeaturedStories stories={featuredStories} />
      <CallToAction />
    </>
  );
}
