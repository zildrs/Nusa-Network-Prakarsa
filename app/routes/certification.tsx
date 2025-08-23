import CTASection from "~/components/cta";
import type { Route } from "./+types/certification";
import { Dropdown } from "~/components/dropdown";
import { Building2, Lightbulb } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "React Certification" },
    { name: "description", content: "Prepare for the React Certification" },
  ];
}

const items = [
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    title: "Leading Solutions with World-Class Partners",
    year: "2024",
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    title: "Leading Solutions with World-Class Partners",
    year: "2024",
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    title: "Leading Solutions with World-Class Partners",
    year: "2024",
  },
  {
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6zMRfdQfGIwszxvfn1gm9fdUZgoa1U68MmQ&s",
    title: "ISO 9001:2015 – Quality Management Systems",
    year: "2024",
  },
  {
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6zMRfdQfGIwszxvfn1gm9fdUZgoa1U68MmQ&s",
    title: "ISO 9001:2015 – Quality Management Systems",
    year: "2024",
  },
  {
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6zMRfdQfGIwszxvfn1gm9fdUZgoa1U68MmQ&s",
    title: "ISO 9001:2015 – Quality Management Systems",
    year: "2024",
  },
];

export default function Certification() {
  return (
    <main>
      <section className="bg-blue-950 relative text-white pt-12 py-18 lg:py-12 lg:min-h-[350px] overflow-hidden">
        <div
          className="absolute z-10 top-[-250px] right-[-250px] w-[400px] h-[400px] rounded-full filter blur-xl"
          style={{
            background:
              "radial-gradient(circle, rgba(135,206,250,0.15), rgba(0,128,128,0.1))",
          }}
        ></div>

        <div
          className="absolute  bottom-[-250px] left-[-100px] w-[350px] h-[350px] rounded-full filter blur-xl"
          style={{
            background:
              "radial-gradient(circle, rgba(135,206,250,0.15), rgba(0,128,128,0.1))",
          }}
        ></div>

        <div className="max-w-7xl mx-auto my-auto lg:min-h-[250px] px-4 relative flex-col flex justify-center">
          <p className="uppercase tracking-wide mb-6 z-20">
            <span className="font-semibold">ACHIEVMENT</span>
          </p>
          <div className="flex justify-between items-center">
            <h2 className="text-4xl lg:text-5xl lg:font-semibold leading-snug mb-10">
              Nusa Achievement
            </h2>
          </div>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="border rounded-2xl p-6  bg-white transition"
            >
              <img src={item.logo} alt={item.title} className="h-8 mb-4" />
              <h3 className="text-base font-medium text-gray-900 mb-2 max-w-3xs line-clamp-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500">{item.year}</p>
            </div>
          ))}
        </div>
      </section>
      <CTASection />
    </main>
  );
}
