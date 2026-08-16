import type { Metadata } from "next";

import { PageHeader } from "@/components/ui/page-header";
import { ServiceList } from "@/components/services";
import { CallToAction } from "@/components/sections/cta";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { resolveServices } from "@/lib/site-images";

// Reads data/db/site-images.json at request time — must stay dynamic so a
// replaced service image appears without a rebuild.
export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Explore luxury photography services — weddings, engagements, pre-wedding, baby, and maternity — crafted by Fotolites Studio.",
  path: "/services",
});

export default async function ServicesPage() {
  const resolvedServices = await resolveServices(services);

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Photography, tailored with care"
        description="Each collection is designed like a product — considered inclusions, thoughtful process, and a calm path from enquiry to gallery."
      />

      <ServiceList services={resolvedServices} />
      <CallToAction />
    </>
  );
}
