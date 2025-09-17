import { Link } from "react-router";
import { nameToSlug } from "~/lib/utils";
import type { CategoryType } from "~/types/category";

// const categories = [
//   "Home",
//   "Technology",
//   "Devices",
//   "ICT Solutions",
//   "Nusa Insight",
//   "Press Release",
// ];

interface BlogNavigationProps {
  className?: string;
  categories: CategoryType[];
  locale?: "id" | "en";
}

export function BlogNavigation({
  className = "",
  categories,
  locale,
}: BlogNavigationProps) {
  return (
    <section
      className={`border-b border-gray-200 bg-white text-gray-600 ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        <nav className="text-sm py-4 flex items-center gap-6 w-full overflow-scroll lg:overflow-hidden px-4 lg:px-6">
          {categories.map((item) => (
            <Link
              key={item.id}
              to={`${locale ? `/${locale}` : ''}/blog/${nameToSlug(item.name)}`}
              className="font-medium text-gray-800 whitespace-nowrap"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
