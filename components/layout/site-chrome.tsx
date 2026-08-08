"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingWhatsApp } from "@/components/contact/floating-whatsapp";
import { PageTransition } from "@/components/motion/page-transition";
import { ScrollProgress } from "@/components/motion/scroll-progress";

/** Admin pages have their own header/layout — skip the public site chrome there. */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  if (isAdmin) {
    return <main id="main">{children}</main>;
  }

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
