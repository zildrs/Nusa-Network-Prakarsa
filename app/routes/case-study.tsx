import { useMemo, useState } from "react";
import type { Route } from "./+types/case-study";
import { Link, useLoaderData, useOutletContext } from "react-router";
import { Light, Building } from "@carbon/icons-react";
import CTASection from "~/components/cta";
import CaseStudyCard from "~/components/case-study-card";
import { Dropdown } from "~/components/dropdown";
import {
  fetchIndustriesData,
  fetchProjectsData,
  fetchSolutionsData,
} from "~/lib/api.server";
import { createMetaFunction, seoData } from "~/lib/meta";

export const meta = createMetaFunction(seoData["case-study"]);

export async function loader({ request }: Route.LoaderArgs) {
  const [{ projects }, { solutions }, { industries }] = await Promise.all([
    fetchProjectsData(request),
    fetchSolutionsData(request),
    fetchIndustriesData(request),
  ]);

  return { projects, solutions, industries };
}

export default function CaseStudy() {
  const { projects, solutions, industries } = useLoaderData<typeof loader>();
  const { t, locale } = useOutletContext<{ t: any; locale: "id" | "en" }>();
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");
  const [selectedSolution, setSelectedSolution] = useState<string>("");

  const filteredDataMemo = useMemo(
    () =>
      projects.filter((item) => {
        console.log(item.industry?.id.toString(), selectedIndustry);
        return (
          (selectedIndustry === "" ||
            item.industry?.id?.toString() === selectedIndustry) &&
          (selectedSolution === "" ||
            item.solution?.id?.toString() === selectedSolution)
        );
      }),
    [projects, selectedIndustry, selectedSolution]
  );

  return (
    <main>
      <section className="bg-primary relative text-white pt-12 py-18 lg:py-12 lg:min-h-[350px] overflow-hidden">
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
            <span className="font-semibold">
              {t("caseStudy.hero.label.case")}
            </span>{" "}
            {t("caseStudy.hero.label.study")}
          </p>
          <div className="flex justify-between items-center">
            <h2
              className={`text-4xl lg:text-5xl lg:font-semibold leading-snug mb-10 ${locale === "id" ? "max-w-3xl" : "max-w-xl"}`}
            >
              {t("caseStudy.hero.title")}
            </h2>
          </div>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto p-6">
        {/* Filter */}
        <div className="flex gap-4 mb-6">
          {/* Industry Filter */}
          <Dropdown
            label={t("caseStudy.filters.industry")}
            onSelect={(value) => setSelectedIndustry(value)}
            className="text-sm !px-3"
            icon={<Building className="w-4 h-4 lg:w-5 lg:h-5 text-gray-500" />}
            items={[
              {
                value: "",
                label: t("caseStudy.filters.allIndustries"),
              },
              ...industries.map((industry) => ({
                value: industry.id.toString(),
                label: industry.name,
              })),
            ]}
          />

          <Dropdown
            label={t("caseStudy.filters.solution")}
            className="text-sm !px-3"
            onSelect={(value) => setSelectedSolution(value)}
            icon={<Light className="w-4 h-4 lg:w-5 lg:h-5 text-gray-500" />}
            items={[
              {
                value: "",
                label: t("caseStudy.filters.allSolutions"),
              },
              ...solutions.map((solution) => ({
                value: solution.id.toString(),
                label: solution.name,
              })),
            ]}
          />
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredDataMemo.map((c, idx) => (
            <CaseStudyCard key={idx} data={c} />
          ))}
        </div>
      </section>
      <CTASection
        title={t("caseStudy.cta.title")}
        linkText={t("caseStudy.cta.button")}
      />
    </main>
  );
}
