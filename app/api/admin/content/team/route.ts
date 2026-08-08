import { NextResponse } from "next/server";
import { addTeamMember, getTeamSlugs, slugify } from "@/lib/content-store";
import { saveUploadedImage, UploadValidationError } from "@/lib/admin-upload";
import type { TeamMember } from "@/types/team";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = String(formData.get("name") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();

  if (!name || !role || !bio) {
    return NextResponse.json({ error: "Name, role, and bio are required" }, { status: 400 });
  }

  const takenSlugs = await getTeamSlugs();
  const slug = slugify(name, takenSlugs);

  try {
    const avatar = await saveUploadedImage(formData.get("avatar"), `team/${slug}.jpg`);
    const specialties = String(formData.get("specialties") ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const member: TeamMember = {
      id: `t-${slug}`,
      slug,
      name,
      role,
      bio,
      avatar,
      specialties: specialties.length ? specialties : undefined,
      featured: formData.get("featured") === "on",
    };

    await addTeamMember(member);
    return NextResponse.json({ ok: true, slug });
  } catch (err) {
    if (err instanceof UploadValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    throw err;
  }
}
