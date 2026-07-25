import Image from "next/image";

import { Container } from "@/components/ui/container";
import { formatDate } from "@/lib/utils";
import { getBlogCategoryLabel } from "@/lib/blog";
import type { BlogPost } from "@/types";

interface ArticleHeaderProps {
  post: BlogPost;
}

/**
 * Article hero — cover, category, title, meta.
 */
export function ArticleHeader({ post }: ArticleHeaderProps) {
  return (
    <header className="border-b border-border bg-secondary/40">
      <Container className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">{getBlogCategoryLabel(post.category)}</span>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{post.author.name}</span>
            {post.author.role ? (
              <>
                <span aria-hidden="true">·</span>
                <span>{post.author.role}</span>
              </>
            ) : null}
            <span aria-hidden="true">·</span>
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime} min read</span>
          </div>
        </div>

        <div className="relative mx-auto mt-12 aspect-[16/9] max-w-5xl overflow-hidden rounded-2xl bg-secondary shadow-md">
          <Image
            src={post.cover.src}
            alt={post.cover.alt}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 64rem"
            className="object-cover"
          />
        </div>
      </Container>
    </header>
  );
}
