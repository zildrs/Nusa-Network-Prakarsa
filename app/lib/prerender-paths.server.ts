import type { Locale } from "../i18n";
import {
  fetchBlogCategories,
  fetchBlogCollection,
  fetchProjectsCollection,
} from "./api.build";
import { nameToSlug } from "./utils";
import { solutions } from "../data/solutions";

const LOCALES: Locale[] = ["en", "id"];

const BLOG_BASE_BY_LOCALE: Record<Locale, string> = {
  en: "/blog",
  id: "/id/blog",
};

export async function buildBlogPaths(): Promise<string[]> {
  const paths = new Set<string>();

  for (const locale of LOCALES) {
    paths.add(BLOG_BASE_BY_LOCALE[locale]);
  }

  const [collections, categoryGroups] = await Promise.all([
    Promise.all(LOCALES.map((locale) => fetchBlogCollection({ locale }))),
    Promise.all(LOCALES.map((locale) => fetchBlogCategories({ locale }))),
  ]);

  collections.forEach(({ locale, blogs }) => {
    const prefix = locale === "en" ? "" : "/id";
    blogs.forEach((blog) => {
      const rawSlug =
        blog?.slug && blog.slug.trim().length > 0
          ? blog.slug
          : String(blog?.id ?? "");
      const slug = nameToSlug(rawSlug);
      if (!slug) return;
      paths.add(`${prefix}/blog/read/${slug}/${blog.documentId}`);
    });
  });

  categoryGroups.forEach(({ locale, categories }) => {
    const prefix = locale === "en" ? "" : "/id";
    categories.forEach((category) => {
      const slug = nameToSlug(category.name);
      if (!slug) return;
      paths.add(`${prefix}/blog/${slug}`);
    });
  });

  return Array.from(paths);
}

export async function buildCaseStudyPaths(): Promise<string[]> {
  const paths = new Set<string>();

  const collections = await Promise.all(
    LOCALES.map((locale) => fetchProjectsCollection({ locale }))
  );

  for (const { locale, projects } of collections) {
    const prefix = locale === "en" ? "" : "/id";
    const base = locale === "en" ? "/case-study" : "/id/studi-kasus";
    paths.add(base);

    projects.forEach((project) => {
      const rawSlug =
        project.slug && project.slug.trim().length > 0
          ? project.slug
          : String(project.id);
      const slug = nameToSlug(rawSlug);
      if (!slug) return;
      paths.add(
        `${prefix}${locale === "en" ? "/case-study" : "/studi-kasus"}/${slug}`
      );
    });
  }

  return Array.from(paths);
}

export function buildSolutionPaths(): string[] {
  const solutionSlugs = Object.keys(solutions);
  const paths: string[] = [];

  for (const slug of solutionSlugs) {
    paths.push(`/solution/${slug}`);
    paths.push(`/id/solusi/${slug}`);
  }

  return paths;
}
