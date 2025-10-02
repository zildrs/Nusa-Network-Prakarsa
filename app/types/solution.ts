import type { BaseDataType, MetaDataType } from ".";

export type SolutionType = BaseDataType & {
  name: string;
  slug: string;
  hero_title : string;
  hero_subtitle : string;
  about_title : string;
  about_description : string;
};

export type SolutionsReponseType = {
  locale: "id" | "en";
  meta?: MetaDataType;
  solutions: SolutionType[];
};
