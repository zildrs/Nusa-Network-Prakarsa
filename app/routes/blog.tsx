import type { Route } from "./+types/blog";
import { use, useEffect, useState } from "react";
import type { BlogPost } from "~/types/blog";
import CTASection from "~/components/cta";
import {
  BlogNavigation,
  BlogHero,
  BlogSection,
  BlogEmptyState,
} from "~/components/blog";
import { fetchBlogData, fetchCategoriesData } from "~/lib/api.server";
import { nameToSlug } from "~/lib/utils";
import { createMetaFunction, seoData } from "~/lib/meta";
import { useLoaderData } from "react-router";

export const meta = createMetaFunction(seoData.blog);

export async function loader({ request, params }: Route.LoaderArgs) {
  // Extract locale from URL params (now available from route structure)
  const urlLocale = params.locale as "id" | "en" | undefined;

  // If no locale in URL, check localStorage/cookies for user preference
  if (!urlLocale) {
    const [{ blogs, locale }, { categories }] = await Promise.all([
      fetchBlogData(request),
      fetchCategoriesData(request),
    ]);

    return { blogs, categories, locale, urlLocale: locale };
  }

  const [{ blogs, locale }, { categories }] = await Promise.all([
    fetchBlogData(request),
    fetchCategoriesData(request),
  ]);

  return { blogs, categories, locale, urlLocale };
}

export default function Blog({ loaderData }: Route.ComponentProps) {
  const { blogs, categories, locale, urlLocale } = useLoaderData<typeof loader>();

  // Use urlLocale for UI/display purposes, fallback to API locale
  const currentLocale = urlLocale || locale;
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
        const res = await fetch(
          `https://dash.nusanetwork.com/api/blogs?locale=${currentLocale}`,
          {
            headers: { Accept: "application/json" },
            signal: controller.signal,
          }
        );
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
  }, [currentLocale]);

  if (!blogs || blogs.length === 0) {
    return (
      <main>
        <BlogNavigation categories={categories} locale={currentLocale} />
        {/* Client fetch status banner for debugging SSR vs client behavior */}
        <div className="mx-auto mb-4 max-w-5xl rounded-md border p-3 text-sm">
          {clientFetchError ? (
            <span className="text-red-600">
              Client fetch error: {clientFetchError}
            </span>
          ) : clientBlogs ? (
            <span className="text-green-700">
              Client fetch ok: {clientBlogs.length} posts
            </span>
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

  const categoryList = categories.map((category) => {
    const categoryBlogs = blogs.filter(
      (blog) => blog.category.id === category.id
    );
    return {
      ...category,
      blogs: categoryBlogs.slice(0, 3),
    };
  });

  return (
    <main>
      <BlogNavigation categories={categories} locale={currentLocale} />
      {/* Client fetch status banner for debugging SSR vs client behavior */}
      {/* <div className="mx-auto mb-4 max-w-5xl rounded-md border p-3 text-sm">
        {clientFetchError ? (
          <span className="text-red-600">
            Client fetch error: {clientFetchError}
          </span>
        ) : clientBlogs ? (
          <span className="text-green-700">
            Client fetch ok: {clientBlogs.length} posts
          </span>
        ) : (
          <span className="opacity-70">Client fetch running…</span>
        )}
      </div> */}
      <BlogHero featuredBlog={featuredBlog} relatedBlogs={relatedBlogs} locale={currentLocale} />
      {categoryList.map((category) => (
        <BlogSection
          key={category.id}
          title={category.name.toUpperCase()}
          blogs={category.blogs || []}
          seeAllLink={`${currentLocale === 'id' ? '/id' : ''}/blog/${nameToSlug(category.name)}`}
          locale={currentLocale}
        />
      ))}
      <CTASection />
    </main>
  );
}
