import { useState } from "react";
import type { Route } from "./+types/case-study";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import CTASection from "~/components/cta";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const caseStudies = [
  {
    title: "Transforming Peruri Businesses with SD–WAN Technology",
    company: "Peruri",
    img: "https://awsimages.detik.net.id/community/media/visual/2024/11/19/kantor-peruri-resmi-jadi-cagar-budaya-1_169.jpeg?w=700&q=90",
    companyLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_2024_Perum_Peruri.svg/2560px-Logo_2024_Perum_Peruri.svg.png",
  },
  {
    title: "Transforming J&T Express Businesses with SD–WAN Technology",
    company: "J&T Express",
    img: "https://foto.kontan.co.id/8TQWPa6yy4jEQX5iWDd_3ql1pv4=/640x360/smart/2021/12/15/1054233720p.jpg",
    companyLogo:
      "https://1000logos.net/wp-content/uploads/2022/08/JT-Express-Logo.png",
  },
  {
    title: "Transforming Peruri Businesses with SD–WAN Technology",
    company: "Peruri",
    img: "https://awsimages.detik.net.id/community/media/visual/2024/11/19/kantor-peruri-resmi-jadi-cagar-budaya-1_169.jpeg?w=700&q=90",
    companyLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_2024_Perum_Peruri.svg/2560px-Logo_2024_Perum_Peruri.svg.png",
  },
];

export default function CaseStudy() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");
  const [selectedSolution, setSelectedSolution] = useState<string>("");

  // Filter data berdasarkan pilihan dropdown
  // const filteredData = caseStudies.filter((item) => {
  //   return (
  //     (selectedIndustry === "" || item.category === selectedIndustry) &&
  //     (selectedSolution === "" || item.solution === selectedSolution)
  //   );
  // });

  return (
    <main>
      <section className="bg-blue-950 relative text-white pt-12 py-18 lg:py-12 lg:min-h-[350px] overflow-hidden">
        <img
          src="/bg-solutions.png"
          alt="Background Solution"
          className="absolute top-0 right-0 opacity-70 max-w-lg"
        />
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

        <div className="max-w-7xl mx-auto my-auto h-full px-4 relative flex-col flex justify-center">
          <p className="uppercase tracking-wide mb-6 z-20">
            <span className="font-semibold">About</span> Us
          </p>
          <div className="flex justify-between items-center">
            <h2 className="text-4xl lg:text-5xl lg:font-semibold leading-snug mb-10">
              Where Vision
              <br />
              meets Execution
            </h2>
          </div>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto p-6">
        {/* Filter */}
        <div className="flex gap-4 mb-6">
          {/* Industry Filter */}
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">All Industries</option>
            <option value="Industry">Industry</option>
            <option value="Logistics">Logistics</option>
            <option value="Retail">Retail</option>
          </select>

          {/* Solution Filter */}
          <select
            value={selectedSolution}
            onChange={(e) => setSelectedSolution(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">All Solutions</option>
            <option value="SD-WAN">SD-WAN</option>
            <option value="Cloud">Cloud</option>
          </select>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {caseStudies.map((c, idx) => (
            <div
              key={idx}
              className="rounded-lg overflow-hidden shadow-lg relative aspect-square"
            >
              <img
                src={c.img}
                alt={c.title}
                className="w-full object-cover h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 gap-2 flex flex-col justify-end items-start">
                <img
                  src={c.companyLogo}
                  alt={c.title}
                  className="h-8 object-contain brightness-0 grayscale invert"
                />
                <p className="text-white font-medium text-xl">{c.title}</p>
                <div className="flex items-center gap-2">
                  <p className="text-white font-medium">Learn more</p>
                  <ArrowRight className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <CTASection />
    </main>
  );
}
