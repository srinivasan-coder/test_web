"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { formatDate } from "@/lib/utils";
import { getBlogCategoryLabel } from "@/lib/blog";
import { EASE_OUT_SOFT } from "@/lib/animations";
import { CTAButton } from "@/components/ui/cta-button";
import type { BlogPost } from "@/types";

interface FeaturedArticleProps {
  post: BlogPost;
}

/**
 * Large featured journal piece for the blog landing page.
 */
export function FeaturedArticle({ post }: FeaturedArticleProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: EASE_OUT_SOFT }}
      className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-500 hover:shadow-md"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <Link
          href={`/journal/${post.slug}`}
          className="relative min-h-[18rem] overflow-hidden bg-secondary sm:min-h-[22rem] lg:min-h-full"
        >
          <Image
            src={post.cover.src}
            alt={post.cover.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />
        </Link>

        <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
          <span className="eyebrow">Featured</span>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="font-medium uppercase tracking-[0.14em] text-primary">
              {getBlogCategoryLabel(post.category)}
            </span>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime} min read</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          </div>

          <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            <Link
              href={`/journal/${post.slug}`}
              className="transition-colors hover:text-primary"
            >
              {post.title}
            </Link>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {post.excerpt}
          </p>

          <div className="mt-8">
            <CTAButton href={`/journal/${post.slug}`} size="md">
              Read More
            </CTAButton>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
