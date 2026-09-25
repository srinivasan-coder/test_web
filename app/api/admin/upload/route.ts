import { NextResponse } from "next/server";
import { getSlot } from "@/lib/admin-sections";
import {
  getGalleryByIdAsync,
  getInstagramPostByIdAsync,
  getVideoTestimonialByIdAsync,
} from "@/lib/content-store";
import { enforceUploadedSize, UploadValidationError } from "@/lib/admin-upload";
import { setImageOverride } from "@/lib/site-images";
import { setGalleryOverride } from "@/lib/gallery-overrides";
import { setInstagramOverride } from "@/lib/instagram-overrides";
import { setVideoTestimonialOverride } from "@/lib/video-testimonial-overrides";

export const runtime = "nodejs";

// The file itself is uploaded straight from the browser to Cloudinary (see
// /api/admin/upload/sign or /api/admin/upload/gallery-sign) so it never has
// to pass through this function's request body — Vercel caps that at
// ~4.5MB, well under our 20MB limit. This route records the resulting
// Cloudinary URL, after independently verifying with Cloudinary that the
// upload didn't exceed our size cap (the signed upload can't enforce that
// itself — see enforceUploadedSize).
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const url = String(body?.url ?? "");
  const publicId = String(body?.publicId ?? "");
  const galleryId = body?.galleryId ? String(body.galleryId) : undefined;
  const instagramId = body?.instagramId ? String(body.instagramId) : undefined;
  const videoTestimonialId = body?.videoTestimonialId ? String(body.videoTestimonialId) : undefined;

  const expectedPrefix = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/`;
  if (!url.startsWith(expectedPrefix)) {
    return NextResponse.json({ error: "Invalid upload URL" }, { status: 400 });
  }

  if (videoTestimonialId) {
    const field = String(body?.field ?? "");
    const testimonial = await getVideoTestimonialByIdAsync(videoTestimonialId);
    if (!testimonial) {
      return NextResponse.json({ error: "Video testimonial not found" }, { status: 404 });
    }
    if (field !== "poster" && field !== "video") {
      return NextResponse.json({ error: "Invalid field" }, { status: 400 });
    }

    try {
      await enforceUploadedSize(publicId, field === "video" ? "video" : "image");
    } catch (err) {
      if (err instanceof UploadValidationError) {
        return NextResponse.json({ error: err.message }, { status: 400 });
      }
      throw err;
    }

    await setVideoTestimonialOverride(
      videoTestimonialId,
      field === "poster" ? { poster: url } : { videoUrl: url },
    );
    return NextResponse.json({ ok: true, path: url, updatedAt: Date.now() });
  }

  if (instagramId) {
    const post = await getInstagramPostByIdAsync(instagramId);
    if (!post) {
      return NextResponse.json({ error: "Instagram tile not found" }, { status: 404 });
    }

    try {
      await enforceUploadedSize(publicId, "image");
    } catch (err) {
      if (err instanceof UploadValidationError) {
        return NextResponse.json({ error: err.message }, { status: 400 });
      }
      throw err;
    }

    await setInstagramOverride(instagramId, { image: { ...post.image, src: url } });
    return NextResponse.json({ ok: true, path: url, updatedAt: Date.now() });
  }

  if (galleryId) {
    const field = String(body?.field ?? "");
    const gallery = await getGalleryByIdAsync(galleryId);
    if (!gallery) {
      return NextResponse.json({ error: "Gallery not found" }, { status: 404 });
    }

    try {
      await enforceUploadedSize(publicId, "image");
    } catch (err) {
      if (err instanceof UploadValidationError) {
        return NextResponse.json({ error: err.message }, { status: 400 });
      }
      throw err;
    }

    if (field === "cover") {
      await setGalleryOverride(galleryId, { cover: { ...gallery.cover, src: url } });
    } else {
      const match = /^photo-(\d+)$/.exec(field);
      const index = match ? Number(match[1]) : -1;
      if (index < 0 || index >= gallery.images.length) {
        return NextResponse.json({ error: "Invalid field" }, { status: 400 });
      }
      const images = gallery.images.map((img, i) => (i === index ? { ...img, src: url } : img));
      await setGalleryOverride(galleryId, { images });
    }

    return NextResponse.json({ ok: true, path: url, updatedAt: Date.now() });
  }

  const section = String(body?.section ?? "");
  const slotId = String(body?.slotId ?? "");

  // slot.path comes from our own manifest (lib/admin-sections.ts), never from
  // user input, so this stays confined to the intended upload target.
  const slot = getSlot(section, slotId);
  if (!slot) {
    return NextResponse.json({ error: "Unknown section/slot" }, { status: 400 });
  }

  try {
    await enforceUploadedSize(publicId, slot.kind === "video" ? "video" : "image");
  } catch (err) {
    if (err instanceof UploadValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    throw err;
  }

  await setImageOverride(section, slotId, url);
  return NextResponse.json({ ok: true, path: url, updatedAt: Date.now() });
}
