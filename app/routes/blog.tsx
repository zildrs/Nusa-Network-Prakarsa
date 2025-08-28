import { Link } from "react-router";
import type { Route } from "./+types/blog";
import { ArrowRight } from "@carbon/icons-react";
import CTASection from "~/components/cta";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const blogs = [
  {
    id: 1,
    title: "Transforming Peruri Businesses with SD-WAN Technology max 2 lines",
    category: "Technology",
    image:
      "https://awsimages.detik.net.id/community/media/visual/2024/11/19/kantor-peruri-resmi-jadi-cagar-budaya-1_169.jpeg?w=700&q=90",
  },
  {
    id: 2,
    title: "Transforming Peruri Businesses with SD-WAN Technology max 3 lines",
    category: "Technology",
    image:
      "https://awsimages.detik.net.id/community/media/visual/2024/11/19/kantor-peruri-resmi-jadi-cagar-budaya-1_169.jpeg?w=700&q=90",
  },
  {
    id: 3,
    title: "Transforming Peruri Businesses with SD-WAN Technology max 3 lines",
    category: "Technology",
    image:
      "https://awsimages.detik.net.id/community/media/visual/2024/11/19/kantor-peruri-resmi-jadi-cagar-budaya-1_169.jpeg?w=700&q=90",
  },
  {
    id: 4,
    title: "Transforming Peruri Businesses with SD-WAN Technology max 3 lines",
    category: "Technology",
    image:
      "https://awsimages.detik.net.id/community/media/visual/2024/11/19/kantor-peruri-resmi-jadi-cagar-budaya-1_169.jpeg?w=700&q=90",
  },
];

export default function Blog() {
  return (
    <main>
      <section className="border-b border-gray-200 bg-white text-gray-600">
        <div className="max-w-7xl  mx-auto">
          <nav className="text-sm py-4 flex items-center gap-6 w-full overflow-scroll lg:overflow-hidden px-4 lg:px-6">
            {[
              "Home",
              "Technology",
              "Devices",
              "ICT Solutions",
              "Nusa Insight",
              "Press Release",
            ].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="font-medium text-gray-800 whitespace-nowrap"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </section>
      <section className="overflow-hidden relative px-4 lg:px-6">
        {/* Bagian Atas */}
        <img
          src="/bg-solutions.png"
          alt="Background Solution"
          className="absolute top-0 right-0 opacity-10 max-w-4xl"
        />
        <div className="py-10 max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card Besar */}
            <div className="md:col-span-2 h-full">
              <Link
                to={`/blog/${blogs[0].id}`}
                className="block p-3 h-full rounded-2xl overflow-hidden border border-gray-200 bg-white transition"
              >
                <img
                  src={blogs[0].image}
                  alt={blogs[0].title}
                  className="w-full h-60 md:h-80 object-cover rounded-xl"
                />
                <div className="py-2">
                  <h3 className="font-semibold text-xl mb-2 line-clamp-2">
                    {blogs[0].title}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {blogs[0].category}
                  </span>
                </div>
              </Link>
            </div>

            {/* Card Kecil di Kanan */}
            <div className="flex flex-col gap-4 justify-between">
              {blogs.slice(1, 4).map((article) => (
                <Link
                  key={article.id}
                  to={`/blog/${article.id}`}
                  className="flex p-2 gap-3 rounded-xl border border-gray-200 bg-white overflow-hidden"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-24 aspect-square object-cover rounded-md "
                  />
                  <div className="flex flex-col justify-between">
                    <h4 className="font-medium text-base line-clamp-2">
                      {article.title}
                    </h4>
                    <span className="text-sm text-gray-600">
                      {article.category}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-10 max-w-7xl mx-auto px-4 lg:px-6">
        {/* Bagian Bawah */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">TECHNOLOGY</h2>
          <Link
            to="/blog"
            className="text-sm hover:underline flex items-center gap-1"
          >
            See All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Card bawah */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {blogs.slice(1, 4).map((article) => (
            <Link
              key={article.id}
              to={`/blog/${article.id}`}
              className="rounded-2xl p-3 overflow-hidden border border-gray-200 bg-white transition"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full aspect-[4/3] object-cover rounded-xl"
              />
              <div className="py-3 px-1">
                <h4 className="font-medium text-lg line-clamp-3 ">
                  {article.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>

        {/* Bagian Bawah */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">DEVICES</h2>
          <Link
            to="/blog"
            className="text-sm hover:underline flex items-center gap-1"
          >
            See All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Card bawah */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.slice(1, 4).map((article) => (
            <Link
              key={article.id}
              to={`/blog/${article.id}`}
              className="rounded-2xl p-3 overflow-hidden border border-gray-200 bg-white transition"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full aspect-[4/3] object-cover rounded-xl"
              />
              <div className="py-3 px-1">
                <h4 className="font-medium text-lg line-clamp-3 ">
                  {article.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <CTASection />
    </main>
  );
}
