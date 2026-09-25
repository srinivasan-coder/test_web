import Link from "next/link";
import { notFound } from "next/navigation";
import { getVideoTestimonialByIdAsync } from "@/lib/content-store";
import { EditContentForm } from "@/components/admin/edit-content-form";
import { VideoTestimonialPosterUploader } from "@/components/admin/video-testimonial-poster-uploader";
import { VideoTestimonialVideoUploader } from "@/components/admin/video-testimonial-video-uploader";
import { Field } from "@/components/admin/add-content-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

export const dynamic = "force-dynamic";

export default async function EditVideoTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await getVideoTestimonialByIdAsync(id);
  if (!testimonial) notFound();

  return (
    <div>
      <Link
        href="/admin/manage/video-testimonials"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← Manage video testimonials
      </Link>
      <h1 className="mt-2 text-2xl font-semibold text-foreground">Edit {testimonial.title}</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Changes are saved instantly and reflected on the Reviews page right away.
      </p>

      <div className="mt-8 max-w-xl">
        <EditContentForm endpoint={`/api/admin/content/video-testimonials/${testimonial.id}`}>
          <Field label="Title" required>
            <Input name="title" defaultValue={testimonial.title} required />
          </Field>
          <Field label="Client" required>
            <Input name="client" defaultValue={testimonial.client} required />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Category" required>
              <Select name="category" required defaultValue={testimonial.category}>
                <option value="wedding">Wedding</option>
                <option value="pre-wedding">Pre Wedding</option>
                <option value="engagement">Engagement</option>
                <option value="baby">Baby</option>
                <option value="maternity">Babyshower / Maternity</option>
              </Select>
            </Field>
            <Field label="Duration" hint="e.g. 2:14">
              <Input name="duration" defaultValue={testimonial.duration} />
            </Field>
          </div>
          <Field label="Quote" required>
            <Textarea name="quote" defaultValue={testimonial.quote} required />
          </Field>
        </EditContentForm>
      </div>

      <h2 className="mt-12 text-lg font-semibold text-foreground">Poster &amp; video</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Each uploads and saves on its own.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <VideoTestimonialPosterUploader
          videoTestimonialId={testimonial.id}
          initialSrc={testimonial.poster}
        />
        <VideoTestimonialVideoUploader
          videoTestimonialId={testimonial.id}
          initialSrc={testimonial.videoUrl}
        />
      </div>
    </div>
  );
}
