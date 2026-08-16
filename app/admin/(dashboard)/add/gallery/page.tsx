import Link from "next/link";
import { AddContentForm, Field } from "@/components/admin/add-content-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

export default function AddGalleryPage() {
  return (
    <div>
      <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground">
        ← All sections
      </Link>
      <h1 className="mt-2 text-2xl font-semibold text-foreground">Add a new gallery</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Creates a new portfolio project with its own cover and photos.
      </p>

      <div className="mt-8 max-w-xl">
        <AddContentForm endpoint="/api/admin/content/galleries">
          <Field label="Title" required>
            <Input name="title" required />
          </Field>
          <Field label="Description" required>
            <Textarea name="description" required />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Category" required>
              <Select name="category" required defaultValue="">
                <option value="" disabled>
                  Choose…
                </option>
                <option value="wedding">Wedding</option>
                <option value="engagement">Engagement</option>
                <option value="pre-wedding">Pre Wedding</option>
                <option value="baby">Baby</option>
                <option value="maternity">Maternity</option>
                <option value="corporate">Corporate</option>
                <option value="fashion">Fashion</option>
              </Select>
            </Field>
            <Field label="Orientation" required>
              <Select name="orientation" required defaultValue="">
                <option value="" disabled>
                  Choose…
                </option>
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
                <option value="square">Square</option>
              </Select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Location">
              <Input name="location" />
            </Field>
            <Field label="Client">
              <Input name="client" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Date" hint="Defaults to today if left blank">
              <Input name="date" type="date" />
            </Field>
            <Field label="Tags" hint="Comma separated">
              <Input name="tags" placeholder="wedding, coastal, golden hour" />
            </Field>
          </div>
          <Field label="Feature this gallery on the homepage?">
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input type="checkbox" name="featured" className="size-4" />
              Featured
            </label>
          </Field>
          <Field label="Cover image" required>
            <input type="file" name="cover" accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp" required />
          </Field>
          <Field label="Cover alt text" hint="Describes the cover image for accessibility">
            <Input name="coverAlt" />
          </Field>
          <Field label="Additional photos" hint="Optional — add as many as you like">
            <input
              type="file"
              name="photos"
              accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
              multiple
            />
          </Field>
        </AddContentForm>
      </div>
    </div>
  );
}
