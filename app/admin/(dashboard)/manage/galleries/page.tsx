import Link from "next/link";
import Image from "next/image";
import { getAllGalleries } from "@/lib/content-store";

// Overrides/added galleries live in Firestore — read fresh every visit.
export const dynamic = "force-dynamic";

export default async function ManageGalleriesPage() {
  const galleries = await getAllGalleries();

  return (
    <div>
      <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground">
        ← All sections
      </Link>
      <h1 className="mt-2 text-2xl font-semibold text-foreground">Manage galleries</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Edit a gallery&apos;s details and photos.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {galleries.map((gallery) => (
          <div
            key={gallery.id}
            className="overflow-hidden rounded-2xl border border-border bg-background"
          >
            <div className="relative aspect-[4/3] bg-secondary">
              <Image
                src={gallery.cover.src}
                alt={gallery.cover.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="p-4">
              <p className="text-sm font-medium text-foreground">{gallery.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {gallery.category}
                {gallery.location ? ` · ${gallery.location}` : ""}
              </p>
              <Link
                href={`/admin/manage/galleries/${gallery.id}/edit`}
                className="mt-3 block rounded-full border border-border bg-background px-4 py-2 text-center text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
