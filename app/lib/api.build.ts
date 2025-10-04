import { createApiRequest } from "./request.server";
import type { Locale } from "../i18n";
import type { DataResponseType } from "../types";
import type {
  BackendBlogResponse,
  BackendBlogResponseMeta,
  BlogPost,
} from "../types/blog";
import type { CategoriesReponseType, CategoryType } from "../types/category";
import type {
  SolutionsReponseType,
  SolutionType,
} from "../types/solution";
import type {
  ProjectsReponseType,
  ProjectType,
  IndustriesReponseType,
  IndustryType,
} from "../types/project";
import type {
  TestimonyReponseType,
  TestimonyType,
} from "../types/testimony";
import type { HomeDataType } from "../types/home";
import type {
  CertificationsReponseType,
  CertificationType,
} from "../types/certification";
import type {
  DepartmentsReponseType,
  DepartmentType,
} from "../types/career";
import type { PartnerReponseType, PartnerType } from "../types/partner";

const API_BASE = "https://dash.nusanetwork.com/api/";
const DEFAULT_PAGE_SIZE = 50;

type BlogCollectionArgs = {
  locale: Locale;
  categoryName?: string;
  page?: number;
  pageSize?: number;
};

export interface BlogCollectionResult {
  locale: Locale;
  blogs: BlogPost[];
  meta?: BackendBlogResponseMeta;
}

export async function fetchBlogCollection({
  locale,
  categoryName,
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
}: BlogCollectionArgs): Promise<BlogCollectionResult> {
  const query: Record<string, string | number> = {
    locale,
    populate: "*",
    "pagination[page]": page,
    "pagination[pageSize]": pageSize,
  };

  if (categoryName) {
    query["filters[category][name][$eq]"] = categoryName;
  }

  const json = await createApiRequest<BackendBlogResponse>(API_BASE, "blogs", {
    query,
    serviceName: "blog-build",
  });

  const blogs = Array.isArray(json?.data) ? (json.data as BlogPost[]) : [];
  if (blogs.length === 0 && locale === "id") {
    const fallback = await fetchBlogCollection({
      locale: "en",
      categoryName,
      page,
      pageSize,
    });
    return { locale, blogs: fallback.blogs, meta: fallback.meta };
  }

  return {
    locale,
    blogs,
    meta: json?.meta,
  };
}

type BlogCategoriesArgs = {
  locale: Locale;
};

export interface BlogCategoriesResult {
  locale: Locale;
  categories: CategoryType[];
  meta?: CategoriesReponseType["meta"];
}

export async function fetchBlogCategories({
  locale,
}: BlogCategoriesArgs): Promise<BlogCategoriesResult> {
  const json = await createApiRequest<DataResponseType<CategoryType[]>>(
    API_BASE,
    "categories",
    {
      query: { locale },
      serviceName: "categories-build",
    }
  );

  const categories = Array.isArray(json?.data) ? json.data : [];
  if (categories.length === 0 && locale === "id") {
    const fallback = await fetchBlogCategories({ locale: "en" });
    return { locale, categories: fallback.categories, meta: fallback.meta };
  }

  return {
    locale,
    categories,
    meta: json?.meta,
  };
}

type LocaleArgs = { locale: Locale };

export interface SolutionsCollectionResult {
  locale: Locale;
  solutions: SolutionType[];
  meta?: SolutionsReponseType["meta"];
}

export async function fetchSolutionsCollection({
  locale,
}: LocaleArgs): Promise<SolutionsCollectionResult> {
  const json = await createApiRequest<DataResponseType<SolutionType[]>>(
    API_BASE,
    "solutions",
    {
      query: { locale, populate: "*" },
      serviceName: "solutions-build",
    }
  );

  return {
    locale,
    solutions: Array.isArray(json?.data) ? json.data : [],
    meta: json?.meta,
  };
}

export interface ProjectsCollectionResult {
  locale: Locale;
  projects: ProjectType[];
  meta?: ProjectsReponseType["meta"];
}

