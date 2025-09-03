import type { BlogPost } from "~/types/blog";

export function getBlogSlug(blog: BlogPost): string {
  return blog.slug || `/blog/${blog.id}`;
}

export function formatBlogDate(dateString?: string): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString();
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}
