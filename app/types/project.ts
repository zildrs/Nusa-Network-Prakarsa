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
  result_description1: string;
  result_description2: string;
  result_percentage1: string;
  result_percentage2: string;
  result_type1: "DECREASE" | "INCREASE";
  result_type2: "DECREASE" | "INCREASE";
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
