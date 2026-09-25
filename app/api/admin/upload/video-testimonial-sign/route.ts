import { NextResponse } from "next/server";
import { getVideoTestimonialByIdAsync } from "@/lib/content-store";
import { createUploadSignature, UploadValidationError } from "@/lib/admin-upload";

export const runtime = "nodejs";

// Signs a direct browser-to-Cloudinary upload for one video testimonial's
// poster image or video file — same pattern as /api/admin/upload/gallery-sign,
// keyed by testimonial id instead of the static admin-sections manifest.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const videoTestimonialId = String(body?.videoTestimonialId ?? "");
  const field = String(body?.field ?? "");
  const mimeType = String(body?.mimeType ?? "");

  const testimonial = await getVideoTestimonialByIdAsync(videoTestimonialId);
  if (!testimonial) {
    return NextResponse.json({ error: "Video testimonial not found" }, { status: 404 });
  }
  if (field !== "poster" && field !== "video") {
    return NextResponse.json({ error: "Invalid field" }, { status: 400 });
  }

  try {
    const signed = createUploadSignature(
      `video-testimonials/${testimonial.id}-${field}`,
      field === "video" ? "video" : "image",
      mimeType,
    );
    return NextResponse.json(signed);
  } catch (err) {
    if (err instanceof UploadValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    throw err;
  }
}
