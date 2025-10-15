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
import { fetchCategoriesData, fetchBlogData } from "~/lib/api.server";

export const meta = createMetaFunction(seoData.blog);

export async function loader({ request }: Route.LoaderArgs) {
  const [{ blogs, meta, locale }, { categories }] = await Promise.all([
    fetchBlogData(request),
    fetchCategoriesData(request),
  ]);

  return { blogs, categories, meta, locale };
}

export default function Blog() {
  const { blogs, categories, locale } = useLoaderData<typeof loader>();

  if (!blogs || blogs.length === 0) {
    return (
      <main>
        <BlogNavigation categories={categories} locale={locale} />
        <BlogEmptyState />
        <CTASection />
      </main>
    );
  }

  const featuredBlog = blogs[0];
  const relatedBlogs = blogs.slice(1, 4);
  console.log(categories);

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
      <BlogNavigation categories={categories} locale={locale} />
      <BlogHero featuredBlog={featuredBlog} relatedBlogs={relatedBlogs} />
      {categoryList.map((category) => (
        <BlogSection
          key={category.id}
          title={category.name.toUpperCase()}
          blogs={category.blogs || []}
          seeAllLink={`/blog/${nameToSlug(category.name)}`}
        />
      ))}
      <CTASection />
    </main>
  );
}
