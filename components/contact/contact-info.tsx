import type { ComponentType, SVGProps } from "react";
import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import { InstagramIcon } from "@/components/ui/instagram-icon";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

type InfoIcon = ComponentType<SVGProps<SVGSVGElement> & { strokeWidth?: number }>;

interface InfoItem {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: InfoIcon;
  external?: boolean;
}

const items: InfoItem[] = [
  {
    id: "address",
    label: "Studio address",
    value: SITE_CONFIG.address,
    href: SITE_CONFIG.mapLink,
    icon: MapPin,
    external: true,
  },
  {
    id: "phone",
    label: "Phone",
    value: SITE_CONFIG.phone,
    href: `tel:${SITE_CONFIG.phoneE164}`,
    icon: Phone,
  },
  {
    id: "email",
    label: "Email",
    value: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
    icon: Mail,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "Chat with the studio",
    href: SITE_CONFIG.whatsapp,
    icon: MessageCircle,
    external: true,
  },
  {
    id: "instagram",
    label: "Instagram",
    value: `@${SITE_CONFIG.instagramHandle}`,
    href: SITE_CONFIG.instagram,
    icon: InstagramIcon,
    external: true,
  },
];

/**
 * Left-column studio details for the Contact page.
 */
export function ContactInfo() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <span className="eyebrow">Visit & connect</span>
        <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
          We&apos;d love to hear from you
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Tell us about your special day or what you&apos;re planning.
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          We typically reply within two business days.
        </p>
      </div>

      <ul className="space-y-5">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id} className="flex gap-4">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
                <Icon className="size-5" strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {item.label}
                </p>
                <a
                  href={item.href}
                  {...(item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={cn(
                    "mt-1 inline-block text-base font-medium text-foreground transition-colors hover:text-primary",
                    item.id === "phone" && "whitespace-nowrap",
                  )}
                >
                  {item.value}
                </a>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="rounded-2xl border border-border bg-secondary/50 p-6">
        <div className="flex gap-4">
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-background text-primary shadow-xs">
            <Clock className="size-5" strokeWidth={1.75} />
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Working hours
            </p>
            <p className="mt-2 text-sm font-medium text-foreground">
              {SITE_CONFIG.hours.weekdays}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {SITE_CONFIG.hours.weekend}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
