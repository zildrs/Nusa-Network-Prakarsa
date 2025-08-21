import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("blog", "routes/blog.tsx"),
  route("blog/:slug", "routes/blog-detail.tsx"),
  route("case-study", "routes/case-study.tsx"),
  route("case-study/:slug", "routes/case-study-detail.tsx"),
  route("solutions/:slug", "routes/solutions-detail.tsx"),
  route("partner", "routes/partner.tsx"),
  route("certification", "routes/certification.tsx"),
  route("contact", "routes/contact.tsx"),
  route("about", "routes/about.tsx"),
] satisfies RouteConfig;
