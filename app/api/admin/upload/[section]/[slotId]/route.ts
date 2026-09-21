import { NextResponse } from "next/server";
import { getSlot } from "@/lib/admin-sections";
import { setImageOverride } from "@/lib/site-images";

export const runtime = "nodejs";

// A no-photo placeholder — used instead of reverting to the shipped default
// asset, since the admin explicitly wants the photo gone, not swapped for
// another one. Set as a real override (not just cleared) so every page that
// renders this slot always gets a valid, safe src — never empty/undefined,
// which would break required-image components (Hero, Services, Team, ...).
const NO_IMAGE_PLACEHOLDER = "/assets/no-image.svg";

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
