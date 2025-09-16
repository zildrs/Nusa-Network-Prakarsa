import type { Route } from "./+types/contact";

import { ArrowRight } from "@carbon/icons-react";
import { useOutletContext } from "react-router";
import { createMetaFunction, seoData } from "~/lib/meta";

export function meta({ request }: Route.MetaArgs) {
  const url = new URL(request.url);
  const locale = url.pathname.startsWith("/en") ? "en" : "id";
  const seo = seoData.careers[locale];

  return createMetaFunction({
    title: seo.title,
    description: seo.description,
    canonical: url.origin + url.pathname,
    hreflang: [
      { href: `${url.origin}/en/careers`, hreflang: "en" },
      { href: `${url.origin}/id/careers`, hreflang: "id" },
    ],
  })({ request });
}

// create const for engineering, operations, and growth section with few open position
const openRoles = {
  engineering: [
    {
      title: "Software Engineer",
      desc: "Design, develop, test, and maintain software applications in accordance with industry best practices.",
      link: "https://www.linkedin.com/jobs/view/software-engineer-at-nusa-network-prakarsa-3293414344/",
      location: "Jakarta",
      type: "Full-time",
      workType: "Remote",
    },
    {
      title: "DevOps Engineer",
      desc: "Design, develop, test, and maintain software applications in accordance with industry best practices.",
      link: "https://www.linkedin.com/jobs/view/devops-engineer-at-nusa-network-prakarsa-3293414354/",
      location: "Jakarta",
      type: "Full-time",
      workType: "Remote",
    },
    {
      title: "Quality Assurance Engineer",
      desc: "Design, develop, test, and maintain software applications in accordance with industry best practices.",
      link: "https://www.linkedin.com/jobs/view/quality-assurance-engineer-at-nusa-network-prakarsa-3293414364/",
      location: "Jakarta",
      type: "Full-time",
      workType: "Remote",
    },
  ],
  operations: [
    {
      title: "Operations Coordinator",
      desc: "Coordinate and support the day-to-day activities of the operations team.",
      link: "https://www.linkedin.com/jobs/view/operations-coordinator-at-nusa-network-prakarsa-3293414374/",
      location: "Jakarta",
      type: "Full-time",
      workType: "On-site",
    },
    {
      title: "Customer Support Specialist",
      desc: "Respond to customer inquiries and provide customer support related to our products and services.",
      link: "https://www.linkedin.com/jobs/view/customer-support-specialist-at-nusa-network-prakarsa-3293414384/",
      location: "Jakarta",
      type: "Full-time",
      workType: "On-site",
    },
    {
      title: "Account Manager",
      desc: "Manage customer relationships and develop new business opportunities.",
      link: "https://www.linkedin.com/jobs/view/account-manager-at-nusa-network-prakarsa-3293414394/",
      location: "Jakarta",
      type: "Full-time",
      workType: "On-site",
    },
  ],
  growth: [
    {
      title: "Digital Marketing Specialist",
      desc: "Develop and execute digital marketing campaigns to drive business growth.",
      link: "https://www.linkedin.com/jobs/view/digital-marketing-specialist-at-nusa-network-prakarsa-3293414404/",
      location: "Jakarta",
      type: "Full-time",
      workType: "Remote",
    },
    {
      title: "Business Development Representative",
      desc: "Identify and pursue new business opportunities to drive revenue growth.",
      link: "https://www.linkedin.com/jobs/view/business-development-representative-at-nusa-network-prakarsa-3293414414/",
      location: "Jakarta",
      type: "Full-time",
      workType: "On-site",
    },
    {
      title: "Content Marketing Specialist",
      desc: "Develop and execute content marketing campaigns to drive business growth.",
      link: "https://www.linkedin.com/jobs/view/content-marketing-specialist-at-nusa-network-prakarsa-3293414424/",
      location: "Jakarta",
      type: "Full-time",
      workType: "Remote",
    },
  ],
};

export default function Careers() {
  const { t } = useOutletContext<{ t: any; locale: "id" | "en" }>();
  return (
    <main className="w-full">
      <div className="bg-white text-gray-900">
        {/* Section 1 - Open Roles */}
        <section className="w-full bg-white py-20">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-center justify-between px-6 lg:px-12">
            {/* Text Section */}
            <div className="max-w-lg order-2 lg:order-1">
              <p className="tracking-widest text-gray-800 uppercase">
                {t("career.open")}{" "}
                <span className="font-semibold">{t("career.roles")}</span>
              </p>
              <h2 className="mt-4 text-4xl lg:text-5xl font-medium lg:font-semibold leading-tight text-gray-900">
                {t("career.subtitle")}
              </h2>
            </div>

            {/* Image Section */}
            <div className="relative flex gap-6 order-1 lg:order-2">
              {/* Left Image */}
              <img
                src="/hero-career.png"
                alt="hero-career"
                className=" h-auto"
              />
            </div>
          </div>
        </section>

        {/* Divider */}

        {/* Section 2 - Engineering Roles */}
        <section className="py-12">
          {Object.values(openRoles).map((jobs, idx) => (
            <div className="max-w-7xl mx-auto px-6" key={idx}>
              <h2 className="text-lg font-normal mb-8 uppercase">
                {Object.keys(openRoles)[idx]}
              </h2>
              {jobs.map((job, jdx) => (
                <div
                  key={jdx}
                  className="border border-gray-200 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between mb-6"
                >
                  <div>
                    <h3 className="text-xl font-medium mb-2">{job.title}</h3>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-600 text-sm">
                        {job.location}
                      </span>
                      <span className="text-gray-300 text-lg mx-2">•</span>
                      <span className="text-gray-600 text-sm">{job.type}</span>
                      <span className="text-gray-300 text-lg mx-2">•</span>
                      <span className="text-gray-600 text-sm">
                        {job.workType}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <a
                      href={job.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary transition"
                    >
                      {t("career.apply")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
