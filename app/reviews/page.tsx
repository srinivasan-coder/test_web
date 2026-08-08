import type { Metadata } from "next";
import nextDynamic from "next/dynamic";

import { PageHeader } from "@/components/ui/page-header";
import { CallToAction } from "@/components/sections/cta";
import {
  OverallRating,
  ClientStatistics,
  FeaturedStories,
} from "@/components/reviews";
import { videoTestimonials as seedVideoTestimonials, reviewStats } from "@/data/reviews";
import { getAllReviews, getFeaturedStoriesAsync } from "@/lib/content-store";
import { resolveVideoTestimonials } from "@/lib/site-images";
import { getRatingSummary } from "@/lib/reviews";
import { SITE_CONFIG } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

// Reads data/db/reviews.json at request time — must stay dynamic so newly
// added reviews appear without a rebuild.
export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Reviews",
  description: `Read client reviews for ${SITE_CONFIG.name} — weddings, corporate, baby, and birthday photography rated by real clients.`,
  path: "/reviews",
});

const ReviewGrid = nextDynamic(
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

const VideoTestimonials = nextDynamic(
  () =>
    import("@/components/reviews/video-testimonials").then(
      (mod) => mod.VideoTestimonials,
    ),
);

export default async function ReviewsPage() {
  const [reviews, featuredStories, videoTestimonials] = await Promise.all([
    getAllReviews(),
    getFeaturedStoriesAsync(),
    resolveVideoTestimonials(seedVideoTestimonials),
  ]);
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
