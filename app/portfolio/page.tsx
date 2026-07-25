import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

import { PageHeader } from "@/components/ui/page-header";
import { ExplorerSkeleton } from "@/components/ui/skeleton";
import { galleries } from "@/data/gallery";
import { isGalleryCategory } from "@/lib/gallery";
import { buildMetadata } from "@/lib/seo";
import type { GalleryFilter } from "@/types";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio",
  description:
    "Browse wedding, engagement, pre-wedding, baby, corporate, and fashion photography from Aperture Studio.",
  path: "/portfolio",
});

const PortfolioExplorer = dynamic(
  () =>
    import("@/components/gallery/portfolio-explorer").then(
      (mod) => mod.PortfolioExplorer,
    ),
);

interface PortfolioPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const params = await searchParams;
  const initialCategory: GalleryFilter =
    params.category && isGalleryCategory(params.category)
      ? params.category
      : "all";

  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="A collection shaped by light"
        description="Explore our work across weddings, engagements, families, brands, and fashion — filtered, searchable, and built to linger."
      />

      <Suspense fallback={<ExplorerSkeleton variant="masonry" />}>
        <PortfolioExplorer
          galleries={galleries}
          initialCategory={initialCategory}
        />
      </Suspense>
    </>
  );
}
