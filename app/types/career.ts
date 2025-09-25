import type { BaseDataType, MetaDataType } from ".";

export type CareerType = BaseDataType & {
  position: string;
  location: string;
  type: "Full Time" | "Part Time" | "Intern" | "Freelance";
  arrangement: "Remote" | "Onsite" | "Hybrid";
  link: string;
  department?: DepartmentType[];
};

export type CareersReponseType = {
  locale: "id" | "en";
  meta?: MetaDataType;
  solutions: CareerType[];
};

export type DepartmentType = BaseDataType & {
  name: string;
  careers?: CareerType[];
};

export type DepartmentsReponseType = {
  locale: "id" | "en";
  meta?: MetaDataType;
  departments: DepartmentType[];
};
