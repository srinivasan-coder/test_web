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

export const metadata: Metadata = buildMetadata({
  path: "/",
  description:
    "Aperture Studio is a premium San Francisco photography studio crafting timeless images for weddings, brands, families, and editorial work.",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedPortfolio />
      <ServicesOverview />
      <Statistics />
      <WhyChooseUs />
      <Testimonials />
      <InstagramPreview />
      <CallToAction />
    </>
  );
}
