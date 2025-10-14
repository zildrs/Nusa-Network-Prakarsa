import type { BaseDataType } from ".";
import type { CategoryType } from "./category";

export interface BackendBlogPost {
  id: number;
  documentId: string;
  title: string;
  content: string | null;
  slug: string | null;
  summary: string | null;
  reading_time: number | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  banner: Banner[];
  category: CategoryType;
  author: AuthorType;
}

export type AuthorType = BaseDataType & {
  name: string;
};

export interface BackendBlogResponseMetaPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface BackendBlogResponseMeta {
  pagination: BackendBlogResponseMetaPagination;
}

export interface BackendBlogResponse {
  data: BackendBlogPost[];
  meta: BackendBlogResponseMeta;
}

// Keep consumer-facing names used across the app for minimal churn
export type BlogPost = BackendBlogPost;

export interface BlogData {
  blogs: BlogPost[];
  locale: "en" | "id";
  meta?: BackendBlogResponseMeta;
}

export interface BlogSectionProps {
  title: string;
  blogs: BlogPost[];
  showSeeAll?: boolean;
  seeAllLink?: string;
  variant?: "grid" | "list" | "hero";
}

export interface Banner {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: null;
  width: number;
  height: number;
  formats: {
    small: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path: null;
      size: number;
      width: number;
      height: number;
      sizeInBytes: number;
    };
    medium: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path: null;
      size: number;
      width: number;
      height: number;
      sizeInBytes: number;
    };
    thumbnail: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path: null;
      size: number;
      width: number;
      height: number;
      sizeInBytes: number;
    };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
