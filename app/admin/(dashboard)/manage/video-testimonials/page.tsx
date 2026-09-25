import Link from "next/link";
import Image from "next/image";
import { getAllVideoTestimonials } from "@/lib/content-store";
import { DeleteVideoTestimonialButton } from "@/components/admin/delete-video-testimonial-button";

// Overrides/added testimonials live in Firestore — read fresh every visit.
export const dynamic = "force-dynamic";

export default async function ManageVideoTestimonialsPage() {
  const testimonials = await getAllVideoTestimonials();

  return (
    <div>
      <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground">
        ← All sections
      </Link>
      <h1 className="mt-2 text-2xl font-semibold text-foreground">Manage video testimonials</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Edit a testimonial&apos;s details, poster, and video, or remove it from the Reviews page.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="overflow-hidden rounded-2xl border border-border bg-background"
          >
            <div className="relative aspect-[4/3] bg-secondary">
              <Image
                src={testimonial.poster}
                alt={testimonial.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
                unoptimized
              />
              <DeleteVideoTestimonialButton id={testimonial.id} title={testimonial.title} />
            </div>
            <div className="p-4">
              <p className="text-sm font-medium text-foreground">{testimonial.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {testimonial.client} · {testimonial.videoUrl ? testimonial.duration : "No video yet"}
              </p>
              <Link
                href={`/admin/manage/video-testimonials/${testimonial.id}/edit`}
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
