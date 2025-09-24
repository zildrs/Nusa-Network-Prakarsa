import type { BaseDataType, MetaDataType } from ".";
import type { Banner } from "./blog";
import type { SolutionType } from "./solution";

export type ProjectType = BaseDataType & {
  banner: Banner;
  content: string | null;
  slug: string;
  solution: SolutionType;
  timeline: string;
  title: string;
  company_logo: Banner;
  industry: IndustryType;
  locale: "id" | "en";
};

export type ProjectsReponseType = {
  locale: "id" | "en";
  meta?: MetaDataType;
  projects: ProjectType[];
};

export type IndustryType = BaseDataType & {
  name: string;
  projects: ProjectType[];
};

export type IndustriesReponseType = {
  locale: "id" | "en";
  meta?: MetaDataType;
  industries: IndustryType[];
};
