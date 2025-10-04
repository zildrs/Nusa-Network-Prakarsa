import type { Route } from "./+types/contact";

import { ArrowRight } from "@carbon/icons-react";
import { useLoaderData, useOutletContext } from "react-router";
import { fetchDepartmentsCollection } from "~/lib/api.build";
import { createMetaFunction, seoData } from "~/lib/meta";
import { inferLocaleFromUrl } from "~/lib/locale-utils";
import type { Locale } from "~/i18n";

export const meta = createMetaFunction(seoData.careers);

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const locale = inferLocaleFromUrl(url);
  const { departments } = await fetchDepartmentsCollection({ locale });

  return { departments, locale };
}

export default function Careers() {
  const { t } = useOutletContext<{ t: any; locale: Locale }>();

  const { departments } = useLoaderData<typeof loader>();
  return (
    <main className="w-full">
      <div className="bg-white text-gray-900">
        {/* Section 1 - Open Roles */}
        <section className="w-full bg-white py-20">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-center justify-between px-6 lg:px-12">
            {/* Text Section */}
            <div className="max-w-lg order-2 lg:order-1">
              <p data-aos="fade-up" className="tracking-widest text-gray-800 uppercase">
                {t("career.open")}{" "}
                <span className="font-semibold">{t("career.roles")}</span>
              </p>
              <h2 data-aos="fade-up" className="mt-4 text-4xl lg:text-5xl font-medium lg:font-semibold leading-tight text-gray-900">
                {t("career.subtitle")}
              </h2>
            </div>

            {/* Image Section */}
            <div className="relative flex gap-6 order-1 lg:order-2">
              {/* Left Image */}
              <img
                data-aos="fade-up"
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
          {departments.map((department, idx) => (
            <div className="max-w-7xl mx-auto px-6" key={idx}>
              <h2 data-aos="fade-up" className="text-lg font-normal mb-8 uppercase">
                {department.name}
              </h2>
              {department.careers?.map((job, jdx) => (
                <div
                  key={jdx}
                  data-aos="fade-up" data-aos-delay={200 * (jdx + 1)}
                  className="border border-gray-200 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between mb-6"
                >
                  <div>
                    <h3 className="text-xl font-medium mb-2">{job.position}</h3>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-600 text-sm">
                        {job.location}
                      </span>
                      <span className="text-gray-300 text-lg mx-2">•</span>
                      <span className="text-gray-600 text-sm">{job.type}</span>
                      <span className="text-gray-300 text-lg mx-2">•</span>
                      <span className="text-gray-600 text-sm">
                        {job.arrangement}
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
