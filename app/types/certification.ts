import type { BaseDataType, MetaDataType } from ".";

export type CertificationType = BaseDataType & {
  name: string;
  certification_img: string;
  year: string;
  link: string;
};

export type CertificationsReponseType = {
  locale: "id" | "en";
  meta?: MetaDataType;
  certifications: CertificationType[];
};
