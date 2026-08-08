import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Container } from "@/components/ui/container";
import { CTAButton } from "@/components/ui/cta-button";
import { ArticleHeader, MarkdownContent, BlogCard } from "@/components/blog";
import { JsonLd } from "@/components/seo/json-ld";
import { getAllBlogPosts, getAllBlogSlugsAsync, getBlogPostBySlugAsync } from "@/lib/content-store";
import { SITE_CONFIG } from "@/lib/constants";
import { blogPostingJsonLd, buildMetadata } from "@/lib/seo";

// Reads data/db/blog.json at request time — must stay dynamic so newly
// added posts (and related-post lists) reflect current content.
export const dynamic = "force-dynamic";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugsAsync();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlugAsync(slug);
  if (!post) return { title: "Article" };

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/journal/${post.slug}`,
    image: post.cover.src,
    type: "article",
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlugAsync(slug);
  if (!post) notFound();

  const articleUrl = new URL(
    `/journal/${post.slug}`,
    SITE_CONFIG.url,
  ).toString();
  const allPosts = await getAllBlogPosts();
  const related = allPosts
    .filter((item) => item.id !== post.id && item.category === post.category)
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={blogPostingJsonLd({
          title: post.title,
          description: post.excerpt,
          url: articleUrl,
          image: post.cover.src,
          datePublished: post.publishedAt,
          authorName: post.author.name,
        })}
      />

      <ArticleHeader post={post} />

      <article className="section-y pt-12 md:pt-16">
        <Container size="narrow">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to journal
          </Link>

          <div className="mt-10">
            <MarkdownContent content={post.content} />
          </div>

          {post.tags?.length ? (
            <ul
              className="mt-12 flex flex-wrap gap-2 border-t border-border pt-8"
              aria-label="Article tags"
            >
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-12 rounded-2xl border border-border bg-secondary/40 p-8 text-center">
            <p className="font-serif text-2xl font-semibold">
              Ready to create your own story?
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Tell us about your session — we&apos;ll respond within two
              business days.
            </p>
            <div className="mt-6">
              <CTAButton href="/contact" withArrow={false}>
                Book a session
              </CTAButton>
            </div>
          </div>
        </Container>
      </article>

      {related.length > 0 ? (
        <section
          className="section-y border-t border-border bg-secondary/40 pt-16"
          aria-labelledby="related-reading"
        >
          <Container>
            <h2
              id="related-reading"
              className="font-serif text-3xl font-semibold tracking-tight"
            >
              Related reading
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <BlogCard key={item.id} post={item} index={index} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
