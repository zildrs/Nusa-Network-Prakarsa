import { getRequestLocale } from "~/lib/locale-utils.server";
import { createApiRequest } from "~/lib/request.server";
import type { DataResponseType } from "~/types";
import type { BackendBlogResponse, BlogData, BlogPost } from "~/types/blog";
import type { CategoriesReponseType, CategoryType } from "~/types/category";
// import type {
//   BackendSolutionsResponse,
//   SolutionsData,
//   Solution,
// } from "~/types/solutions";

const API_BASE = "https://dash.nusanetwork.com/api/";

/**
 * Fetch Blog data
 */
export async function fetchBlogData(
  request: Request,
  categoryName: string = ""
): Promise<BlogData> {
  const locale = getRequestLocale(request);
  const url = new URL(request.url);

  const page = Number(url.searchParams.get("page") || 1);
  const pageSize = Number(
    url.searchParams.get("pageSize") || categoryName ? 6 : 25
  );

  const query: Record<string, any> = {
    locale,
    populate: "*",
    "pagination[page]": page,
    "pagination[pageSize]": pageSize,
  };

  // ✅ Filter by category name (Strapi filter)
  if (categoryName) {
    query["filters[category][name][$eq]"] = categoryName;
  }

  const json = await createApiRequest<BackendBlogResponse>(API_BASE, "blogs", {
    query,
    serviceName: "blog",
  });

  const blogs: BlogPost[] = Array.isArray(json?.data) ? json!.data : [];
  return {
    blogs,
    locale,
    meta: json?.meta ?? {
      pagination: {
        page,
        pageSize,
        pageCount: 1,
        total: blogs.length,
      },
    },
  };
}

/**
 * Fetch Solutions data
 */
export async function fetchSolutionsData(request: Request): Promise<any> {
  const locale = getRequestLocale(request);

  const json = await createApiRequest<any>(API_BASE, "solutions", {
    query: { locale },
    serviceName: "solutions",
  });

  const solutions: any[] = Array.isArray(json?.data) ? json!.data : [];
  return { solutions, locale, meta: json?.meta };
}

/**
 * Fetch categories data
 */
export async function fetchCategoriesData(
  request: Request
): Promise<CategoriesReponseType> {
  const locale = getRequestLocale(request);

  const json = await createApiRequest<DataResponseType<CategoryType[]>>(
    API_BASE,
    "categories",
    {
      query: { locale },
      serviceName: "categories",
    }
  );

  const categories: CategoryType[] = Array.isArray(json?.data)
    ? json!.data
    : [];
  return { categories, locale, meta: json?.meta };
}

/**
 * Fetch projects data
 */
export async function fetchProjectsData(request: Request): Promise<any> {
  const locale = getRequestLocale(request);

  const json = await createApiRequest<any>(API_BASE, "projects", {
    query: { locale },
    serviceName: "projects",
  });

  const projects: any[] = Array.isArray(json?.data) ? json!.data : [];
  return { projects, locale, meta: json?.meta };
}

export async function fetchBlogBySlug(
  request: Request,
  slug: string
): Promise<BlogPost | null> {
  const locale = getRequestLocale(request);

  const json = await createApiRequest<BackendBlogResponse>(API_BASE, "blogs", {
    query: {
      locale,
      "filters[slug][$eq]": slug, // ✅ sesuai format Strapi
      populate: "*", // opsional, kalau mau ambil relasi
    },
    serviceName: "blog",
  });

  const blog: BlogPost | null = json?.data?.length ? json.data[0] : null;
  return blog;
}
