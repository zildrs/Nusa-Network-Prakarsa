import type { Route } from "./+types/blog";
import CTASection from "~/components/cta";
import { BlogNavigation, BlogEmptyState, BlogCard } from "~/components/blog";
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
import { fetchCategoriesData, fetchBlogData } from "~/lib/api.server";
import type { Locale } from "~/i18n";

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
  console.log(params.category);
  const categoryName = slugToName(params.category);
  const page = Number(new URL(request.url).searchParams.get("page") ?? 1);

  const [{ blogs, meta }, { categories }] = await Promise.all([
    fetchBlogData(request, categoryName),
    fetchCategoriesData(request),
  ]);

  return { blogs, categories, meta, categoryName };
}

export default function BlogCategory() {
  const { blogs, categories, meta, categoryName } =
    useLoaderData<typeof loader>();
  const navigate = useNavigate();

  if (!blogs || blogs.length === 0) {
    return (
      <main>
        <BlogNavigation categories={categories} />
        <BlogEmptyState />
        <CTASection />
      </main>
    );
  }

  return (
    <main>
      <BlogNavigation categories={categories} />
      <section className={`py-10 max-w-7xl mx-auto px-4 lg:px-6`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">
            {categoryName.toUpperCase()}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
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
                      navigate(
                        `/blog/${categoryName.toLowerCase().replace(/\s+/g, "-")}?page=${meta.pagination.page - 1}`
                      );
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
                          navigate(
                            `/blog/${categoryName.toLowerCase().replace(/\s+/g, "-")}?page=${pageNum}`
                          );
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
                      navigate(
                        `/blog/${categoryName.toLowerCase().replace(/\s+/g, "-")}?page=${meta.pagination.page + 1}`
                      );
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
