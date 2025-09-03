import { detectLocale } from "~/lib/locale.server";
import type { BackendBlogResponse, BlogData, BlogPost } from "~/types/blog";

const BLOG_API_BASE = "https://dash.nusanetwork.com/api";
const DEFAULT_TIMEOUT_MS = 10000;

export async function fetchBlogData(request: Request): Promise<BlogData> {
  const url = new URL(request.url);
  const qpLocale = url.searchParams.get("locale");
  const locale = qpLocale === "id" || qpLocale === "en" ? qpLocale : detectLocale(request);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const res = await fetch(`${BLOG_API_BASE}/blogs?locale=${locale}`, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) return { blogs: [], locale };
    const json = (await res.json()) as BackendBlogResponse | null;
    const blogs: BlogPost[] = Array.isArray(json?.data) ? json!.data : [];
    return { blogs, locale, meta: json?.meta };
  } catch {
    clearTimeout(timeout);
    return { blogs: [], locale };
  }
}
