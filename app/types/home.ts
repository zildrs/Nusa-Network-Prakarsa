import type { BaseDataType, MetaDataType } from ".";

export type HomeDataType = BaseDataType & {
  // hero
  hero_title?: string;
  hero_subtitle?: string;
  // solution
  solution_title?: string;
  solution_description1?: string;
  solution_description2?: string;
};

export type HomeDataTypeReponseType = {
  locale: "id" | "en";
  meta?: MetaDataType;
  homes: HomeDataType[];
};
