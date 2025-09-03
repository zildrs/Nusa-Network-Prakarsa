import { useLoaderData } from "react-router";
import type { BlogData } from "~/types/blog";

export function useBlogData(): BlogData {
  const loaderData = useLoaderData() as BlogData;
  return loaderData;
}

