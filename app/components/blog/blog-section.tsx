import { Link } from "react-router";
import { ArrowRight } from "@carbon/icons-react";
import type { BlogPost } from "~/types/blog";
import { BlogCard } from "./blog-card";

interface BlogSectionProps {
  title: string;
  blogs: BlogPost[];
  showSeeAll?: boolean;
  seeAllLink?: string;
  className?: string;
  locale?: "id" | "en";
}

export function BlogSection({
  title,
  blogs,
  showSeeAll = true,
  seeAllLink = "/blog",
  className = "",
  locale,
}: BlogSectionProps) {
  if (!blogs || blogs.length === 0) return null;

  return (
    <section className={`py-10 max-w-7xl mx-auto px-4 lg:px-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">{title}</h2>
        {showSeeAll && (
          <Link
            to={seeAllLink}
            className="text-sm hover:underline flex items-center gap-1"
          >
            See All <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} locale={locale} />
        ))}
      </div>
    </section>
  );
}
