import type { SVGProps } from "react";
import Link from "next/link";
import Image from "next/image";
import { Images, ChevronRight } from "lucide-react";
import { adminSections } from "@/lib/admin-sections";
import { resolveSingleImage } from "@/lib/site-images";

// lucide-react dropped brand/logo icons (Instagram included) a while back
// for trademark reasons — hand-drawn instead of importing a nonexistent export.
function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Thumbnails reflect data/db/site-images.json — read fresh every visit.
export const dynamic = "force-dynamic";

const ADD_NEW_LINKS = [
  { href: "/admin/add/gallery", label: "Add gallery", description: "New portfolio project" },
  { href: "/admin/add/team", label: "Add team member", description: "New person on About" },
  { href: "/admin/add/review", label: "Add review", description: "New client testimonial" },
  { href: "/admin/add/instagram", label: "Add Instagram tile", description: "New feed photo" },
];

const MANAGE_LINKS = [
  {
    href: "/admin/manage/galleries",
    label: "Manage galleries",
    description: "Edit details, replace photos, or delete",
    icon: Images,
  },
  {
    href: "/admin/manage/instagram",
    label: "Manage Instagram tiles",
    description: "Edit details, replace photos, or delete",
    icon: InstagramIcon,
  },
];

export default async function AdminDashboardPage() {
  const thumbnails = await Promise.all(
    adminSections.map((section) =>
      resolveSingleImage(section.slug, section.slots[0]!.id, `/assets/${section.slots[0]!.path}`),
    ),
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground">Add new content</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Create a brand-new gallery, team member, review, or Instagram tile — live
        immediately, no rebuild needed.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ADD_NEW_LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col rounded-2xl border border-dashed border-border bg-background p-4 transition-colors hover:border-[color-mix(in_srgb,var(--color-line)_65%,var(--color-slate))]"
          >
            <p className="font-medium text-foreground">+ {item.label}</p>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </Link>
        ))}
      </div>

      <h2 className="mt-12 text-2xl font-semibold text-foreground">Manage content</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Edit or remove galleries and Instagram tiles you&apos;ve already added or replaced.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MANAGE_LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center gap-4 rounded-2xl border border-border bg-background p-4 shadow-xs transition-all hover:border-[color-mix(in_srgb,var(--color-line)_65%,var(--color-slate))] hover:shadow-sm"
          >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground transition-colors group-hover:bg-[color-mix(in_srgb,var(--color-surface)_55%,var(--color-line))]">
              <item.icon className="size-5" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-foreground">{item.label}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
            <ChevronRight
              className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>

      <h2 className="mt-12 text-2xl font-semibold text-foreground">Sections</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Choose a section to replace an existing image. Changes are saved instantly
        — no rebuild needed.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {adminSections.map((section, index) => (
          <Link
            key={section.slug}
            href={`/admin/${section.slug}`}
            className="group flex items-center gap-4 rounded-2xl border border-border bg-background p-4 transition-colors hover:border-[color-mix(in_srgb,var(--color-line)_65%,var(--color-slate))]"
          >
            <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-secondary">
              <Image
                src={thumbnails[index]!}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
                unoptimized
              />
            </div>
            <div>
              <p className="font-medium text-foreground">{section.title}</p>
              <p className="text-sm text-muted-foreground">
                {section.slots.length} image{section.slots.length === 1 ? "" : "s"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
