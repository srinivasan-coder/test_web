import Link from "next/link";
import { AddContentForm, Field } from "@/components/admin/add-content-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

export default function AddVideoTestimonialPage() {
  return (
    <div>
      <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground">
        ← All sections
      </Link>
      <h1 className="mt-2 text-2xl font-semibold text-foreground">Add a video testimonial</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Creates the testimonial with its details. Add the poster photo and video file next, from
        Manage video testimonials.
      </p>

      <div className="mt-8 max-w-xl">
        <AddContentForm
          endpoint="/api/admin/content/video-testimonials"
          successMessage="Added — now add its poster and video from Manage video testimonials."
        >
          <Field label="Title" required hint="e.g. Ella & James — Wedding Film">
            <Input name="title" required />
          </Field>
          <Field label="Client" required>
            <Input name="client" required />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Category" required>
              <Select name="category" required defaultValue="">
                <option value="" disabled>
                  Choose…
                </option>
                <option value="wedding">Wedding</option>
                <option value="pre-wedding">Pre Wedding</option>
                <option value="engagement">Engagement</option>
                <option value="baby">Baby</option>
                <option value="maternity">Babyshower / Maternity</option>
              </Select>
            </Field>
            <Field label="Duration" hint="e.g. 2:14 — can add later">
              <Input name="duration" placeholder="0:00" />
            </Field>
          </div>
          <Field label="Quote" required>
            <Textarea name="quote" required />
          </Field>
        </AddContentForm>
      </div>
    </div>
  );
}
