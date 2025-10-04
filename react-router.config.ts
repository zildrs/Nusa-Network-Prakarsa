import type { Config } from "@react-router/dev/config";
import {
  buildBlogPaths,
  buildCaseStudyPaths,
  buildSolutionPaths,
} from "./app/lib/prerender-paths.server";

const staticRoutes: string[] = [
  "/",
  "/about",
  "/careers",
  "/partners",
  "/case-study",
  "/certifications",
  "/contact",
  "/policies",
  "/sitemap",
  "/id",
  "/id/tentang",
  "/id/karir",
  "/id/partner",
  "/id/studi-kasus",
  "/id/sertifikat",
  "/id/hubungi-kami",
  "/id/kebijakan-privasi",
  "/id/sitemap",
];

export default {
  ssr: false,
  async prerender() {
    const paths = new Set<string>(staticRoutes);
    const [blogPaths, caseStudyPaths] = await Promise.all([
      buildBlogPaths(),
      buildCaseStudyPaths(),
    ]);
    const solutionPaths = buildSolutionPaths();

    blogPaths.forEach((path) => paths.add(path));
    caseStudyPaths.forEach((path) => paths.add(path));
    solutionPaths.forEach((path) => paths.add(path));

    return Array.from(paths);
  },
} satisfies Config;
