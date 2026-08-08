import Link from "next/link";
import { AddContentForm, Field } from "@/components/admin/add-content-form";
import { Input } from "@/components/ui/input";

export default function AddInstagramPostPage() {
  return (
    <div>
      <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground">
        ← All sections
      </Link>
      <h1 className="mt-2 text-2xl font-semibold text-foreground">Add an Instagram tile</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Adds a new tile to the homepage Instagram preview grid.
      </p>

      <div className="mt-8 max-w-xl">
        <AddContentForm endpoint="/api/admin/content/instagram">
          <Field label="Alt text" required hint="Describes the photo for accessibility">
            <Input name="alt" required />
          </Field>
          <Field label="Link" hint="Defaults to instagram.com if left blank">
            <Input name="href" placeholder="https://instagram.com/p/..." />
          </Field>
          <Field label="Photo" required>
            <input type="file" name="image" accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp" required />
          </Field>
        </AddContentForm>
      </div>
    </div>
  );
}
