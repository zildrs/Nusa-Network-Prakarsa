import type { Route } from "./+types/blog";
import { useEffect, useState } from "react";
import type { BlogPost } from "~/types/blog";
import CTASection from "~/components/cta";
import { fetchBlogData } from "~/utils/blog.server";
import { 
  BlogNavigation, 
  BlogHero, 
  BlogSection, 
  BlogEmptyState 
} from "~/components/blog";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Blog - Nusa Network" },
    { name: "description", content: "Latest insights and updates from Nusa Network" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  return await fetchBlogData(request);
}



export default function Blog({ loaderData }: Route.ComponentProps) {
  const { blogs, locale } = loaderData;

  /**
   * Client-side fetch probe
   * Purpose: Verify whether TLS/CORS issues are limited to SSR (Node) or also affect the browser.
   * Behavior: Runs in the browser only; attempts to fetch the same API and shows a small status banner.
   */
  const [clientBlogs, setClientBlogs] = useState<BlogPost[] | null>(null);
  const [clientFetchError, setClientFetchError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const run = async () => {
      try {
        const res = await fetch(`https://dash.nusanetwork.com/api/blogs?locale=${locale}`, {
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Client fetch failed: ${res.status}`);
        const json = (await res.json()) as { data?: BlogPost[] };
        if (!isMounted) return;
        setClientFetchError(null);
        setClientBlogs(Array.isArray(json?.data) ? json.data : []);
      } catch (e) {
        if (!isMounted) return;
        const msg = e instanceof Error ? e.message : String(e);
        setClientBlogs([]);
        setClientFetchError(msg);
      }
    };
    run();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [locale]);
  
  if (!blogs || blogs.length === 0) {
    return (
      <main>
        <BlogNavigation />
        {/* Client fetch status banner for debugging SSR vs client behavior */}
        <div className="mx-auto mb-4 max-w-5xl rounded-md border p-3 text-sm">
          {clientFetchError ? (
            <span className="text-red-600">Client fetch error: {clientFetchError}</span>
          ) : clientBlogs ? (
            <span className="text-green-700">Client fetch ok: {clientBlogs.length} posts</span>
          ) : (
            <span className="opacity-70">Client fetch running…</span>
          )}
        </div>
        <BlogEmptyState />
        <CTASection />
      </main>
    );
  }
  
  const featuredBlog = blogs[0];
  const relatedBlogs = blogs.slice(1, 4);
  const technologyBlogs = blogs.filter(blog => blog.locale === 'en');
  const deviceBlogs = blogs.filter(blog => blog.locale === 'id');

  return (
    <main>
      <BlogNavigation />
      {/* Client fetch status banner for debugging SSR vs client behavior */}
      <div className="mx-auto mb-4 max-w-5xl rounded-md border p-3 text-sm">
        {clientFetchError ? (
          <span className="text-red-600">Client fetch error: {clientFetchError}</span>
        ) : clientBlogs ? (
          <span className="text-green-700">Client fetch ok: {clientBlogs.length} posts</span>
        ) : (
          <span className="opacity-70">Client fetch running…</span>
        )}
      </div>
      <BlogHero 
        featuredBlog={featuredBlog} 
        relatedBlogs={relatedBlogs} 
      />
      <BlogSection 
        title="TECHNOLOGY" 
        blogs={technologyBlogs.length > 0 ? technologyBlogs : relatedBlogs}
      />
      <BlogSection 
        title="DEVICES" 
        blogs={deviceBlogs.length > 0 ? deviceBlogs : relatedBlogs}
      />
      <CTASection />
    </main>
  );
}
