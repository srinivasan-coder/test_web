import { NextResponse } from "next/server";
import { getGalleryByIdAsync } from "@/lib/content-store";
import { setGalleryOverride, type GalleryOverride } from "@/lib/gallery-overrides";
import { parseTags, todayISO } from "@/lib/admin-upload";
import type { GalleryCategory, GalleryOrientation } from "@/types/gallery";

export const runtime = "nodejs";

const CATEGORIES: GalleryCategory[] = [
  "wedding",
  "engagement",
  "pre-wedding",
  "baby",
  "maternity",
  "corporate",
  "fashion",
];
const ORIENTATIONS: GalleryOrientation[] = ["portrait", "landscape", "square"];

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const gallery = await getGalleryByIdAsync(id);
  if (!gallery) {
    return NextResponse.json({ error: "Gallery not found" }, { status: 404 });
  }

  const formData = await request.formData();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const category = String(formData.get("category") ?? "") as GalleryCategory;
  const orientation = String(formData.get("orientation") ?? "") as GalleryOrientation;

  if (!title || !description) {
    return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
  }
  if (!CATEGORIES.includes(category)) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }
  if (!ORIENTATIONS.includes(orientation)) {
    return NextResponse.json({ error: "Invalid orientation" }, { status: 400 });
  }

  const patch: GalleryOverride = {
    title,
    description,
    category,
    orientation,
    location: String(formData.get("location") ?? "").trim() || undefined,
    client: String(formData.get("client") ?? "").trim() || undefined,
    date: String(formData.get("date") ?? "").trim() || todayISO(),
    featured: formData.get("featured") === "on",
    tags: parseTags(formData.get("tags")),
  };

  await setGalleryOverride(id, patch);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const gallery = await getGalleryByIdAsync(id);
  if (!gallery) {
    return NextResponse.json({ error: "Gallery not found" }, { status: 404 });
  }

  await setGalleryOverride(id, { hidden: true });
  return NextResponse.json({ ok: true });
}
