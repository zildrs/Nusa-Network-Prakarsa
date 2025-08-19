import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("blog", "routes/blog.tsx"),
  route("case-study", "routes/case-study.tsx"),
  route("partner", "routes/partner.tsx"),
  route("certification", "routes/certification.tsx"),
  route("contact", "routes/contact.tsx"),
  route("about", "routes/about.tsx"),
] satisfies RouteConfig;
