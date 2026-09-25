import { NextResponse } from "next/server";
import { addVideoTestimonial, getVideoTestimonialIds, slugify } from "@/lib/content-store";
import { NO_IMAGE_PLACEHOLDER } from "@/lib/upload-limits";
import type { ReviewCategory, VideoTestimonial } from "@/types/review";

export const runtime = "nodejs";

const CATEGORIES: ReviewCategory[] = ["wedding", "engagement", "pre-wedding", "baby", "maternity"];

// Text-only create — the poster/video files are attached afterward from the
// testimonial's own Edit page via the direct-to-Cloudinary flow (a video
// file through this function's own request body would hit the same ~4.5MB
// Vercel cap that caused the original 413 on this exact content type).
export async function POST(request: Request) {
  const formData = await request.formData();
  const title = String(formData.get("title") ?? "").trim();
  const client = String(formData.get("client") ?? "").trim();
  const category = String(formData.get("category") ?? "") as ReviewCategory;
  const duration = String(formData.get("duration") ?? "").trim();
  const quote = String(formData.get("quote") ?? "").trim();

  if (!title || !client || !quote) {
    return NextResponse.json({ error: "Title, client, and quote are required" }, { status: 400 });
  }
  if (!CATEGORIES.includes(category)) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }

  const takenIds = await getVideoTestimonialIds();
  const slug = slugify(title, new Set([...takenIds].map((id) => id.replace(/^vt-/, ""))));
  const id = `vt-${slug}`;

  const testimonial: VideoTestimonial = {
    id,
    title,
    client,
    category,
    poster: NO_IMAGE_PLACEHOLDER,
    duration: duration || "0:00",
    quote,
  };

  await addVideoTestimonial(testimonial);
  return NextResponse.json({ ok: true, id });
}
