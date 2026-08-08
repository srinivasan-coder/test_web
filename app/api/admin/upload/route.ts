import { NextResponse } from "next/server";
import { getSlot } from "@/lib/admin-sections";
import { saveUploadedImage, UploadValidationError } from "@/lib/admin-upload";
import { setImageOverride } from "@/lib/site-images";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const formData = await request.formData();
  const section = String(formData.get("section") ?? "");
  const slotId = String(formData.get("slotId") ?? "");

  // slot.path comes from our own manifest (lib/admin-sections.ts), never from
  // user input, so this stays confined to public/assets regardless of the
  // requested section/slotId strings.
  const slot = getSlot(section, slotId);
  if (!slot) {
    return NextResponse.json({ error: "Unknown section/slot" }, { status: 400 });
  }

  try {
    // Reuse the slot's fixed path (not a new filename per upload) — the
    // must-revalidate Cache-Control on /assets/* already stops browsers from
    // serving stale bytes, and reusing a path Next's dev server has already
    // served avoids a dev-mode race where a brand-new file can momentarily
    // read back empty through the image optimizer's internal request replay.
    const savedPath = await saveUploadedImage(formData.get("file"), slot.path);
    await setImageOverride(section, slotId, savedPath);

    return NextResponse.json({ ok: true, path: savedPath, updatedAt: Date.now() });
  } catch (err) {
    if (err instanceof UploadValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    throw err;
  }
}
