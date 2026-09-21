import { NextResponse } from "next/server";
import { getInstagramPostByIdAsync } from "@/lib/content-store";
import { createUploadSignature, UploadValidationError } from "@/lib/admin-upload";

export const runtime = "nodejs";

// Signs a direct browser-to-Cloudinary upload for one Instagram tile's
// photo — the instagram-edit equivalent of /api/admin/upload/sign, keyed by
// post id instead of the static admin-sections manifest.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const instagramId = String(body?.instagramId ?? "");
  const mimeType = String(body?.mimeType ?? "");

  const post = await getInstagramPostByIdAsync(instagramId);
  if (!post) {
    return NextResponse.json({ error: "Instagram tile not found" }, { status: 404 });
  }

  try {
    const signed = createUploadSignature(`instagram/${post.id}`, "image", mimeType);
    return NextResponse.json(signed);
  } catch (err) {
    if (err instanceof UploadValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    throw err;
  }
}
