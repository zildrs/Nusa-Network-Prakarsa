import { useState } from "react";
import type { Route } from "./+types/case-study";
import { Link, useParams } from "react-router";
import { ArrowRight } from "@carbon/icons-react";
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
];

export default function CaseStudyDetail() {
  const { slug } = useParams();

  return (
    <main>
      <section className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-10 grid gap-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_2024_Perum_Peruri.svg/2560px-Logo_2024_Perum_Peruri.svg.png"
            alt="Peruri Logo"
            className="h-8 lg:h-10 mb-4"
          />
          <h1 className="text-2xl lg:text-3xl max-w-3xl md:text-4xl font-bold leading-relaxed">
            Transforming Peruri Businesses with SD–WAN Technology
          </h1>
        </div>

        {/* Image */}
        <div className="rounded-lg lg:rounded-xl overflow-hidden mb-12">
          <img
            src="https://awsimages.detik.net.id/community/media/visual/2024/11/19/kantor-peruri-resmi-jadi-cagar-budaya-1_169.jpeg?w=700&q=90"
            alt="Peruri Building"
            className="w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* Left Content */}
          <div className="md:col-span-2 space-y-8 leading-relaxed lg:order-1 order-2">
            {/* Challenge */}
            <div>
              <h2 className="text-xl lg:text-2xl font-semibold mb-2">
                Challenge
              </h2>
              <p className="text-gray-600 text-base lg:text-lg">
                Peruri faced performance bottlenecks across its distributed
                branches, struggling with inconsistent network reliability, high
                latency, and limited visibility into traffic management.
              </p>
            </div>

            {/* Solution */}
            <div>
              <h2 className="text-xl lg:text-2xl font-semibold mb-2">
                Solution
              </h2>
              <p className="text-gray-600 text-base lg:text-lg">
                Nusa Network Prakarsa imp lemented a robust SD–WAN solution,
                enabling intelligent routing, centralized control, and seamless
                connectivity between branches and the data center—while
                prioritizing critical business applications.
              </p>
            </div>

            {/* Results */}
            <div>
              <h2 className="text-xl lg:text-2xl font-semibold mb-2">
                Results
              </h2>
              <p className="text-gray-600 text-base lg:text-lg">
                The implementation of SD– WAN brought immediate improvements.
                Network latency dropped by 50%, significantly enhancing
                communication between branches. Application performance improved
                by 30%, enabling smoother workflows and faster response times.
                With centralized visibility and control, the IT team can now
                proactively manage the network and ensure business continuity.
              </p>
            </div>
          </div>

          {/* Right Highlight Card */}
          <div
            className="rounded-2xl lg:order-2 order-1 grid gap-3 lg:gap-8 h-fit border border-gray-200 shadow-sm p-3 lg:p-6 text-gray-800 bg-cover bg-no-repeat bg-center max-w-sm"
            style={{ backgroundImage: "url('/bg-card-2.png')" }}
          >
            {/* Metric 1 */}
            <div className="mb-6">
              <p className="text-2xl lg:text-3xl font-semibold lg:font-medium flex items-center gap-2">
                50% <span className="text-red-500 text-xl">↓</span>
              </p>
              <p className="mt-2 text-gray-400 text-sm lg:text-base">
                Reduction in network latency
              </p>
            </div>

            {/* Metric 2 */}
            <div className="mb-6">
              <p className="text-2xl lg:text-3xl font-semibold lg:font-medium flex items-center gap-2">
                30% <span className="text-green-500 text-xl">↑</span>
              </p>
              <p className="mt-2 text-gray-400 text-sm lg:text-base">
                Improvement in application performance
              </p>
            </div>

            {/* CTA */}
            <div>
              <p className="text-base lg:text-xl font-semibold lg:font-medium mb-6">
                Ready to solve your challenges?
              </p>
              <button className="bg-blue-950 hover:bg-blue-900 text-white px-5 py-3 rounded-lg flex items-center gap-2 transition">
                Contact our experts <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="grid gap-4">
        <section className="bg-gray-50 py-12 lg:order-1 order-2">
          <div className="max-w-7xl mx-auto px-4">
            <p className="uppercase text-sm tracking-wide text-gray-900 mb-2">
              <span className="font-semibold">Case</span> Study
            </p>
            <h2 className="text-3xl lg:text-4xl font-semibold mb-8 max-w-md">
              Customer Success with Nusa Network Prakarsa
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {caseStudies.map((c, idx) => (
                <CaseStudyCard key={idx} data={c} />
              ))}
            </div>
          </div>
        </section>

        <div className="order-1 lg:order-2">
          <CTASection />
        </div>
      </div>
    </main>
  );
}
