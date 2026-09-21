import Link from "next/link";
import { notFound } from "next/navigation";
import { getInstagramPostByIdAsync } from "@/lib/content-store";
import { EditContentForm } from "@/components/admin/edit-content-form";
import { InstagramPhotoUploader } from "@/components/admin/instagram-photo-uploader";
import { Field } from "@/components/admin/add-content-form";
import { Input } from "@/components/ui/input";

export const dynamic = "force-dynamic";

export default async function EditInstagramPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getInstagramPostByIdAsync(id);
  if (!post) notFound();

  return (
    <div>
      <Link
        href="/admin/manage/instagram"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← Manage Instagram tiles
      </Link>
      <h1 className="mt-2 text-2xl font-semibold text-foreground">Edit Instagram tile</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Changes are saved instantly and reflected on the homepage right away.
      </p>

      <div className="mt-8 max-w-xl">
        <EditContentForm endpoint={`/api/admin/content/instagram/${post.id}`}>
          <Field label="Alt text" required hint="Describes the photo for accessibility">
            <Input name="alt" defaultValue={post.image.alt} required />
          </Field>
          <Field label="Link" hint="Defaults to instagram.com if left blank">
            <Input name="href" defaultValue={post.href} placeholder="https://instagram.com/p/..." />
          </Field>
        </EditContentForm>
      </div>

      <h2 className="mt-12 text-lg font-semibold text-foreground">Photo</h2>
      <div className="mt-6 max-w-xs">
        <InstagramPhotoUploader instagramId={post.id} initialSrc={post.image.src} />
      </div>
    </div>
  );
}
