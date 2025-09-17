import type { Route } from "./+types/blog";
import { useEffect, useState } from "react";
import type { BlogPost } from "~/types/blog";
import CTASection from "~/components/cta";
import { BlogNavigation, BlogEmptyState, BlogCard } from "~/components/blog";
import { fetchBlogData, fetchCategoriesData } from "~/lib/api.server";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { useLoaderData, useNavigate } from "react-router";
import { slugToName } from "~/lib/utils";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Blog - Nusa Network" },
    {
      name: "description",
      content: "Latest insights and updates from Nusa Network",
    },
  ];
}

export async function loader({
  request,
  params,
}: Route.LoaderArgs & { params: { category: string } }) {
  const categoryName = slugToName(params.category);
  const [{ blogs, locale, meta }, { categories }] = await Promise.all([
    fetchBlogData(request, categoryName),
    fetchCategoriesData(request),
  ]);

  return { blogs, categories, locale, meta, categoryName };
}

export default function BlogCategory() {
  const { blogs, categories, locale, meta, categoryName } =
    useLoaderData<typeof loader>();
  const navigate = useNavigate();

  // Use locale from API for UI/display purposes
  const currentLocale = locale as "id" | "en";
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

  return (
    <main>
      <BlogNavigation categories={categories} locale={currentLocale} />
      <section className={`py-10 max-w-7xl mx-auto px-4 lg:px-6`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">
            {categoryName.toUpperCase()}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} locale={currentLocale} />
          ))}
        </div>

        {meta && meta.pagination && meta.pagination.pageCount > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={`?page=${meta.pagination.page - 1}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (meta.pagination.page > 1)
                      navigate(`${currentLocale === 'id' ? '/id' : ''}/blog/${categoryName.toLowerCase().replace(/\s+/g, '-')}?page=${meta.pagination.page - 1}`);
                  }}
                />
              </PaginationItem>

              {Array.from({ length: meta.pagination.pageCount }).map(
                (_, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        href={`?page=${pageNum}`}
                        isActive={pageNum === meta.pagination.page}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`${currentLocale === 'id' ? '/id' : ''}/blog/${categoryName.toLowerCase().replace(/\s+/g, '-')}?page=${pageNum}`);
                        }}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
              )}

              <PaginationItem>
                <PaginationNext
                  href={`?page=${meta.pagination.page + 1}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (meta.pagination.page < meta.pagination.pageCount)
                      navigate(`${currentLocale === 'id' ? '/id' : ''}/blog/${categoryName.toLowerCase().replace(/\s+/g, '-')}?page=${meta.pagination.page + 1}`);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </section>
      <CTASection />
    </main>
  );
}
