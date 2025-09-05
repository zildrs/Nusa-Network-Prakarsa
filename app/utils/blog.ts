import { nameToSlug } from "~/lib/utils";
import type { BlogPost } from "~/types/blog";

export function getBlogSlug(blog: BlogPost): string {
  return `/blog/read/${nameToSlug(blog.slug || "")}` || `/blog/read/${blog.id}`;
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
