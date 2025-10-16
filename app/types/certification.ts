import type { BaseDataType, MetaDataType } from ".";
import type { Banner } from "./blog";

export type CertificationType = BaseDataType & {
  name: string;
  certification_img: Banner;
  year: string;
  link: string;
};

export type CertificationsReponseType = {
  locale: "id" | "en";
  meta?: MetaDataType;
  certifications: CertificationType[];
};
