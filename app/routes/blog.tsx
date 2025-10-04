import type { Route } from "./+types/blog";
import CTASection from "~/components/cta";
import {
  BlogNavigation,
  BlogHero,
  BlogSection,
  BlogEmptyState,
} from "~/components/blog";
import { useLoaderData } from "react-router";
import { createMetaFunction, seoData } from "~/lib/meta";
import { nameToSlug } from "~/lib/utils";
import { fetchBlogCategories, fetchBlogCollection } from "~/lib/api.build";
import { inferLocaleFromUrl } from "~/lib/locale-utils";
import type { Locale } from "~/i18n";

export const meta = createMetaFunction(seoData.blog);

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const locale = inferLocaleFromUrl(url);

  const [{ blogs, meta }, { categories }] = await Promise.all([
    fetchBlogCollection({ locale }),
    fetchBlogCategories({ locale }),
  ]);

  return { blogs, categories, locale, meta };
}

export default function Blog() {
  const { blogs, categories, locale } = useLoaderData<typeof loader>();
  const currentLocale = locale as Locale;

  if (!blogs || blogs.length === 0) {
    return (
      <main>
        <BlogNavigation categories={categories} locale={currentLocale} />
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
      <BlogHero
        featuredBlog={featuredBlog}
        relatedBlogs={relatedBlogs}
        locale={currentLocale}
      />
      {categoryList.map((category) => (
        <BlogSection
          key={category.id}
          title={category.name.toUpperCase()}
          blogs={category.blogs || []}
          seeAllLink={`${currentLocale === "id" ? "/id" : ""}/blog/${nameToSlug(category.name)}`}
          locale={currentLocale}
        />
      ))}
      <CTASection />
    </main>
  );
}
