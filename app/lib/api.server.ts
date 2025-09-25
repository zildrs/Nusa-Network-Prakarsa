import { getRequestLocale } from "~/lib/locale-utils.server";
import { createApiRequest } from "~/lib/request.server";
import type { DataResponseType } from "~/types";
import type { BackendBlogResponse, BlogData, BlogPost } from "~/types/blog";
import type { DepartmentsReponseType, DepartmentType } from "~/types/career";
import type { CategoriesReponseType, CategoryType } from "~/types/category";
import type {
  CertificationsReponseType,
  CertificationType,
} from "~/types/certification";
import type { PartnerReponseType, PartnerType } from "~/types/partner";
import type {
  IndustriesReponseType,
  IndustryType,
  ProjectsReponseType,
  ProjectType,
} from "~/types/project";
import type { SolutionsReponseType, SolutionType } from "~/types/solution";
import type { TestimonyReponseType, TestimonyType } from "~/types/testimony";
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
export async function fetchSolutionsData(
  request: Request
): Promise<SolutionsReponseType> {
  const locale = getRequestLocale(request);

  const json = await createApiRequest<DataResponseType<SolutionType[]>>(
    API_BASE,
    "solutions",
    {
      query: { locale, populate: "*" },
      serviceName: "solutions",
    }
  );

  const solutions: SolutionType[] = Array.isArray(json?.data) ? json!.data : [];
  return { solutions, locale, meta: json?.meta };
}

export async function fetchIndustriesData(
  request: Request
): Promise<IndustriesReponseType> {
  const locale = getRequestLocale(request);

  const json = await createApiRequest<DataResponseType<IndustryType[]>>(
    API_BASE,
    "industries",
    {
      query: { locale, populate: "*" },
      serviceName: "industries",
    }
  );

  const industries: IndustryType[] = Array.isArray(json?.data)
    ? json!.data
    : [];
  return { industries, locale, meta: json?.meta };
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
export async function fetchProjectsData(
  request: Request
): Promise<ProjectsReponseType> {
  const locale = getRequestLocale(request);

  const json = await createApiRequest<DataResponseType<ProjectType[]>>(
    API_BASE,
    "projects",
    {
      query: { locale, populate: "*" },
      serviceName: "projects",
    }
  );

  const projects: ProjectType[] = Array.isArray(json?.data) ? json!.data : [];
  return { projects, locale, meta: json?.meta };
}

export async function fetchTestimonialsData(
  request: Request
): Promise<TestimonyReponseType> {
  const locale = getRequestLocale(request);

  const json = await createApiRequest<DataResponseType<TestimonyType[]>>(
    API_BASE,
    "testimonies",
    {
      query: { locale, populate: "*" },
      serviceName: "testimonies",
    }
  );

  const testimonies: TestimonyType[] = Array.isArray(json?.data)
    ? json!.data
    : [];
  return { testimonies, locale, meta: json?.meta };
}

export async function fetchCertificationsData(
  request: Request
): Promise<CertificationsReponseType> {
  const locale = getRequestLocale(request);
  const json = await createApiRequest<DataResponseType<CertificationType[]>>(
    API_BASE,
    "certificantions",
    {
      query: { locale, populate: "*" },
      serviceName: "certifications",
    }
  );

  const certifications: CertificationType[] = Array.isArray(json?.data)
    ? json!.data
    : [];
  return { certifications, locale, meta: json?.meta };
}

export async function fetchPartnersData(
  request: Request
): Promise<PartnerReponseType> {
  const locale = getRequestLocale(request);
  const json = await createApiRequest<DataResponseType<PartnerType[]>>(
    API_BASE,
    "partners",
    {
      query: { locale, populate: "*" },
      serviceName: "partners",
    }
  );

  const partners: PartnerType[] = Array.isArray(json?.data) ? json!.data : [];
  return { partners, locale, meta: json?.meta };
}

export async function fetchDepartmentsData(
  request: Request
): Promise<DepartmentsReponseType> {
  const locale = getRequestLocale(request);
  const json = await createApiRequest<DataResponseType<DepartmentType[]>>(
    API_BASE,
    "departments",
    {
      query: { locale, populate: "*" },
      serviceName: "departments",
    }
  );

  const departments: DepartmentType[] = Array.isArray(json?.data)
    ? json!.data
    : [];
  return { departments, locale, meta: json?.meta };
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
    serviceName: "blog-by-slug",
  });

  const blog: BlogPost | null = json?.data?.length ? json.data[0] : null;
  return blog;
}

export async function fetchProjectBySlug(
  request: Request,
  slug: string
): Promise<ProjectType | null> {
  const locale = getRequestLocale(request);

  const json = await createApiRequest<DataResponseType<ProjectType[]>>(
    API_BASE,
    "projects",
    {
      query: {
        locale,
        "filters[slug][$eq]": slug, // ✅ sesuai format Strapi
        populate: "*", // opsional, kalau mau ambil relasi
      },
      serviceName: "project-by-slug",
    }
  );
  console.log(json);

  const project: ProjectType | null = json?.data?.length ? json.data[0] : null;
  return project;
}
