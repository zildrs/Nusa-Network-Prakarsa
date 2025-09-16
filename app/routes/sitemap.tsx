import type { Route } from "./+types/home";
import { createMetaFunction, seoData } from "~/lib/meta";

export const meta = createMetaFunction(seoData.sitemap);
export default function About() {
  return (
    <main>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <section className="bg-primary py-12 h-[252px]">
          <div className="container mx-auto px-6 max-w-7xl w-full flex flex-col justify-center h-full">
            <h1 className="text-white text-[36px] lg:text-[48px] font-semibold my-auto">
              Sitemap
            </h1>
          </div>
        </section>

        {/* Content */}
        <section className="container mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 max-w-7xl">
          {/* Solutions */}
          <div>
            <h2 className="text-[24px] lg:text-[36px] font-semibold text-primary mb-4">
              Solutions
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                <a
                  href="/solutions/security-infrastructure"
                  className="hover:underline"
                >
                  Security Infrastructure
                </a>
              </li>
              <li>
                <a
                  href="/solutions/managed-services"
                  className="hover:underline"
                >
                  Managed Services
                </a>
              </li>
              <li>
                <a
                  href="/solutions/internet-of-things"
                  className="hover:underline"
                >
                  IoT Solution
                </a>
              </li>
              <li>
                <a href="/solutions/data-center" className="hover:underline">
                  Data Center Infrastructure
                </a>
              </li>
              <li>
                <a
                  href="/solutions/network-infrastructure"
                  className="hover:underline"
                >
                  Network Infrastructure
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h2 className="text-[24px] lg:text-[36px] font-semibold text-primary mb-4">
              Company
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                <a href="/about" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/case-study" className="hover:underline">
                  Case Study
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:underline">
                  Blog
                </a>
              </li>
              <li>
                <a href="/careers" className="hover:underline">
                  Career
                </a>
              </li>
              <li>
                <a href="/partners" className="hover:underline">
                  Partners
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h2 className="text-[24px] lg:text-[36px] font-semibold text-primary mb-4">
              Resources
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                <a href="/privacy-policy" className="hover:underline">
                  Privacy & Terms
                </a>
              </li>
              <li>
                <a href="/case-study" className="hover:underline">
                  Case Study
                </a>
              </li>
              <li>
                <a href="/certifications" className="hover:underline">
                  Certifications
                </a>
              </li>
              <li>
                <a href="/careers" className="hover:underline">
                  Career
                </a>
              </li>
              <li>
                <a href="/partners" className="hover:underline">
                  Partners
                </a>
              </li>
              <li>
                <a
                  href="https://ticket.nusanetwork.com/helpdesk"
                  className="hover:underline"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
