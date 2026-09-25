import { NextResponse } from "next/server";
import { getVideoTestimonialByIdAsync } from "@/lib/content-store";
import {
  setVideoTestimonialOverride,
  type VideoTestimonialOverride,
} from "@/lib/video-testimonial-overrides";
import type { ReviewCategory } from "@/types/review";

export const runtime = "nodejs";

const CATEGORIES: ReviewCategory[] = ["wedding", "engagement", "pre-wedding", "baby", "maternity"];

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const testimonial = await getVideoTestimonialByIdAsync(id);
  if (!testimonial) {
    return NextResponse.json({ error: "Video testimonial not found" }, { status: 404 });
  }

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

  const patch: VideoTestimonialOverride = {
    title,
    client,
    category,
    duration: duration || "0:00",
    quote,
  };

  await setVideoTestimonialOverride(id, patch);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const testimonial = await getVideoTestimonialByIdAsync(id);
  if (!testimonial) {
    return NextResponse.json({ error: "Video testimonial not found" }, { status: 404 });
  }

  await setVideoTestimonialOverride(id, { hidden: true });
  return NextResponse.json({ ok: true });
}
