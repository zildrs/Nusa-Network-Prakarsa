import { Link, useLoaderData, type MetaFunction } from "react-router";
import type { Route } from "./+types/blog-detail";
import CTASection from "~/components/cta";
import { solutionsMenu } from "~/components/header";
import { BlogCard, BlogNavigation } from "~/components/blog";
import {
  fetchCategoriesData,
  fetchBlogBySlug,
  fetchBlogData,
} from "~/lib/api.server";
import { formatBlogDate, getBlogSlug } from "~/utils/blog";
import BlogContent from "~/components/blog/blog-content";
import { API_BASE_URL, nameToSlug, slugToName } from "~/lib/utils";
import NotFoundPage from "./404";
import type { Locale } from "~/i18n";

function ensureSlug(params: Route.LoaderArgs["params"]) {
  const slug = params?.slug;
  if (!slug) {
    throw new Response("Not Found", { status: 404 });
  }
  return slug;
}

export async function loader({
  request,
  params,
}: Route.LoaderArgs & { params: { slug: string } }) {
  const slug = ensureSlug(params);

  const [blog, { categories, locale }] = await Promise.all([
    fetchBlogBySlug(request, slug),
    fetchCategoriesData(request),
  ]);
  const categoryName = slugToName(blog?.category?.name || "");

  const { blogs: relatedBlogs } = await fetchBlogData(request, categoryName);

  return { blog, categories, relatedBlogs, locale };
}

export const meta: MetaFunction<typeof loader> = (args) => {
  const { data } = args as { data: Awaited<ReturnType<typeof loader>> };
  const { blog } = data;
  if (!blog) return [{ title: "Not found" }];

  return [
    { title: `${blog.title} | Nusa Network` },
    { name: "description", content: blog.summary },
    { property: "og:title", content: `${blog.title} | Nusa Network` },
    { property: "og:description", content: blog.summary },
    { property: "og:image", content: blog.banner[0].url },
  ];
};

export default function BlogDetail() {
  const { categories, blog, relatedBlogs, locale } =
    useLoaderData<typeof loader>();

  if (!blog) return <NotFoundPage />;
  return (
    <main>
      <BlogNavigation categories={categories} />

      <div className="min-h-screen bg-white font-sans">
        <section className="bg-primary text-white py-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
            <div className="flex flex-col justify-between h-full pb-4 lg:px-4">
              <div>
                <p className="text-base mb-2 opacity-80">
                  {blog?.category?.name}
                </p>
                <h1 className="text-3xl mb-16 md:text-4xl font-bold leading-snug max-w-xl line-clamp-3">
                  {blog?.title}
                </h1>
              </div>
              <div className="flex justify-between items-center gap-6 text-sm opacity-90">
                <span>{blog?.author?.name}</span>
                <span>{formatBlogDate(blog?.publishedAt)}</span>
              </div>
            </div>

            <div className="flex justify-end">
              <img
                src={`${API_BASE_URL}/${blog?.banner[0].url}`}
                alt={blog?.title}
                className="rounded-xl w-full aspect-[5/3] lg:aspect-[6/3] object-cover "
              />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 py-12 max-w-7xl mx-auto px-4 lg:px-6">
          <div className="lg:col-span-2 space-y-10">
            <BlogContent content={blog?.content} />
          </div>

          <aside className="space-y-10">
            <div>
              <p className="uppercase tracking-wide mb-4 z-20">
                More <span className="font-semibold">Like This</span>
              </p>
              <div className="flex flex-col gap-4 justify-between">
                {relatedBlogs
                  .filter((b) => b.id !== blog?.id)
                  .slice(0, 3)
                  .map((blog, i) => (
                    <BlogCard
                      key={blog.id}
                      blog={blog}
                      variant="compact"
                      locale={locale}
                    />
                  ))}
              </div>
            </div>

            <div className="">
              <p className="uppercase tracking-wide mb-4 z-20">
                Our <span className="font-semibold">Solutions</span>
              </p>
              <div className="pl-6 border border-gray-200 rounded-lg p-4">
                {solutionsMenu.map((item) => (
                  <Link
                    key={item.title}
                    to={`/solution/${item.slug}`}
                    className="py-3 flex items-center gap-4"
                  >
                    <item.icon className="mr-2" size={20} />
                    <div className="block">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </div>
      <CTASection />
    </main>
  );
}
