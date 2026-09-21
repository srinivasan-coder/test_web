import { NextResponse } from "next/server";
import { getSlot } from "@/lib/admin-sections";
import { setImageOverride } from "@/lib/site-images";
import { NO_IMAGE_PLACEHOLDER } from "@/lib/upload-limits";

export const runtime = "nodejs";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ section: string; slotId: string }> },
) {
  const { section, slotId } = await params;

  const slot = getSlot(section, slotId);
  if (!slot) {
    return NextResponse.json({ error: "Unknown section/slot" }, { status: 400 });
  }

  // Video has an existing, already-safe empty state ("No video uploaded
  // yet"); images don't, hence the placeholder graphic for those instead.
  await setImageOverride(section, slotId, slot.kind === "video" ? "" : NO_IMAGE_PLACEHOLDER);
  return NextResponse.json({ ok: true });
}
