import type { Metadata, Viewport } from "next";

import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { SITE_CONFIG } from "@/lib/constants";
import {
  buildMetadata,
  localBusinessJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingWhatsApp } from "@/components/contact/floating-whatsapp";
import { PageTransition } from "@/components/motion/page-transition";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  ...buildMetadata(),
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    template: `%s — ${SITE_CONFIG.name}`,
  },
  keywords: [
    "photography",
    "photography studio",
    "wedding photography",
    "portrait photography",
    "editorial photography",
    "San Francisco photographer",
    "Aperture Studio",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  applicationName: SITE_CONFIG.name,
  category: "photography",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body className="min-h-dvh bg-background text-foreground antialiased">
        <JsonLd data={[localBusinessJsonLd(), websiteJsonLd()]} />
        <ScrollProgress />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" tabIndex={-1}>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
