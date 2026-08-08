import Link from "next/link";
import { AddContentForm, Field } from "@/components/admin/add-content-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

export default function AddBlogPostPage() {
  return (
    <div>
      <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground">
        ← All sections
      </Link>
      <h1 className="mt-2 text-2xl font-semibold text-foreground">Add a journal post</h1>

      <div className="mt-8 max-w-xl">
        <AddContentForm endpoint="/api/admin/content/blog">
          <Field label="Title" required>
            <Input name="title" required />
          </Field>
          <Field label="Excerpt" required>
            <Textarea name="excerpt" required />
          </Field>
          <Field label="Content" required hint="Markdown supported">
            <Textarea name="content" required className="min-h-64" />
          </Field>
          <Field label="Category" required>
            <Select name="category" required defaultValue="">
              <option value="" disabled>
                Choose…
              </option>
              <option value="tips">Tips</option>
              <option value="behind-the-scenes">Behind the Scenes</option>
              <option value="gear">Gear</option>
              <option value="inspiration">Inspiration</option>
              <option value="news">News</option>
            </Select>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Author name" required>
              <Input name="authorName" required />
            </Field>
            <Field label="Author role">
              <Input name="authorRole" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Published date" hint="Defaults to today if left blank">
              <Input name="publishedAt" type="date" />
            </Field>
            <Field label="Reading time (minutes)" hint="Estimated automatically if left blank">
              <Input name="readingTime" type="number" min="1" />
            </Field>
          </div>
          <Field label="Tags" hint="Comma separated">
            <Input name="tags" placeholder="lighting, technique" />
          </Field>
          <Field label="Feature on the Journal page?">
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input type="checkbox" name="featured" className="size-4" />
              Featured
            </label>
          </Field>
          <Field label="Cover image" required>
            <input type="file" name="cover" accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp" required />
          </Field>
          <Field label="Author avatar" hint="Optional">
            <input type="file" name="authorAvatar" accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp" />
          </Field>
        </AddContentForm>
      </div>
    </div>
  );
}
