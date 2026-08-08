import { NextResponse } from "next/server";
import { addReview, getReviewIds, slugify } from "@/lib/content-store";
import { saveUploadedImage, todayISO, UploadValidationError } from "@/lib/admin-upload";
import type { Review, ReviewCategory, ReviewSource } from "@/types/review";

export const runtime = "nodejs";

const CATEGORIES: ReviewCategory[] = ["wedding", "corporate", "baby", "birthday"];
const SOURCES: ReviewSource[] = ["google", "studio"];

export async function POST(request: Request) {
  const formData = await request.formData();
  const author = String(formData.get("author") ?? "").trim();
  const quote = String(formData.get("quote") ?? "").trim();
  const category = String(formData.get("category") ?? "") as ReviewCategory;
  const rating = Number(formData.get("rating"));

  if (!author || !quote) {
    return NextResponse.json({ error: "Author and quote are required" }, { status: 400 });
  }
  if (!CATEGORIES.includes(category)) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }
  if (![1, 2, 3, 4, 5].includes(rating)) {
    return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
  }

  const takenIds = await getReviewIds();
  const slug = slugify(author, new Set([...takenIds].map((id) => id.replace(/^r-/, ""))));
  const id = `r-${slug}`;

  try {
    const avatarFile = formData.get("avatar");
    const avatar =
      avatarFile instanceof File && avatarFile.size > 0
        ? await saveUploadedImage(avatarFile, `reviews/avatars/${slug}.jpg`)
        : undefined;

    const coverFile = formData.get("cover");
    const cover =
      coverFile instanceof File && coverFile.size > 0
        ? await saveUploadedImage(coverFile, `reviews/covers/${slug}.jpg`)
        : undefined;

    const source = String(formData.get("source") ?? "studio") as ReviewSource;

    const review: Review = {
      id,
      author,
      role: String(formData.get("role") ?? "").trim() || undefined,
      company: String(formData.get("company") ?? "").trim() || undefined,
      avatar,
      rating: rating as 1 | 2 | 3 | 4 | 5,
      quote,
      date: String(formData.get("date") ?? "").trim() || todayISO(),
      category,
      source: SOURCES.includes(source) ? source : "studio",
      serviceSlug: String(formData.get("serviceSlug") ?? "").trim() || undefined,
      featured: formData.get("featured") === "on",
      story: String(formData.get("story") ?? "").trim() || undefined,
      location: String(formData.get("location") ?? "").trim() || undefined,
      cover,
    };

    await addReview(review);
    return NextResponse.json({ ok: true, id });
  } catch (err) {
    if (err instanceof UploadValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    throw err;
  }
}
