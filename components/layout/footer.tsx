import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import {
  NAV_LINKS,
  SERVICE_LINKS,
  SITE_CONFIG,
  SOCIAL_LINKS,
} from "@/lib/constants";
import { Container } from "@/components/ui/container";
import { SocialIcons } from "@/components/ui/social-icons";
import { CTAButton } from "@/components/ui/cta-button";
import { Logo } from "./logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-secondary/50">
      <Container className="py-16 lg:py-20">
        <div className="flex flex-col gap-8 rounded-2xl border border-border bg-background px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="font-serif text-2xl font-semibold tracking-tight">
              Let&apos;s make something lasting
            </p>
            <p className="type-caption mt-2 max-w-md">
              Share a little about your day — we reply within two business days.
            </p>
          </div>
          <CTAButton href="/contact" size="md" className="shrink-0 self-start sm:self-auto">
            Book a session
          </CTAButton>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {SITE_CONFIG.description}
            </p>
            <SocialIcons links={SOCIAL_LINKS} className="mt-6" size="sm" />
          </div>

          <nav className="lg:col-span-2" aria-label="Quick links">
            <h3 className="font-serif text-sm font-semibold text-foreground">
              Explore
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-3" aria-label="Services">
            <h3 className="font-serif text-sm font-semibold text-foreground">
              Services
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h3 className="font-serif text-sm font-semibold text-foreground">
              Studio
            </h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{SITE_CONFIG.address}</span>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-3 transition-colors hover:text-foreground"
                >
                  <Mail className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone.replace(/[^+\d]/g, "")}`}
                  className="flex items-center gap-3 transition-colors hover:text-foreground"
                >
                  <Phone className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  {SITE_CONFIG.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-8 text-sm text-muted-foreground">
          <p>
            © {year} {SITE_CONFIG.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
