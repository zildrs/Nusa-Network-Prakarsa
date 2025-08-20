import { useState } from "react";
import type { Route } from "./+types/case-study";
import { Link } from "react-router";
import { ArrowRight, Building2, Lightbulb } from "lucide-react";
import CTASection from "~/components/cta";
import CaseStudyCard from "~/components/case-study-card";
import { Dropdown } from "~/components/dropdown";

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
    category: "Finance",
    solution: "SD-WAN",
    img: "https://awsimages.detik.net.id/community/media/visual/2024/11/19/kantor-peruri-resmi-jadi-cagar-budaya-1_169.jpeg?w=700&q=90",
    companyLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_2024_Perum_Peruri.svg/2560px-Logo_2024_Perum_Peruri.svg.png",
  },
  {
    title: "Transforming J&T Express Businesses with SD–WAN Technology",
    company: "J&T Express",
    category: "Logistics",
    solution: "SD-WAN",
    img: "https://foto.kontan.co.id/8TQWPa6yy4jEQX5iWDd_3ql1pv4=/640x360/smart/2021/12/15/1054233720p.jpg",
    companyLogo:
      "https://1000logos.net/wp-content/uploads/2022/08/JT-Express-Logo.png",
  },
  {
    title: "Transforming Peruri Businesses with SD–WAN Technology",
    company: "Peruri",
    category: "Finance",
    solution: "SD-WAN",
    img: "https://awsimages.detik.net.id/community/media/visual/2024/11/19/kantor-peruri-resmi-jadi-cagar-budaya-1_169.jpeg?w=700&q=90",
    companyLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_2024_Perum_Peruri.svg/2560px-Logo_2024_Perum_Peruri.svg.png",
  },
  {
    title: "Transforming J&T Express Businesses with SD–WAN Technology",
    company: "J&T Express",
    category: "Logistics",
    solution: "SD-WAN",
    img: "https://foto.kontan.co.id/8TQWPa6yy4jEQX5iWDd_3ql1pv4=/640x360/smart/2021/12/15/1054233720p.jpg",
    companyLogo:
      "https://1000logos.net/wp-content/uploads/2022/08/JT-Express-Logo.png",
  },
  {
    title: "Transforming Peruri Businesses with SD–WAN Technology",
    company: "Peruri",
    category: "Finance",
    solution: "SD-WAN",
    img: "https://awsimages.detik.net.id/community/media/visual/2024/11/19/kantor-peruri-resmi-jadi-cagar-budaya-1_169.jpeg?w=700&q=90",
    companyLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_2024_Perum_Peruri.svg/2560px-Logo_2024_Perum_Peruri.svg.png",
  },
  {
    title: "Transforming J&T Express Businesses with SD–WAN Technology",
    company: "J&T Express",
    category: "Logistics",
    solution: "SD-WAN",
    img: "https://foto.kontan.co.id/8TQWPa6yy4jEQX5iWDd_3ql1pv4=/640x360/smart/2021/12/15/1054233720p.jpg",
    companyLogo:
      "https://1000logos.net/wp-content/uploads/2022/08/JT-Express-Logo.png",
  },
  {
    title: "Transforming Peruri Businesses with SD–WAN Technology",
    company: "Peruri",
    category: "Finance",
    solution: "SD-WAN",
    img: "https://awsimages.detik.net.id/community/media/visual/2024/11/19/kantor-peruri-resmi-jadi-cagar-budaya-1_169.jpeg?w=700&q=90",
    companyLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_2024_Perum_Peruri.svg/2560px-Logo_2024_Perum_Peruri.svg.png",
  },
  {
    title: "Transforming J&T Express Businesses with SD–WAN Technology",
    company: "J&T Express",
    category: "Logistics",
    solution: "SD-WAN",
    img: "https://foto.kontan.co.id/8TQWPa6yy4jEQX5iWDd_3ql1pv4=/640x360/smart/2021/12/15/1054233720p.jpg",
    companyLogo:
      "https://1000logos.net/wp-content/uploads/2022/08/JT-Express-Logo.png",
  },
];

export default function CaseStudy() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");
  const [selectedSolution, setSelectedSolution] = useState<string>("");

  const filteredData = caseStudies.filter((item) => {
    return (
      (selectedIndustry === "" || item.category === selectedIndustry) &&
      (selectedSolution === "" || item.solution === selectedSolution)
    );
  });

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
          <Dropdown
            label="Industry"
            onSelect={(value) => setSelectedIndustry(value)}
            className="text-sm !px-3"
            icon={<Building2 className="w-4 h-4 lg:w-5 lg:h-5 text-gray-500" />}
            items={[
              { value: "", label: "All Industries" },
              { value: "Industry", label: "Industry" },
              { value: "Logistics", label: "Logistics" },
              { value: "Retail", label: "Retail" },
            ]}
          />

          <Dropdown
            label="Solution"
            className="text-sm !px-3"

            onSelect={(value) => setSelectedSolution(value)}
            icon={<Lightbulb className="w-4 h-4 lg:w-5 lg:h-5 text-gray-500" />}
            items={[
              { value: "", label: "All Solutions" },
              { value: "SD-WAN", label: "SD-WAN" },
              { value: "Cloud", label: "Cloud" },
            ]}
          />
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredData.map((c, idx) => (
            <CaseStudyCard key={idx} data={c} />
          ))}
        </div>
      </section>
      <CTASection />
    </main>
  );
}
