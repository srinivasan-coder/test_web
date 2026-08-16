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
      streetAddress: "12A, West Vanniar 1st Cross Street, Nasapakkam",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      postalCode: "600078",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 13.0378,
      longitude: 80.2101,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "18:00",
      },
    ],
    sameAs: [
      SITE_CONFIG.instagram,
      "https://www.facebook.com/fotolitesstudio/",
      "https://www.youtube.com/channel/UC0KcXZfnSd3w2YAvamckN0Q",
      SITE_CONFIG.whatsapp,
    ],
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
