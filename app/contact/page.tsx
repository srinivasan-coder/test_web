import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { ContactInfo, MapPlaceholder } from "@/components/contact";
import { SITE_CONFIG } from "@/lib/constants";
import { contactSchema, type ContactFormValues } from "@/lib/validations";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: `Book a session with ${SITE_CONFIG.name}. Call, WhatsApp, or send an enquiry — we reply within two business days.`,
  path: "/contact",
});

const ContactForm = dynamic(
  () =>
    import("@/components/forms/contact-form").then((mod) => mod.ContactForm),
  {
    loading: () => (
      <div
        className="min-h-[28rem] rounded-2xl border border-border bg-secondary/40 p-8"
        aria-busy="true"
        aria-live="polite"
      >
        <p className="text-sm text-muted-foreground">Loading form…</p>
      </div>
    ),
  },
);

interface ContactPageProps {
  searchParams: Promise<{ service?: string; eventType?: string }>;
}

function resolveEventType(
  value?: string,
): ContactFormValues["eventType"] | undefined {
  if (!value) return undefined;
  const parsed = contactSchema.shape.eventType.safeParse(value);
  return parsed.success ? parsed.data : undefined;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const defaultEventType = resolveEventType(
    params.eventType ?? params.service,
  );

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's create something lasting."
        description="Reach out by form, phone, or WhatsApp — share a little about your day and we'll take care of the rest."
      />

      <section className="section-y-tight">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="flex flex-col gap-10 lg:col-span-5">
              <ContactInfo />
              <MapPlaceholder />
            </div>

            <div className="lg:col-span-7">
              <ContactForm defaultEventType={defaultEventType} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
