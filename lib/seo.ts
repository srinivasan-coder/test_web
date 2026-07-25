import type { Metadata } from "next";

import { SITE_CONFIG } from "@/lib/constants";

type BuildMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

/**
 * Consistent page metadata with Open Graph + Twitter cards.
 */
export function buildMetadata({
  title,
  description = SITE_CONFIG.description,
  path = "/",
  image = SITE_CONFIG.ogImage,
  type = "website",
  noIndex = false,
}: BuildMetadataInput = {}): Metadata {
  const url = new URL(path, SITE_CONFIG.url).toString();
  const absoluteImage = image.startsWith("http")
    ? image
    : new URL(image, SITE_CONFIG.url).toString();
  const fullTitle = title
    ? `${title} — ${SITE_CONFIG.name}`
    : `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`;

  return {
    title: title ?? undefined,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      locale: "en_US",
      url,
      title: fullTitle,
      description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: absoluteImage,
          width: 1200,
          height: 630,
          alt: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

/** LocalBusiness / PhotographyBusiness JSON-LD. */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    additionalType: "https://schema.org/ProfessionalService",
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    image: new URL(SITE_CONFIG.ogImage, SITE_CONFIG.url).toString(),
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "17 Marina Boulevard",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.806,
      longitude: -122.433,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "18:00",
      },
    ],
    sameAs: [SITE_CONFIG.instagram, SITE_CONFIG.whatsapp],
    priceRange: "$$",
  };
}

/** WebSite JSON-LD with sitelinks search hint. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  };
}

/** BlogPosting JSON-LD for journal articles. */
export function blogPostingJsonLd(input: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  authorName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    image: input.image,
    datePublished: input.datePublished,
    author: {
      "@type": "Person",
      name: input.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    mainEntityOfPage: input.url,
  };
}

/** FAQPage JSON-LD for the services FAQ. */
export function faqPageJsonLd(
  items: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
