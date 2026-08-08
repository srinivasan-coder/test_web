import { notFound } from "next/navigation";
import Link from "next/link";
import { getSection } from "@/lib/admin-sections";
import { SlotUploader } from "@/components/admin/slot-uploader";
import { resolveSingleImage } from "@/lib/site-images";

// The current image per slot lives in data/db/site-images.json — read it
// fresh on every visit so the admin screen never shows a stale thumbnail.
export const dynamic = "force-dynamic";

export default async function AdminSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section: sectionSlug } = await params;
  const section = getSection(sectionSlug);
  if (!section) notFound();

  const slotsWithSrc = await Promise.all(
    section.slots.map(async (slot) => ({
      slot,
      src: await resolveSingleImage(section.slug, slot.id, `/assets/${slot.path}`),
    })),
  );

  return (
    <div>
      <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground">
        ← All sections
      </Link>
      <h1 className="mt-2 text-2xl font-semibold text-foreground">{section.title}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{section.description}</p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {slotsWithSrc.map(({ slot, src }) => (
          <SlotUploader key={slot.id} section={section.slug} slot={slot} initialSrc={src} />
        ))}
      </div>
    </div>
  );
}
