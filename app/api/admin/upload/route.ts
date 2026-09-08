import { NextResponse } from "next/server";
import { getSlot } from "@/lib/admin-sections";
import { enforceUploadedSize, UploadValidationError } from "@/lib/admin-upload";
import { setImageOverride } from "@/lib/site-images";

export const runtime = "nodejs";

// The file itself is uploaded straight from the browser to Cloudinary (see
// /api/admin/upload/sign) so it never has to pass through this function's
// request body — Vercel caps that at ~4.5MB, well under our 20MB limit.
// This route records the resulting Cloudinary URL against the slot, after
// independently verifying with Cloudinary that the upload didn't exceed our
// size cap (the signed upload can't enforce that itself — see enforceUploadedSize).
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const section = String(body?.section ?? "");
  const slotId = String(body?.slotId ?? "");
  const url = String(body?.url ?? "");
  const publicId = String(body?.publicId ?? "");

  // slot.path comes from our own manifest (lib/admin-sections.ts), never from
  // user input, so this stays confined to the intended upload target.
  const slot = getSlot(section, slotId);
  if (!slot) {
    return NextResponse.json({ error: "Unknown section/slot" }, { status: 400 });
  }

  const expectedPrefix = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/`;
  if (!url.startsWith(expectedPrefix)) {
    return NextResponse.json({ error: "Invalid upload URL" }, { status: 400 });
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
