import Link from "next/link";
import Image from "next/image";
import { getAllInstagramPosts } from "@/lib/content-store";
import { DeleteInstagramButton } from "@/components/admin/delete-instagram-button";

// Overrides/added tiles live in Firestore — read fresh every visit.
export const dynamic = "force-dynamic";

export default async function ManageInstagramPage() {
  const posts = await getAllInstagramPosts();

  return (
    <div>
      <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground">
        ← All sections
      </Link>
      <h1 className="mt-2 text-2xl font-semibold text-foreground">Manage Instagram tiles</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Edit a tile&apos;s photo and link, or remove it from the homepage preview.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="overflow-hidden rounded-2xl border border-border bg-background"
          >
            <div className="relative aspect-square bg-secondary">
              <Image
                src={post.image.src}
                alt={post.image.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
                unoptimized
              />
              <DeleteInstagramButton id={post.id} alt={post.image.alt} />
            </div>
            <div className="p-4">
              <p className="text-sm font-medium text-foreground">{post.image.alt}</p>
              <p className="mt-1 truncate text-xs text-muted-foreground">{post.href}</p>
              <Link
                href={`/admin/manage/instagram/${post.id}/edit`}
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
