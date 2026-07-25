"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { cn, formatDate } from "@/lib/utils";
import { getBlogCategoryLabel } from "@/lib/blog";
import { EASE_OUT_SOFT } from "@/lib/animations";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
  className?: string;
  index?: number;
  priority?: boolean;
}

/**
 * Modern journal card — cover, meta, excerpt, Read More.
 */
export function BlogCard({
  post,
  className,
  index = 0,
  priority = false,
}: BlogCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.05, 0.25),
        ease: EASE_OUT_SOFT,
      }}
      className={cn(
        "card-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-md",
        className,
      )}
    >
      <Link
        href={`/journal/${post.slug}`}
        className="relative aspect-[16/10] overflow-hidden bg-secondary"
      >
        <Image
          src={post.cover.src}
          alt={post.cover.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
      </Link>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="font-medium uppercase tracking-[0.14em] text-primary">
            {getBlogCategoryLabel(post.category)}
          </span>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} min read</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>

        <h3 className="mt-3 font-serif text-xl font-semibold leading-snug text-foreground sm:text-2xl">
          <Link
            href={`/journal/${post.slug}`}
            className="transition-colors hover:text-primary"
          >
            {post.title}
          </Link>
        </h3>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>

        <Link
          href={`/journal/${post.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
        >
          Read More
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.article>
  );
}
