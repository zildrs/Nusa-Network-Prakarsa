import type { BaseDataType, MetaDataType } from ".";

export type CareerType = BaseDataType & {
  position: string;
  location: string;
  type: "Full Time" | "Part Time" | "Intern" | "Freelance";
  arrangement: "Remote" | "Onsite" | "Hybrid";
  department?: DepartmentType[];
};

export type SolutionsReponseType = {
  locale: "id" | "en";
  meta?: MetaDataType;
  solutions: CareerType[];
};

export type DepartmentType = BaseDataType & {
  name: string;
  careers?: CareerType[];
};
