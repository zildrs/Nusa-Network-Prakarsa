import { nameToSlug } from "~/lib/utils";
import type { BlogPost } from "~/types/blog";

export function getBlogSlug(blog: BlogPost, locale?: "id" | "en"): string {
  const rawSlug = blog.slug && blog.slug.trim().length > 0 ? blog.slug : String(blog.id);
  const slugSegment = nameToSlug(rawSlug);
  const baseSlug = `/blog/read/${slugSegment}`;
  return locale === "id" ? `/${locale}${baseSlug}` : baseSlug;
}

export function formatBlogDate(dateString?: string): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}
