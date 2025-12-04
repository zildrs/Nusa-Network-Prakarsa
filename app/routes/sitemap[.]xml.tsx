import type { Route } from "./+types/sitemap[.]xml";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;

  const staticRoutes = [
    // Home pages - priority 1.0, changefreq daily
    { path: "/", priority: 1.0, changefreq: "daily" },
    { path: "/id", priority: 1.0, changefreq: "daily" },

    // About pages - priority 0.8, changefreq monthly
    { path: "/about", priority: 0.8, changefreq: "monthly" },
    { path: "/id/tentang", priority: 0.8, changefreq: "monthly" },

    // Contact pages - priority 0.8, changefreq monthly
    { path: "/contact", priority: 0.8, changefreq: "monthly" },
    { path: "/id/hubungi-kami", priority: 0.8, changefreq: "monthly" },

    // Careers pages - priority 0.7, changefreq weekly
    { path: "/careers", priority: 0.7, changefreq: "weekly" },
    { path: "/id/karir", priority: 0.7, changefreq: "weekly" },

    // Blog pages - priority 0.9, changefreq daily
    { path: "/blog", priority: 0.9, changefreq: "daily" },
    { path: "/id/blog", priority: 0.9, changefreq: "daily" },

    // Case study pages - priority 0.8, changefreq weekly
    { path: "/case-study", priority: 0.8, changefreq: "weekly" },
    { path: "/id/studi-kasus", priority: 0.8, changefreq: "weekly" },

    // Partners pages - priority 0.7, changefreq monthly
    { path: "/partners", priority: 0.7, changefreq: "monthly" },
    { path: "/id/partner", priority: 0.7, changefreq: "monthly" },

    // Certifications pages - priority 0.6, changefreq monthly
    { path: "/certifications", priority: 0.6, changefreq: "monthly" },
    { path: "/id/sertifikat", priority: 0.6, changefreq: "monthly" },

    // Privacy policy pages - priority 0.5, changefreq yearly
    { path: "/policies", priority: 0.5, changefreq: "yearly" },
    { path: "/id/kebijakan-privasi", priority: 0.5, changefreq: "yearly" },
  ];

  // TODO: Fetch dynamic blog posts from API/CMS
  // Example:
  // const blogPosts = await fetchBlogPosts();
  // blogPosts.forEach(post => {
  //   staticRoutes.push({
  //     path: `/blog/read/${post.slug}/${post.id}`,
  //     priority: 0.7,
  //     changefreq: 'monthly',
  //     lastmod: post.updatedAt
  //   });
  //   staticRoutes.push({
  //     path: `/id/blog/read/${post.slug}/${post.id}`,
  //     priority: 0.7,
  //     changefreq: 'monthly',
  //     lastmod: post.updatedAt
  //   });
  // });

  // TODO: Fetch dynamic case studies from API/CMS
  // Example:
  // const caseStudies = await fetchCaseStudies();
  // caseStudies.forEach(study => {
  //   staticRoutes.push({
  //     path: `/case-study/${study.slug}`,
  //     priority: 0.7,
  //     changefreq: 'monthly',
  //     lastmod: study.updatedAt
  //   });
  //   staticRoutes.push({
  //     path: `/id/studi-kasus/${study.slug}`,
  //     priority: 0.7,
  //     changefreq: 'monthly',
  //     lastmod: study.updatedAt
  //   });
  // });

  // TODO: Fetch dynamic solutions from API/CMS
  // Example:
  // const solutions = await fetchSolutions();
  // solutions.forEach(solution => {
  //   staticRoutes.push({
  //     path: `/solution/${solution.slug}`,
  //     priority: 0.8,
  //     changefreq: 'weekly',
  //     lastmod: solution.updatedAt
  //   });
  //   staticRoutes.push({
  //     path: `/id/solusi/${solution.slug}`,
  //     priority: 0.8,
  //     changefreq: 'weekly',
  //     lastmod: solution.updatedAt
  //   });
  // });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <priority>${route.priority}</priority>
    <changefreq>${route.changefreq}</changefreq>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
