import type { BaseDataType, MetaDataType } from ".";
import type { Banner } from "./blog";
import type { SolutionType } from "./solution";

export type PartnerType = BaseDataType & {
  name: string;
  description: string;
  company_logo: Banner;
  link: string;
  solutions?: SolutionType[];
};

export type PartnerReponseType = {
  locale: "id" | "en";
  meta?: MetaDataType;
  partners: PartnerType[];
};
