import { NextResponse } from "next/server";
import { getVideoTestimonialByIdAsync } from "@/lib/content-store";
import { setVideoTestimonialOverride } from "@/lib/video-testimonial-overrides";

export const runtime = "nodejs";

// videoUrl is genuinely optional on VideoTestimonial (the public page already
// renders a safe "Coming soon" state for it) — unlike a required image slot,
// this can be truly removed instead of needing a placeholder.
export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const testimonial = await getVideoTestimonialByIdAsync(id);
  if (!testimonial) {
    return NextResponse.json({ error: "Video testimonial not found" }, { status: 404 });
  }

  await setVideoTestimonialOverride(id, { videoUrl: undefined });
  return NextResponse.json({ ok: true });
}
