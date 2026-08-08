import type { Metadata } from "next";

import { Hero } from "@/components/sections/hero";
import { FeaturedPortfolio } from "@/components/sections/featured-portfolio";
import { ServicesOverview } from "@/components/sections/services-overview";
import { Statistics } from "@/components/sections/statistics";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
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
    "Aperture Studio is a premium San Francisco photography studio crafting timeless images for weddings, brands, families, and editorial work.",
});

export default async function HomePage() {
  const [featuredReviews, heroSrc, categories] = await Promise.all([
    getFeaturedReviewsAsync(),
    resolveSingleImage("hero", "home", "/assets/hero/home.jpg"),
    resolvePortfolioCategories(portfolioCategories),
  ]);

  return (
    <>
      <Hero src={heroSrc} />
      <FeaturedPortfolio categories={categories} />
      <ServicesOverview />
      <Statistics />
      <WhyChooseUs />
      <Testimonials reviews={featuredReviews} />
      <InstagramPreview />
      <CallToAction />
    </>
  );
}
