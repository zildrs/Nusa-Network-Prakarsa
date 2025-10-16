import type { BaseDataType, MetaDataType } from ".";
import type { ProjectType } from "./project";

export type SolutionType = BaseDataType & {
  name: string;
  slug: string;
  hero_title: string;
  hero_subtitle: string;
  about_title: string;
  about_description: string;
  projects?: ProjectType[];
};

export type SolutionsReponseType = {
  locale: "id" | "en";
  meta?: MetaDataType;
  solutions: SolutionType[];
};
