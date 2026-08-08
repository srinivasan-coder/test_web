import Link from "next/link";
import { AddContentForm, Field } from "@/components/admin/add-content-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AddTeamMemberPage() {
  return (
    <div>
      <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground">
        ← All sections
      </Link>
      <h1 className="mt-2 text-2xl font-semibold text-foreground">Add a team member</h1>

      <div className="mt-8 max-w-xl">
        <AddContentForm endpoint="/api/admin/content/team">
          <Field label="Name" required>
            <Input name="name" required />
          </Field>
          <Field label="Role" required>
            <Input name="role" placeholder="Photographer" required />
          </Field>
          <Field label="Bio" required>
            <Textarea name="bio" required />
          </Field>
          <Field label="Specialties" hint="Comma separated">
            <Input name="specialties" placeholder="Weddings, Portraits" />
          </Field>
          <Field label="Show on the About page team grid?">
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input type="checkbox" name="featured" className="size-4" />
              Featured
            </label>
          </Field>
          <Field label="Avatar" required>
            <input type="file" name="avatar" accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp" required />
          </Field>
        </AddContentForm>
      </div>
    </div>
  );
}
