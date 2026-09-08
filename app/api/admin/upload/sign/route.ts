import { NextResponse } from "next/server";
import { getSlot } from "@/lib/admin-sections";
import { createUploadSignature, UploadValidationError } from "@/lib/admin-upload";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const section = String(body?.section ?? "");
  const slotId = String(body?.slotId ?? "");
  const mimeType = String(body?.mimeType ?? "");

  // slot.path comes from our own manifest (lib/admin-sections.ts), never from
  // user input, so this stays confined to the intended upload target.
  const slot = getSlot(section, slotId);
  if (!slot) {
    return NextResponse.json({ error: "Unknown section/slot" }, { status: 400 });
  }

  try {
    const signed = createUploadSignature(slot.path, slot.kind === "video" ? "video" : "image", mimeType);
    return NextResponse.json(signed);
  } catch (err) {
    if (err instanceof UploadValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    throw err;
  }
}