export async function fetchProjectsCollection({
  locale,
}: LocaleArgs): Promise<ProjectsCollectionResult> {
  const json = await createApiRequest<DataResponseType<ProjectType[]>>(
    API_BASE,
    "projects",
    {
      query: { locale, populate: "*" },
      serviceName: "projects-build",
    }
  );

  return {
    locale,
    projects: Array.isArray(json?.data) ? json.data : [],
    meta: json?.meta,
  };
}

export interface IndustriesCollectionResult {
  locale: Locale;
  industries: IndustryType[];
  meta?: IndustriesReponseType["meta"];
}

export async function fetchIndustriesCollection({
  locale,
}: LocaleArgs): Promise<IndustriesCollectionResult> {
  const json = await createApiRequest<DataResponseType<IndustryType[]>>(
    API_BASE,
    "industries",
    {
      query: { locale, populate: "*" },
      serviceName: "industries-build",
    }
  );

  return {
    locale,
    industries: Array.isArray(json?.data) ? json.data : [],
    meta: json?.meta,
  };
}

export interface TestimonialsCollectionResult {
  locale: Locale;
  testimonies: TestimonyType[];
  meta?: TestimonyReponseType["meta"];
}

export async function fetchTestimonialsCollection({
  locale,
}: LocaleArgs): Promise<TestimonialsCollectionResult> {
  const json = await createApiRequest<DataResponseType<TestimonyType[]>>(
    API_BASE,
    "testimonies",
    {
      query: { locale, populate: "*" },
      serviceName: "testimonies-build",
    }
  );

  return {
    locale,
    testimonies: Array.isArray(json?.data) ? json.data : [],
    meta: json?.meta,
  };
}

export interface HomeContentResult {
  locale: Locale;
  home: HomeDataType | null;
}

export async function fetchHomeContent({
  locale,
}: LocaleArgs): Promise<HomeContentResult> {
  const json = await createApiRequest<DataResponseType<HomeDataType[]>>(
    API_BASE,
    "homes",
    {
      query: { locale, populate: "*" },
      serviceName: "home-build",
    }
  );

  const home = Array.isArray(json?.data) ? json.data[0] ?? null : null;

  return { locale, home };
}

export interface CertificationsCollectionResult {
  locale: Locale;
  certifications: CertificationType[];
  meta?: CertificationsReponseType["meta"];
}

export async function fetchCertificationsCollection({
  locale,
}: LocaleArgs): Promise<CertificationsCollectionResult> {
  const json = await createApiRequest<DataResponseType<CertificationType[]>>(
    API_BASE,
    "certificantions",
    {
      query: { locale, populate: "*" },
      serviceName: "certifications-build",
    }
  );

  return {
    locale,
    certifications: Array.isArray(json?.data) ? json.data : [],
    meta: json?.meta,
  };
}

export interface DepartmentsCollectionResult {
  locale: Locale;
  departments: DepartmentType[];
  meta?: DepartmentsReponseType["meta"];
}

export async function fetchDepartmentsCollection({
  locale,
}: LocaleArgs): Promise<DepartmentsCollectionResult> {
  const json = await createApiRequest<DataResponseType<DepartmentType[]>>(
    API_BASE,
    "departments",
    {
      query: { locale, populate: "careers" },
      serviceName: "departments-build",
    }
  );

  return {
    locale,
    departments: Array.isArray(json?.data) ? json.data : [],
    meta: json?.meta,
  };
}

export interface PartnersCollectionResult {
  locale: Locale;
  partners: PartnerType[];
  meta?: PartnerReponseType["meta"];
}

export async function fetchPartnersCollection({
  locale,
}: LocaleArgs): Promise<PartnersCollectionResult> {
  const json = await createApiRequest<DataResponseType<PartnerType[]>>(
    API_BASE,
    "partners",
    {
      query: { locale, populate: "solutions,company_logo" },
      serviceName: "partners-build",
    }
  );

  return {
    locale,
    partners: Array.isArray(json?.data) ? json.data : [],
    meta: json?.meta,
  };
}
