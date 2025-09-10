import type { BaseDataType, MetaDataType } from ".";
import type { Banner } from "./blog";
import type { SolutionType } from "./solution";

export type ProjectType = BaseDataType & {
  banner: Banner;
  content: string | null;
  slug: string;
  solutions: SolutionType[];
  timeline: string;
  title: string;
  locale: "id" | "en";
};

export type ProjectsReponseType = {
  locale: "id" | "en";
  meta?: MetaDataType;
  projects: ProjectType[];
};
