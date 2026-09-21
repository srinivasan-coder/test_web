import { NextResponse } from "next/server";
import { getGalleryByIdAsync } from "@/lib/content-store";
import { createUploadSignature, UploadValidationError } from "@/lib/admin-upload";

export const runtime = "nodejs";

// Signs a direct browser-to-Cloudinary upload for one gallery's cover or an
// existing photo — the gallery-edit equivalent of /api/admin/upload/sign,
// but keyed by gallery id instead of the static admin-sections manifest (so
// it works for added galleries too, not just seed ones).
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const galleryId = String(body?.galleryId ?? "");
  const field = String(body?.field ?? "");
  const mimeType = String(body?.mimeType ?? "");

  const gallery = await getGalleryByIdAsync(galleryId);
  if (!gallery) {
    return NextResponse.json({ error: "Gallery not found" }, { status: 404 });
  }
  if (field !== "cover" && !/^photo-\d+$/.test(field)) {
    return NextResponse.json({ error: "Invalid field" }, { status: 400 });
  }

  try {
    const signed = createUploadSignature(`gallery/${gallery.slug}/${field}`, "image", mimeType);
    return NextResponse.json(signed);
  } catch (err) {
    if (err instanceof UploadValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    throw err;
  }
}
