import { NextResponse } from "next/server";
import { getSlot } from "@/lib/admin-sections";
import { clearImageOverride } from "@/lib/site-images";

export const runtime = "nodejs";

// Reverts a Sections slot back to its shipped default image/video by
// dropping its override — the counterpart to /api/admin/upload's finalize
// step, which sets one.
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ section: string; slotId: string }> },
) {
  const { section, slotId } = await params;

  const slot = getSlot(section, slotId);
  if (!slot) {
    return NextResponse.json({ error: "Unknown section/slot" }, { status: 400 });
  }

  await clearImageOverride(section, slotId);
  return NextResponse.json({ ok: true });
}
