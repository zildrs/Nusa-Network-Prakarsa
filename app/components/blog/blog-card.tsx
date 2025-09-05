import { Link } from "react-router";
import { APP_BASE_URL } from "~/lib/utils";
import type { BlogPost } from "~/types/blog";
import { getBlogSlug } from "~/utils/blog";

interface BlogCardProps {
  blog: BlogPost;
  variant?: "default" | "compact" | "featured";
  className?: string;
}

export function BlogCard({
  blog,
  variant = "default",
  className = "",
}: BlogCardProps) {
  const slug = getBlogSlug(blog);
  const imageSrc = "/bg-card.png";
  const categoryLabel = blog.category.name || "BLOG";
  if (variant === "compact") {
    return (
      <Link
        to={slug}
        className={`flex p-2 gap-3 rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-sm transition ${className}`}
      >
        <img
          src={`${APP_BASE_URL}/${blog.banner[0].url}` || imageSrc}
          alt={blog.title}
          className="h-24 aspect-square object-cover rounded-md"
        />
        <div className="flex flex-col justify-between">
          <h4 className="font-medium text-base line-clamp-2">{blog.title}</h4>
          <span className="text-sm text-gray-600">{categoryLabel}</span>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link
        to={slug}
        className={`block p-3 h-full rounded-2xl overflow-hidden border border-gray-200 bg-white transition hover:shadow-sm ${className}`}
      >
        <img
          src={`${APP_BASE_URL}/${blog.banner[0].url}` || imageSrc}
          alt={blog.title}
          className="w-full h-60 md:h-80 object-cover rounded-xl"
        />
        <div className="py-2">
          <h3 className="font-semibold text-xl mb-2 line-clamp-2">
            {blog.title}
          </h3>
          <span className="text-sm text-gray-500">{categoryLabel}</span>
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link
      to={slug}
      className={`rounded-2xl p-3 overflow-hidden border border-gray-200 bg-white transition hover:shadow-sm ${className}`}
    >
      <img
        src={`${APP_BASE_URL}/${blog.banner[0].url}` || imageSrc}
        alt={blog.title}
        className="w-full aspect-[4/3] object-cover rounded-xl"
      />
      <div className="py-3 px-1">
        <h4 className="font-medium text-lg line-clamp-3">{blog.title}</h4>
      </div>
    </Link>
  );
}
