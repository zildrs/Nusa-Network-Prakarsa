import type { BaseDataType, MetaDataType } from ".";
import type { Banner } from "./blog";

export type TestimonyType = BaseDataType & {
  name: string;
  position: string;
  company_logo: Banner;
  description: string;
};

export type TestimonyReponseType = {
  locale: "id" | "en";
  meta?: MetaDataType;
  testimonies: TestimonyType[];
};
