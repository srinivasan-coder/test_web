import { ImageResponse } from "next/og";

import { OgImageMarkup } from "@/components/seo/og-image-markup";
import { SITE_CONFIG } from "@/lib/constants";

export const runtime = "edge";
export const alt = `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated Open Graph image — no static asset required.
 */
export default function OpenGraphImage() {
  return new ImageResponse(<OgImageMarkup />, { ...size });
}
