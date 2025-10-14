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
import type { Locale } from "~/i18n";

export const meta = createMetaFunction(seoData.blog);

export async function loader({ request }: Route.LoaderArgs) {
  const [{ blogs, meta }, { categories }] = await Promise.all([
    fetchBlogData(request),
    fetchCategoriesData(request),
  ]);

  return { blogs, categories, meta };
}

export default function Blog() {
  const { blogs, categories } = useLoaderData<typeof loader>();

  if (!blogs || blogs.length === 0) {
    return (
      <main>
        <BlogNavigation categories={categories} />
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
      <BlogNavigation categories={categories} />
      <BlogHero
        featuredBlog={featuredBlog}
        relatedBlogs={relatedBlogs}
      />
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
