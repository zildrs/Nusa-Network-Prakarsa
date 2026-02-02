import type { LoaderFunctionArgs } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  const baseUrl = "https://nusanetwork.com";
  const currentDate = new Date().toISOString().split("T")[0];

  // Static routes with their priorities and change frequencies
  const routes = [
    // Home pages
    { path: "/", priority: "1.0", changefreq: "weekly", lastmod: currentDate },
    {
      path: "/id",
      priority: "1.0",
      changefreq: "weekly",
      lastmod: currentDate,
    },

    // About
    {
      path: "/about",
      priority: "0.8",
      changefreq: "monthly",
      lastmod: currentDate,
    },
    {
      path: "/id/tentang",
      priority: "0.8",
      changefreq: "monthly",
      lastmod: currentDate,
    },

    // Contact
    {
      path: "/contact",
      priority: "0.8",
      changefreq: "monthly",
      lastmod: currentDate,
    },
    {
      path: "/id/hubungi-kami",
      priority: "0.8",
      changefreq: "monthly",
      lastmod: currentDate,
    },

    // Careers
    {
      path: "/careers",
      priority: "0.8",
      changefreq: "weekly",
      lastmod: currentDate,
    },
    {
      path: "/id/karir",
      priority: "0.8",
      changefreq: "weekly",
      lastmod: currentDate,
    },

    // Blog
    {
      path: "/blog",
      priority: "0.9",
      changefreq: "daily",
      lastmod: currentDate,
    },
    {
      path: "/id/blog",
      priority: "0.9",
      changefreq: "daily",
      lastmod: currentDate,
    },

    // Case Study
    {
      path: "/case-study",
      priority: "0.8",
      changefreq: "weekly",
      lastmod: currentDate,
    },
    {
      path: "/id/studi-kasus",
      priority: "0.8",
      changefreq: "weekly",
      lastmod: currentDate,
    },

    // Partners
    {
      path: "/partners",
      priority: "0.7",
      changefreq: "monthly",
      lastmod: currentDate,
    },
    {
      path: "/id/partner",
      priority: "0.7",
      changefreq: "monthly",
      lastmod: currentDate,
    },

    // Certifications
    {
      path: "/certifications",
      priority: "0.7",
      changefreq: "monthly",
      lastmod: currentDate,
    },
    {
      path: "/id/sertifikat",
      priority: "0.7",
      changefreq: "monthly",
      lastmod: currentDate,
    },

    // Privacy Policy
    {
      path: "/policies",
      priority: "0.5",
      changefreq: "yearly",
      lastmod: currentDate,
    },
    {
      path: "/id/kebijakan-privasi",
      priority: "0.5",
      changefreq: "yearly",
      lastmod: currentDate,
    },

    // Sitemap
    {
      path: "/sitemap",
      priority: "0.5",
      changefreq: "monthly",
      lastmod: currentDate,
    },
    {
      path: "/id/sitemap",
      priority: "0.5",
      changefreq: "monthly",
      lastmod: currentDate,
    },

    // Solutions - EN
    {
      path: "/solution/security-infrastructure",
      priority: "0.9",
      changefreq: "monthly",
      lastmod: currentDate,
    },
    {
      path: "/solution/managed-services",
      priority: "0.9",
      changefreq: "monthly",
      lastmod: currentDate,
    },
    {
      path: "/solution/internet-of-things",
      priority: "0.9",
      changefreq: "monthly",
      lastmod: currentDate,
    },
    {
      path: "/solution/data-center",
      priority: "0.9",
      changefreq: "monthly",
      lastmod: currentDate,
    },
    {
      path: "/solution/network-infrastructure",
      priority: "0.9",
      changefreq: "monthly",
      lastmod: currentDate,
    },

    // Solutions - ID
    {
      path: "/id/solusi/security-infrastructure",
      priority: "0.9",
      changefreq: "monthly",
      lastmod: currentDate,
    },
    {
      path: "/id/solusi/managed-services",
      priority: "0.9",
      changefreq: "monthly",
      lastmod: currentDate,
    },
    {
      path: "/id/solusi/internet-of-things",
      priority: "0.9",
      changefreq: "monthly",
      lastmod: currentDate,
    },
    {
      path: "/id/solusi/data-center",
      priority: "0.9",
      changefreq: "monthly",
      lastmod: currentDate,
    },
    {
      path: "/id/solusi/network-infrastructure",
      priority: "0.9",
      changefreq: "monthly",
      lastmod: currentDate,
    },
  ];

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
