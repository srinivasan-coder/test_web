import { NextResponse } from "next/server";
import { addBlogPost, getBlogSlugs, slugify } from "@/lib/content-store";
import { saveUploadedImage, parseTags, todayISO, UploadValidationError } from "@/lib/admin-upload";
import type { BlogCategory, BlogPost } from "@/types/blog";

export const runtime = "nodejs";

const CATEGORIES: BlogCategory[] = [
  "tips",
  "behind-the-scenes",
  "gear",
  "inspiration",
  "news",
];

export async function POST(request: Request) {
  const formData = await request.formData();
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const category = String(formData.get("category") ?? "") as BlogCategory;
  const authorName = String(formData.get("authorName") ?? "").trim();

  if (!title || !excerpt || !content || !authorName) {
    return NextResponse.json(
      { error: "Title, excerpt, content, and author name are required" },
      { status: 400 },
    );
  }
  if (!CATEGORIES.includes(category)) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }

  const takenSlugs = await getBlogSlugs();
  const slug = slugify(title, takenSlugs);

  try {
    const coverPath = await saveUploadedImage(formData.get("cover"), `blog/${slug}.jpg`);

    const authorAvatarFile = formData.get("authorAvatar");
    const authorAvatar =
      authorAvatarFile instanceof File && authorAvatarFile.size > 0
        ? await saveUploadedImage(
            authorAvatarFile,
            `blog/authors/${slugify(authorName, new Set())}.jpg`,
          )
        : undefined;

    const readingTime =
      Number(formData.get("readingTime")) || Math.max(1, Math.round(content.split(/\s+/).length / 200));

    const post: BlogPost = {
      id: `b-${slug}`,
      slug,
      title,
      excerpt,
      content,
      cover: { src: coverPath, alt: title, width: 1600, height: 1067 },
      category,
      author: {
        name: authorName,
        role: String(formData.get("authorRole") ?? "").trim() || undefined,
        avatar: authorAvatar,
      },
      publishedAt: String(formData.get("publishedAt") ?? "").trim() || todayISO(),
      readingTime,
      tags: parseTags(formData.get("tags")),
      featured: formData.get("featured") === "on",
    };

    await addBlogPost(post);
    return NextResponse.json({ ok: true, slug });
  } catch (err) {
    if (err instanceof UploadValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    throw err;
  }
}
