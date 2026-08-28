import type { Metadata } from "next";

import { Hero } from "@/components/sections/hero";
import { FeaturedPortfolio } from "@/components/sections/featured-portfolio";
import { ServicesOverview } from "@/components/sections/services-overview";
import { Statistics } from "@/components/sections/statistics";
import { Testimonials } from "@/components/sections/testimonials";
import { InstagramPreview } from "@/components/sections/instagram-preview";
import { CallToAction } from "@/components/sections/cta";
import { buildMetadata } from "@/lib/seo";
import { getFeaturedReviewsAsync } from "@/lib/content-store";
import { resolveSingleImage, resolvePortfolioCategories } from "@/lib/site-images";
import { portfolioCategories } from "@/data/portfolio-categories";

// Reads data/db/*.json at request time (admin-added content) — must stay
// dynamic so new entries appear without a rebuild.
export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  path: "/",
  description:
    "Fotolites Studio is a premium Chennai photography studio crafting timeless images for weddings, engagements, families, and brands.",
});

const HERO_SLIDES = [
  { id: "slide-1", fallback: "/assets/hero/slide-1.jpg" },
  { id: "slide-2", fallback: "/assets/hero/slide-2.jpg" },
  { id: "slide-3", fallback: "/assets/hero/slide-3.jpg" },
  { id: "slide-4", fallback: "/assets/hero/slide-4.jpg" },
];

export default async function HomePage() {
  const [featuredReviews, heroImages, categories] = await Promise.all([
    getFeaturedReviewsAsync(),
    Promise.all(
      HERO_SLIDES.map((slide) => resolveSingleImage("hero", slide.id, slide.fallback)),
    ),
    resolvePortfolioCategories(portfolioCategories),
  ]);

  return (
    <>
      <Hero images={heroImages} />
      <FeaturedPortfolio categories={categories} />
      <ServicesOverview />
      <Statistics />
      <Testimonials reviews={featuredReviews} />
      <InstagramPreview />
      <CallToAction />
    </>
  );
}
