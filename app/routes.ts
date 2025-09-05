import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("blog", "routes/blog.tsx"),
  route("blog/:category", "routes/blog-category.tsx"),
  route("blog/read/:slug", "routes/blog-detail.tsx"),
  route("case-study", "routes/case-study.tsx"),
  route("case-study/:slug", "routes/case-study-detail.tsx"),
  route("solutions/:slug", "routes/solutions-detail.tsx"),
  route("partners", "routes/partners.tsx"),
  route("certifications", "routes/certifications.tsx"),
  route("contact", "routes/contact.tsx"),
  route("about", "routes/about.tsx"),
  route("privacy-policy", "routes/privacy-policy.tsx"),
  route("careers", "routes/careers.tsx"),
  route("sitemap", "routes/sitemap.tsx"),
  route("*", "routes/404.tsx"),

  // resource route
  route("resources/set-locale", "routes/resources.set-locale.tsx"),
] satisfies RouteConfig;
