import type { BaseDataType, MetaDataType } from ".";

export type SolutionType = BaseDataType & {
  name: string;
  slug: string;
};

export type SolutionsReponseType = {
  locale: "id" | "en";
  meta?: MetaDataType;
  solutions: SolutionType[];
};
