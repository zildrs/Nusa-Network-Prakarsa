import { ArrowRight } from "@carbon/icons-react";
import { useOutletContext } from "react-router";
import { APP_BASE_URL, nameToSlug } from "~/lib/utils";
import type { ProjectType } from "~/types/project";

export function getCaseStudySlug(
  caseStudy: ProjectType,
  locale?: "id" | "en"
): string {
  const baseUrl = locale === "id" ? "/id/studi-kasus" : "/case-study";
  const baseSlug = `${nameToSlug(caseStudy.slug || "")}` || `${caseStudy.id}`;
  return locale === "id" ? `${baseUrl}/${baseSlug}` : `${baseUrl}/${baseSlug}`;
}

const CaseStudyCard = ({ data }: { data: ProjectType }) => {
  const { locale } = useOutletContext<{ locale: "id" | "en" }>();
  const slug = getCaseStudySlug(data, locale);
  return (
    <div className="rounded-lg overflow-hidden relative aspect-square group">
      <img
        src={`${APP_BASE_URL}/${data.banner?.url || ""}`}
        alt={data.title}
        className="w-full object-cover h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 gap-2 flex flex-col justify-end items-start">
        <a
          href={slug}
          className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0"
        >
          <img
            src={`${APP_BASE_URL}/${data.company_logo?.url || ""}`}
            alt={data.title}
            className="h-8 object-contain brightness-0 grayscale invert mb-4"
          />
          <p className="text-white font-medium text-xl">{data.title}</p>
          <div className="flex mt-4 items-center gap-2 opacity-0 group-hover:opacity-100 duration-500 transition-all">
            <p className="text-white font-medium">Learn more</p>
            <ArrowRight className="h-4 w-4 text-white" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default CaseStudyCard;
