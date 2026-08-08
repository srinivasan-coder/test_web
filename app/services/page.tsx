import type { Metadata } from "next";
import nextDynamic from "next/dynamic";

import { PageHeader } from "@/components/ui/page-header";
import { ServiceList } from "@/components/services";
import { CallToAction } from "@/components/sections/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { services } from "@/data/services";
import { serviceFaqs } from "@/data/faqs";
import { buildMetadata, faqPageJsonLd } from "@/lib/seo";
import { resolveServices } from "@/lib/site-images";

// Reads data/db/site-images.json at request time — must stay dynamic so a
// replaced service image appears without a rebuild.
export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Explore luxury photography services — weddings, pre-wedding, baby, corporate, fashion, and product — crafted by Aperture Studio.",
  path: "/services",
});

const FaqSection = nextDynamic(
  () =>
    import("@/components/services/faq-section").then((mod) => mod.FaqSection),
  {
    loading: () => (
      <div className="section-y" aria-busy="true">
        <div className="mx-auto max-w-3xl px-6 text-sm text-muted-foreground">
          Loading FAQ…
        </div>
      </div>
    ),
  },
);

export default async function ServicesPage() {
  const resolvedServices = await resolveServices(services);

  return (
    <>
      <JsonLd data={faqPageJsonLd(serviceFaqs)} />
      <PageHeader
        eyebrow="Services"
        title="Photography, tailored with care"
        description="Each collection is designed like a product — considered inclusions, clear pricing, and a calm path from enquiry to gallery."
      />

      <ServiceList services={resolvedServices} />
      <FaqSection items={serviceFaqs} />
      <CallToAction />
    </>
  );
}
