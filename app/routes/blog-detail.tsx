import { Link } from "react-router";
import type { Route } from "./+types/blog";
import {
  ArrowRight,
  Building2,
  Cpu,
  Database,
  MonitorCheck,
  Network,
} from "lucide-react";
import CTASection from "~/components/cta";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const solutions = [
  {
    title: "Data Center",
    desc: "Safely secure your business data",
    icon: Building2,
  },
  {
    title: "Managed Services",
    desc: "Preventive & Corrective Maintenance",
    icon: Network,
  },
  {
    title: "Security Infrastructure",
    desc: "Securing systems with layered defense",
    icon: Database,
  },
  {
    title: "Network Infrastructure",
    desc: "Reliable connectivity for operations",
    icon: MonitorCheck,
  },
  {
    title: "Internet of Things (IoT)",
    desc: "Smart environment monitoring tools",
    icon: Cpu,
  },
];

export default function BlogDetail() {
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
      <div className="min-h-screen bg-white font-sans">
        {/* Hero Section */}
        <section className="bg-blue-950 text-white py-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
            {/* Left Content */}
            <div className="flex flex-col justify-between h-full pb-4 lg:px-4">
              <div>
                <p className="text-sm mb-2 opacity-80">Technology</p>
                <h1 className="text-3xl mb-16 md:text-4xl font-bold leading-snug max-w-xl line-clamp-3">
                  Transforming Peruri Businesses with SD-WAN Technologymax 3
                  lines
                </h1>
              </div>
              <div className="flex justify-between items-center gap-6 text-sm opacity-90">
                <span>Angela Paramitha</span>
                <span>1 January 2025</span>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex justify-end">
              <img
                src="https://awsimages.detik.net.id/community/media/visual/2024/11/19/kantor-peruri-resmi-jadi-cagar-budaya-1_169.jpeg?w=700&q=90"
                alt="Peruri"
                className="rounded-xl w-full aspect-[5/3] lg:aspect-[6/3] object-cover shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Content + Sidebar */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 py-12 max-w-7xl mx-auto px-4 lg:px-6">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
                Title 1
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Eu aliquam urna purus et
                non. Nunc sagittis aliquam quam id enim. Metus dictum nulla
                ultrices nisi id duis. Leo integer risus id a posuere
                suspendisse augue amet. Sapien sit vulputate et nec sagittis
                rhoncus proin penatibus. Ut velit condimentum mattis dolor.
                Blandit morbi et augue ac sit. Sit tincidunt lorem mauris quam
                commodo tempor placerat montes. Aliquet integer urna mus dui
                morbi nunc metus lectus ultrices.
              </p>
            </div>

            <div>
              <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
                Title 2
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Eu aliquam urna purus et
                non. Nunc sagittis aliquam quam id enim. Metus dictum nulla
                ultrices nisi id duis. Leo integer risus id a posuere
                suspendisse augue amet. Sapien sit vulputate et nec sagittis
                rhoncus proin penatibus. Ut velit condimentum mattis dolor.
                Blandit morbi et augue ac sit. Sit tincidunt lorem mauris quam
                commodo tempor placerat montes. Aliquet integer urna mus dui
                morbi nunc metus lectus ultrices.
              </p>
            </div>

            <div>
              <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
                Title 3
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Eu aliquam urna purus et
                non. Nunc sagittis aliquam quam id enim. Metus dictum nulla
                ultrices nisi id duis. Leo integer risus id a posuere
                suspendisse augue amet. Sapien sit vulputate et nec sagittis
                rhoncus proin penatibus. Ut velit condimentum mattis dolor.
                Blandit morbi et augue ac sit. Sit tincidunt lorem mauris quam
                commodo tempor placerat montes. Aliquet integer urna mus dui
                morbi nunc metus lectus ultrices.
              </p>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-10">
            {/* More Like This */}
            <div>
              <p className="uppercase tracking-wide mb-4 z-20">
                More <span className="font-semibold">Like This</span>
              </p>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex h-full items-center gap-4 p-2 rounded-xl border border-gray-200 hover:shadow-sm transition"
                  >
                    <img
                      src="https://placehold.co/100"
                      alt="thumbnail"
                      className="rounded-lg h-full object-cover aspect-square"
                    />
                    <div
                      className="flex flex-col justify-between"
                      style={{ height: "-webkit-fill-available" }}
                    >
                      <p className="text-sm font-medium text-gray-800 line-clamp-3">
                        Transforming Peruri Businesses with SD-WAN Technologymax
                        3 lines
                      </p>
                      <p className="text-xs text-gray-500">Technology</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Solutions */}
            <div className="">
              <p className="uppercase tracking-wide mb-4 z-20">
                Our <span className="font-semibold">Solutions</span>
              </p>
              <div className="pl-6 border border-gray-200 rounded-lg p-4">
                {solutions.map((item) => (
                  <Link
                    key={item.title}
                    to={`/solutions/${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className="py-3 flex items-center gap-4"
                  >
                    <item.icon className="mr-2" size={20} />
                    <div className="block">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </div>
      <CTASection />
    </main>
  );
}
