import { NextResponse } from "next/server";
import { getInstagramPostByIdAsync } from "@/lib/content-store";
import { setInstagramOverride, type InstagramOverride } from "@/lib/instagram-overrides";

export const runtime = "nodejs";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const post = await getInstagramPostByIdAsync(id);
  if (!post) {
    return NextResponse.json({ error: "Instagram tile not found" }, { status: 404 });
  }

  const formData = await request.formData();
  const alt = String(formData.get("alt") ?? "").trim();
  const href = String(formData.get("href") ?? "").trim();

  if (!alt) {
    return NextResponse.json({ error: "Alt text is required" }, { status: 400 });
  }

  const patch: InstagramOverride = {
    href: href || "https://instagram.com",
    image: { ...post.image, alt },
  };

  await setInstagramOverride(id, patch);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const post = await getInstagramPostByIdAsync(id);
  if (!post) {
    return NextResponse.json({ error: "Instagram tile not found" }, { status: 404 });
  }

  await setInstagramOverride(id, { hidden: true });
  return NextResponse.json({ ok: true });
}
