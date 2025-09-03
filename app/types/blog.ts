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
}

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
  locale: string;
  meta?: BackendBlogResponseMeta;
}

export interface BlogSectionProps {
  title: string;
  blogs: BlogPost[];
  showSeeAll?: boolean;
  seeAllLink?: string;
  variant?: 'grid' | 'list' | 'hero';
}
