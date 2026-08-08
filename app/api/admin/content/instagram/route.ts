import { NextResponse } from "next/server";
import { addInstagramPost, getInstagramIds, slugify } from "@/lib/content-store";
import { saveUploadedImage, UploadValidationError } from "@/lib/admin-upload";
import type { InstagramPost } from "@/types/instagram";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const formData = await request.formData();
  const alt = String(formData.get("alt") ?? "").trim();
  const href = String(formData.get("href") ?? "").trim();

  if (!alt) {
    return NextResponse.json({ error: "Alt text is required" }, { status: 400 });
  }

  const takenIds = await getInstagramIds();
  const slug = slugify(alt, new Set([...takenIds].map((id) => id.replace(/^ig-/, ""))));
  const id = `ig-${slug}`;

  try {
    const src = await saveUploadedImage(formData.get("image"), `instagram/${slug}.jpg`);

    const post: InstagramPost = {
      id,
      href: href || "https://instagram.com",
      image: { src, alt, width: 900, height: 900 },
    };

    await addInstagramPost(post);
    return NextResponse.json({ ok: true, id });
  } catch (err) {
    if (err instanceof UploadValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    throw err;
  }
}
