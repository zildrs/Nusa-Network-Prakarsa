import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("id", "routes/home.tsx", { id: "home-id" }),

  // About
  route("about", "routes/about.tsx"),
  route("id/tentang", "routes/about.tsx", { id: "tentang" }),

  // Contact
  route("contact", "routes/contact.tsx"),
  route("contact-wa", "routes/contact-wa.tsx"),

  route("id/hubungi-kami", "routes/contact.tsx", { id: "hubungi-kami" }),

  // Careers
  route("careers", "routes/careers.tsx"),
  route("id/karir", "routes/careers.tsx", { id: "karir" }),

  // Blog
  route("blog", "routes/blog.tsx"),
  route("id/blog", "routes/blog.tsx", { id: "blog-id" }),
  route("blog/:category", "routes/blog-category.tsx"),
  route("id/blog/:category", "routes/blog-category.tsx", {
    id: "blog-category-id",
  }),
  route("blog/read/:slug/:id", "routes/blog-detail.tsx"),
  route("id/blog/read/:slug/:id", "routes/blog-detail.tsx", {
    id: "blog-detail-id",
  }),

  // Case Study
  route("case-study", "routes/case-study.tsx"),
  route("id/studi-kasus", "routes/case-study.tsx", { id: "studi-kasus" }),
  route("case-study/:slug", "routes/case-study-detail.tsx"),
  route("id/studi-kasus/:slug", "routes/case-study-detail.tsx", {
    id: "studi-kasus-detail",
  }),

  // Partners
  route("partners", "routes/partners.tsx"),
  route("id/partner", "routes/partners.tsx", { id: "partner" }),

  // Certifications
  route("certifications", "routes/certifications.tsx"),
  route("id/sertifikat", "routes/certifications.tsx", { id: "sertifikat" }),

  // Privacy Policy
  route("policies", "routes/privacy-policy.tsx"),
  route("id/kebijakan-privasi", "routes/privacy-policy.tsx", {
    id: "kebijakan-privasi",
  }),

  // Sitemap
  route("sitemap.xml", "routes/sitemap[.]xml.tsx"),
  route("sitemap", "routes/sitemap.tsx"),
  route("id/sitemap", "routes/sitemap.tsx", { id: "sitemap-id" }),

  // Solutions (auto-generate EN & ID)
  // routes.ts
  // Solutions (universal handler)
  route("solution/:slug", "routes/solutions-detail.tsx", {
    id: "solutions-detail-en",
  }),
  route("id/solusi/:slug", "routes/solutions-detail.tsx", {
    id: "solutions-detail-id",
  }),

  route("*", "routes/404.tsx"),
] satisfies RouteConfig;
