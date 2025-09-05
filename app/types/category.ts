import type { BaseDataType, MetaDataType } from ".";

export type CategoryType = BaseDataType & {
  name: string;
};

export type CategoriesReponseType = {
  locale: "id" | "en";
  meta?: MetaDataType;
  categories: CategoryType[];
};
