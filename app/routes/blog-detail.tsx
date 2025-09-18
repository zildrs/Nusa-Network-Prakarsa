import { Link, useLoaderData, type MetaFunction } from "react-router";
import type { Route } from "./+types/blog-detail";
import CTASection from "~/components/cta";
import { solutionsMenu } from "~/components/header";
import { BlogNavigation } from "~/components/blog";
import { fetchBlogBySlug, fetchCategoriesData } from "~/lib/api.server";
import { formatBlogDate } from "~/utils/blog";
import BlogContent from "~/components/blog/blog-content";
import { APP_BASE_URL } from "~/lib/utils";
import NotFoundPage from "./404";

export async function loader({
  request,
  params,
}: Route.LoaderArgs & { params: { slug: string; locale?: string } }) {
  // Extract locale from URL params
  const urlLocale = params.locale as "id" | "en" | undefined;

  // If no locale in URL, check localStorage/cookies for user preference
  if (!urlLocale) {
    const slug = params.slug;
    const [blog, { categories, locale }] = await Promise.all([
      fetchBlogBySlug(request, slug),
      fetchCategoriesData(request),
    ]);

    return { blog, categories, locale, urlLocale: locale };
  }

  const slug = params.slug;
  const [blog, { categories, locale }] = await Promise.all([
    fetchBlogBySlug(request, slug),
    fetchCategoriesData(request),
  ]);

  return { blog, categories, locale, urlLocale };
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
  const { categories, blog, urlLocale, locale } =
    useLoaderData<typeof loader>();

  // Use urlLocale for UI/display purposes, fallback to API locale
  const currentLocale = urlLocale || locale;

  if (!blog) return <NotFoundPage />;
  return (
    <main>
      <BlogNavigation categories={categories} locale={currentLocale} />

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
                src={`${APP_BASE_URL}/${blog?.banner[0].url}`}
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
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex h-full items-center gap-4 p-2 rounded-xl border border-gray-200 hover:shadow-sm transition"
                  >
                    <img
                      src="https://placehold.co/100"
                      alt="thumbnail"
                      className="rounded-lg h-full object-cover aspect-square"
                    />
                    <div
                      className="flex flex-col justify-between"
                      style={{ height: "-webkit-fill-available" }}
                    >
                      <p className="text-sm font-medium text-gray-800 line-clamp-3">
                        Transforming Peruri Businesses with SD-WAN Technologymax
                        3 lines
                      </p>
                      <p className="text-xs text-gray-500">Technology</p>
                    </div>
                  </div>
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
                    to={`${currentLocale === "id" ? "/id" : ""}/solutions/${item.title.toLowerCase().replace(/\s+/g, "-")}`}
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
