import { NextResponse } from "next/server";
import { addGallery, getGallerySlugs, slugify } from "@/lib/content-store";
import { saveUploadedImage, parseTags, todayISO, UploadValidationError } from "@/lib/admin-upload";
import type { Gallery, GalleryCategory, GalleryOrientation } from "@/types/gallery";

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
const DIMENSIONS: Record<GalleryOrientation, [number, number]> = {
  portrait: [1200, 1500],
  landscape: [1600, 1067],
  square: [1200, 1200],
};

export async function POST(request: Request) {
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

  const takenSlugs = await getGallerySlugs();
  const slug = slugify(title, takenSlugs);
  const [width, height] = DIMENSIONS[orientation];

  try {
    const coverPath = await saveUploadedImage(formData.get("cover"), `gallery/${slug}/cover.jpg`);
    const coverAlt = String(formData.get("coverAlt") ?? title);

    const extraPhotos = formData.getAll("photos").filter((f) => f instanceof File && f.size > 0);
    const images = [{ src: coverPath, alt: coverAlt, width, height }];
    for (let i = 0; i < extraPhotos.length; i++) {
      const photoPath = await saveUploadedImage(extraPhotos[i], `gallery/${slug}/${i + 2}.jpg`);
      images.push({ src: photoPath, alt: title, width, height });
    }

    const gallery: Gallery = {
      id: `g-${slug}`,
      slug,
      title,
      description,
      category,
      orientation,
      cover: { src: coverPath, alt: coverAlt, width, height },
      images,
      location: String(formData.get("location") ?? "").trim() || undefined,
      client: String(formData.get("client") ?? "").trim() || undefined,
      date: String(formData.get("date") ?? "").trim() || todayISO(),
      featured: formData.get("featured") === "on",
      tags: parseTags(formData.get("tags")),
    };

    await addGallery(gallery);
    return NextResponse.json({ ok: true, slug });
  } catch (err) {
    if (err instanceof UploadValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    throw err;
  }
}
