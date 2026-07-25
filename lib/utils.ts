import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge conditional class names while resolving Tailwind conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a Date (or ISO string) into a readable, localized label.
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
): string {
  const value = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", options).format(value);
}

/**
 * Create a URL-friendly slug from arbitrary text.
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Truncate text to a maximum length, appending an ellipsis when clipped.
 */
export function truncate(input: string, max = 160): string {
  if (input.length <= max) return input;
  return `${input.slice(0, max).trimEnd()}…`;
}

/**
 * Estimate reading time (in minutes) for a block of text.
 */
export function readingTime(content: string, wordsPerMinute = 200): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}
