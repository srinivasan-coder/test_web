import Link from "next/link";
import { notFound } from "next/navigation";
import { getGalleryByIdAsync } from "@/lib/content-store";
import { EditContentForm } from "@/components/admin/edit-content-form";
import { GalleryPhotoUploader } from "@/components/admin/gallery-photo-uploader";
import { Field } from "@/components/admin/add-content-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

export const dynamic = "force-dynamic";

export default async function EditGalleryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const gallery = await getGalleryByIdAsync(id);
  if (!gallery) notFound();

  return (
    <div>
      <Link
        href="/admin/manage/galleries"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← Manage galleries
      </Link>
      <h1 className="mt-2 text-2xl font-semibold text-foreground">Edit {gallery.title}</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Changes are saved instantly and reflected on the portfolio right away.
      </p>

      <div className="mt-8 max-w-xl">
        <EditContentForm endpoint={`/api/admin/content/galleries/${gallery.id}`}>
          <Field label="Title" required>
            <Input name="title" defaultValue={gallery.title} required />
          </Field>
          <Field label="Description" required>
            <Textarea name="description" defaultValue={gallery.description} required />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Category" required>
              <Select name="category" required defaultValue={gallery.category}>
                <option value="wedding">Wedding</option>
                <option value="pre-wedding">Pre Wedding</option>
                <option value="engagement">Engagement</option>
                <option value="baby">Baby</option>
                <option value="maternity">Babyshower / Maternity</option>
                <option value="corporate">Corporate</option>
                <option value="fashion">Fashion</option>
              </Select>
            </Field>
            <Field label="Orientation" required>
              <Select name="orientation" required defaultValue={gallery.orientation}>
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
                <option value="square">Square</option>
              </Select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Location">
              <Input name="location" defaultValue={gallery.location} />
            </Field>
            <Field label="Client">
              <Input name="client" defaultValue={gallery.client} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Date">
              <Input name="date" type="date" defaultValue={gallery.date} />
            </Field>
            <Field label="Tags" hint="Comma separated">
              <Input name="tags" defaultValue={gallery.tags?.join(", ")} />
            </Field>
          </div>
          <Field label="Feature this gallery on the homepage?">
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                name="featured"
                className="size-4"
                defaultChecked={gallery.featured}
              />
              Featured
            </label>
          </Field>
        </EditContentForm>
      </div>

      <h2 className="mt-12 text-lg font-semibold text-foreground">Photos</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Replace the cover or any photo below — each uploads and saves on its own.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <GalleryPhotoUploader
          galleryId={gallery.id}
          field="cover"
          label="Cover"
          initialSrc={gallery.cover.src}
        />
        {gallery.images.map((image, index) => (
          <GalleryPhotoUploader
            key={image.src}
            galleryId={gallery.id}
            field={`photo-${index}`}
            label={`Photo ${index + 1}`}
            initialSrc={image.src}
            deleteIndex={index}
          />
        ))}
      </div>
    </div>
  );
}
