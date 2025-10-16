import type { BlogPost } from "~/types/blog";
import { BlogCard } from "./blog-card";

interface BlogHeroProps {
  featuredBlog: BlogPost;
  relatedBlogs: BlogPost[];
  className?: string;
  locale?: "id" | "en";
}

export function BlogHero({
  featuredBlog,
  relatedBlogs,
  className = "",
  locale,
}: BlogHeroProps) {
  return (
    <section className={`overflow-hidden relative px-4 lg:px-6 ${className}`}>
      <img
        src="/bg-solutions.png"
        alt="Background Solution"
        className="absolute top-0 right-0 opacity-10 max-w-4xl"
      />
      <div className="py-10 max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Featured Blog Card */}
          <div data-aos="fade-up" className="md:col-span-2 h-full">
            <BlogCard blog={featuredBlog} variant="featured" locale={locale} />
          </div>

          {/* Related Blogs */}
          <div className="flex flex-col gap-4 justify-between">
            {relatedBlogs.slice(0, 3).map((blog, i) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                variant="compact"
                locale={locale}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
