import type { BaseDataType, MetaDataType } from ".";
import type { SolutionType } from "./solution";

export type PartnerType = BaseDataType & {
  name: string;
  description: string;
  company_logo: string;
  link: string;
  solutions?: SolutionType[];
};

export type SolutionsReponseType = {
  locale: "id" | "en";
  meta?: MetaDataType;
  solutions: PartnerType[];
};
