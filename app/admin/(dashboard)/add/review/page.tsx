import Link from "next/link";
import { AddContentForm, Field } from "@/components/admin/add-content-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

export default function AddReviewPage() {
  return (
    <div>
      <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground">
        ← All sections
      </Link>
      <h1 className="mt-2 text-2xl font-semibold text-foreground">Add a review</h1>

      <div className="mt-8 max-w-xl">
        <AddContentForm endpoint="/api/admin/content/reviews">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Author" required>
              <Input name="author" required />
            </Field>
            <Field label="Role">
              <Input name="role" placeholder="Bride" />
            </Field>
          </div>
          <Field label="Company">
            <Input name="company" />
          </Field>
          <Field label="Quote" required>
            <Textarea name="quote" required />
          </Field>
          <Field label="Longer story" hint="Optional — shown in Featured Stories">
            <Textarea name="story" />
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
                <option value="maternity">Babyshower / Maternity</option>
                <option value="corporate">Corporate</option>
                <option value="birthday">Birthday</option>
              </Select>
            </Field>
            <Field label="Rating" required>
              <Select name="rating" required defaultValue="">
                <option value="" disabled>
                  Choose…
                </option>
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </Select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Location">
              <Input name="location" />
            </Field>
            <Field label="Date" hint="Defaults to today if left blank">
              <Input name="date" type="date" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Source">
              <Select name="source" defaultValue="studio">
                <option value="studio">Studio</option>
                <option value="google">Google</option>
              </Select>
            </Field>
            <Field label="Related service slug" hint="Optional, e.g. wedding">
              <Input name="serviceSlug" />
            </Field>
          </div>
          <Field label="Feature on the homepage / reviews highlights?">
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input type="checkbox" name="featured" className="size-4" />
              Featured
            </label>
          </Field>
          <Field label="Avatar" hint="Optional">
            <input type="file" name="avatar" accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp" />
          </Field>
          <Field label="Story cover photo" hint="Optional — only needed if you added a story">
            <input type="file" name="cover" accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp" />
          </Field>
        </AddContentForm>
      </div>
    </div>
  );
}
