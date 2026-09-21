import { NextResponse } from "next/server";
import { getGalleryByIdAsync } from "@/lib/content-store";
import { setGalleryOverride } from "@/lib/gallery-overrides";

export const runtime = "nodejs";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string; index: string }> },
) {
  const { id, index } = await params;

  const gallery = await getGalleryByIdAsync(id);
  if (!gallery) {
    return NextResponse.json({ error: "Gallery not found" }, { status: 404 });
  }

  const i = Number(index);
  if (!Number.isInteger(i) || i < 0 || i >= gallery.images.length) {
    return NextResponse.json({ error: "Invalid photo" }, { status: 400 });
  }

  const images = gallery.images.filter((_, idx) => idx !== i);
  await setGalleryOverride(id, { images });
  return NextResponse.json({ ok: true });
}
