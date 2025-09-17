// seo-utils.ts
import type { MetaFunction } from "react-router";
import {
  createBreadcrumbSchema,
  createOrganizationSchema,
  createServiceSchema,
} from "./seo";

export interface SEOData {
  title: string;
  description: string;
  canonical?: string;
  hrefLang?: Array<{ href: string; hrefLang: string }>;
  schema?: any;
}

// sebuah tipe sederhana untuk "location-like" dari react-router
type RouterLocationLike = { pathname: string; search?: string };

// sumber bisa Request (SSR) atau location-like (CSR) atau url string
type UrlSource = Request | RouterLocationLike | string;

/**
 * Dapatkan full canonical URL dari Request | location-like | string
 */
export function getCanonicalUrl(
  source: UrlSource,
  originFallback?: string
): string {
  const origin =
    originFallback ??
    (typeof window !== "undefined"
      ? window.location.origin
      : "https://nusanetwork.com");

  if (typeof source === "string") {
    const u = new URL(source, origin);
    return u.toString();
  }

  // Request (memiliki property `url`)
  if (
    "url" in (source as Request) &&
    typeof (source as Request).url === "string"
  ) {
    const u = new URL((source as Request).url);
    return u.toString();
  }

  // location-like
  const loc = source as RouterLocationLike;
  const u = new URL((loc.pathname ?? "/") + (loc.search ?? ""), origin);
  return u.toString();
}

/**
 * Generate hrefLang URLs berdasarkan sumber yang diberikan.
 * Selalu menghasilkan link dengan query param ?locale=en dan ?locale=id
 */
export function gethrefLangUrls(
  source: UrlSource,
  originFallback?: string
): Array<{ href: string; hrefLang: string }> {
  // Jika source adalah Request, ambil origin + pathname dari request.url
  let basePath: string;
  const origin =
    originFallback ??
    (typeof window !== "undefined"
      ? window.location.origin
      : "https://nusanetwork.com");

  if (typeof source === "string") {
    const u = new URL(source, origin);
    basePath = u.origin + u.pathname;
  } else if (
    "url" in (source as Request) &&
    typeof (source as Request).url === "string"
  ) {
    const u = new URL((source as Request).url);
    basePath = u.origin + u.pathname;
  } else {
    const loc = source as RouterLocationLike;
    basePath = origin + (loc.pathname ?? "/");
  }

  return [
    { href: `${basePath}?locale=en`, hrefLang: "en" },
    { href: `${basePath}?locale=id`, hrefLang: "id" },
  ];
}

/**
 * createMetaFunction yang kompatibel SSR (request) & CSR (location)
 *
 * seoData bisa berupa:
 *  - SEOData (single)
 *  - { en: SEOData, id: SEOData } (localized)
 */
type LocalizedSEO = { en: SEOData; id: SEOData } | SEOData;

export function createMetaFunction(seoData: LocalizedSEO): MetaFunction {
  const metaFn: MetaFunction = (args) => {
    // args bisa berisi request (SSR) atau location (CSR). Kita ambil yang ada.
    const source: UrlSource =
      "request" in args && args.request
        ? args.request
        : "location" in args && args.location
          ? (args as any).location
          : "/";

    // origin fallback
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://nusanetwork.com";

    // make URL object for parsing query
    let urlObj: URL;
    if (typeof source === "string") {
      urlObj = new URL(source, origin);
    } else if (
      "url" in (source as Request) &&
      typeof (source as Request).url === "string"
    ) {
      urlObj = new URL((source as Request).url);
    } else {
      const loc = source as RouterLocationLike;
      urlObj = new URL((loc.pathname ?? "/") + (loc.search ?? ""), origin);
    }

    const searchParams = new URLSearchParams(urlObj.search);
    const locale = searchParams.get("locale") === "id" ? "id" : "en";

    // pilih seo berdasarkan locale bila seoData bersifat localized
    const seo: SEOData =
      "en" in (seoData as any) && "id" in (seoData as any)
        ? (seoData as any)[locale]
        : (seoData as SEOData);

    const canonical = getCanonicalUrl(source, origin);
    const hrefLangUrls = gethrefLangUrls(source, origin);

    const tags: Record<string, any>[] = [
      { title: seo.title },
      { name: "description", content: seo.description },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: seo.title },
      { property: "og:description", content: seo.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical },
      { property: "og:site_name", content: "Nusa Network Prakarsa" },
      {
        property: "og:image",
        content: "https://nnp-landing.vercel.app/opengraph-image.png",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: seo.title },
      { name: "twitter:description", content: seo.description },
      {
        name: "twitter:image",
        content: "https://nnp-landing.vercel.app/opengraph-image.png",
      },
      { rel: "canonical", href: canonical },
      ...hrefLangUrls.map(({ href, hrefLang }) => ({
        rel: "alternate",
        href,
        hrefLang,
      })),
    ];

    if (seo.schema) {
      tags.push({
        tagName: "script",
        type: "application/ld+json",
        children: JSON.stringify(createOrganizationSchema()),
      });
    }

    if (seo.canonical) {
      tags.push({ rel: "canonical", href: seo.canonical });
    }

    tags.push({
      tagName: "script",
      type: "application/ld+json",
      children: JSON.stringify(
        createBreadcrumbSchema([
          { name: "Home", url: "https://nusanetwork.com/" },
          { name: "About", url: "https://nusanetwork.com/about" },
          { name: "Blog", url: "https://nusanetwork.com/blog" },
          { name: "Case Study", url: "https://nusanetwork.com/case-study" },
          { name: "Solutions", url: "https://nusanetwork.com/solutions" },
          { name: "Partners", url: "https://nusanetwork.com/partners" },
          {
            name: "Certifications",
            url: "https://nusanetwork.com/certifications",
          },
          { name: "Contact", url: "https://nusanetwork.com/contact" },
          { name: "Careers", url: "https://nusanetwork.com/careers" },
          { name: "Sitemap", url: "https://nusanetwork.com/sitemap" },
        ])
      ),
    });

    return tags;
  };

  return metaFn;
}
// SEO data untuk setiap halaman
export const seoData = {
  home: {
    en: {
      title: "Nusa Network Prakasa | System Integrator Company",
      description:
        "Nusa Network is a trusted System Integrator in Indonesia providing end to end IT solutions covering network infrastructure cybersecurity and data center services",
    },
    id: {
      title: "Nusa Network Prakasa | Perusahaan System Integrator",
      description:
        "Nusa Network adalah system integrator terpercaya di Indonesia yang menyediakan solusi IT menyeluruh mulai dari infrastruktur jaringan, keamanan siber, hingga layanan data center",
    },
  },
  "security-infrastructure": {
    en: {
      title: "Security Infrastructure | Nusa Network Prakasa",
      description:
        "Nusa Network provides reliable Security Infrastructure solutions to protect businesses with advanced network systems, cybersecurity, and data center integration",
    },
    id: {
      title: "Security Infrastructure | Nusa Network Prakasa",
      description:
        "Nusa Network menyediakan solusi Security Infrastructure yang andal untuk melindungi bisnis melalui sistem jaringan canggih, keamanan siber, dan integrasi data center.",
    },
  },
  "managed-services": {
    en: {
      title: "Managed Services | Nusa Network Prakasa",
      description:
        "Nusa Network Managed Services ensures smooth IT operations with cost efficient solutions covering network infrastructure, security, and data center",
    },
    id: {
      title: "Managed Services | Nusa Network Prakasa",
      description:
        "Nusa Network Managed Services membantu menjaga kelancaran operasional IT dengan solusi hemat biaya yang mencakup network infrastructure, security, and data center",
    },
  },
  "internet-of-things": {
    en: {
      title: "IoT Solution | Nusa Network Prakasa",
      description:
        "Nusa Network IoT Solution introduces Nada a powerful tool for ecosystem monitoring providing real time data visualization and smart system integration",
    },
    id: {
      title: "IoT Solution | Nusa Network Prakasa",
      description:
        "Nusa Network IoT Solution memperkenalkan Nada, sebuah alat canggih untuk pemantauan ekosistem yang menyediakan visualisasi data real time dan integrasi sistem pintar",
    },
  },
  "data-center": {
    en: {
      title: "Data Center Infrastructure | Nusa Network Prakasa",
      description:
        "Nusa Network provides reliable Data Center Infrastructure solutions to support secure, scalable, and efficient IT operations for modern businesses",
    },
    id: {
      title: "Data Center Infrastructure | Nusa Network Prakasa",
      description:
        "Nusa Network menyediakan solusi Data Center Infrastructure yang andal untuk mendukung operasional IT yang aman, skalabel, dan efisien untuk bisnis Anda",
    },
  },
  "network-infrastructure": {
    en: {
      title: "Network Infrastructure | Nusa Network Prakasa",
      description:
        "Nusa Network provides secure and scalable Network Infrastructure solutions to ensure reliable connectivity and support business digital transformation",
    },
    id: {
      title: "Network Infrastructure | Nusa Network Prakasa",
      description:
        "Nusa Network menawarkan solusi Network Infrastructure yang aman dan skalabel untuk menjamin konektivitas andal serta menunjang kebutuhan digitalisasi perusahaan",
    },
  },
  about: {
    en: {
      title: "About Us | Nusa Network Prakasa",
      description:
        "Learn more about Nusa Network a trusted System Integrator in Indonesia dedicated to delivering innovative IT solutions and driving digital excellence",
    },
    id: {
      title: "Tentang Kami | Nusa Network Prakasa",
      description:
        "Kenali lebih jauh Nusa Network, system integrator terpercaya di Indonesia yang berkomitmen menghadirkan solusi IT inovatif dan mendukung transformasi digital",
    },
  },
  "case-study": {
    en: {
      title: "Case Study | Nusa Network Prakasa",
      description:
        "Read our case studies to see how Nusa Network empowers clients with innovative IT services that drive growth and efficiency",
    },
    id: {
      title: "Studi Kasus | Nusa Network Prakasa",
      description:
        "Lihat studi kasus kami untuk mengetahui bagaimana Nusa Network membantu klien dengan layanan TI inovatif yang mendorong pertumbuhan dan efisiensi",
    },
  },
  blog: {
    en: {
      title: "IT News | Nusa Network Prakasa",
      description:
        "Get the latest IT news and updates from Nusa Network. Stay informed on technology trends and industry insights.",
    },
    id: {
      title: "Berita IT | Nusa Network Prakasa",
      description:
        "Dapatkan berita IT terbaru dan update dari Nusa Network. Tetap terinformasi tentang tren teknologi dan wawasan industri",
    },
  },
  careers: {
    en: {
      title: "Careers | Nusa Network Prakasa",
      description:
        "Join Nusa Network and be part of a dynamic team driving IT innovation. Explore career opportunities and grow your professional journey with us",
    },
    id: {
      title: "Karir | Nusa Network Prakasa",
      description:
        "Bergabunglah dengan Nusa Network dan menjadi bagian dari tim dinamis yang mendorong inovasi IT. Temukan peluang karier dan kembangkan perjalanan profesional Anda bersama kami",
    },
  },
  partners: {
    en: {
      title: "Partners | Nusa Network Prakasa",
      description:
        "Discover Nusa Network's partners and how our collaborations with leading technology providers deliver innovative IT solutions for businesses across Indonesia",
    },
    id: {
      title: "Patner | Nusa Network Prakasa",
      description:
        "Temukan mitra Nusa Network dan bagaimana kolaborasi kami dengan penyedia teknologi terkemuka menghadirkan solusi IT inovatif untuk bisnis di seluruh Indonesia",
    },
  },
  "privacy-policy": {
    en: {
      title: "Privacy & Terms | Nusa Network Prakasa",
      description:
        "Read Nusa Network's Privacy Policy and Terms of Service to understand how we protect your data and outline the rules for using our services",
    },
    id: {
      title: "Kebijakan Privasi | Nusa Network Prakasa",
      description:
        "Baca Kebijakan Privasi dan Syarat Layanan Nusa Network untuk memahami bagaimana kami melindungi data Anda dan mengatur penggunaan layanan kami",
    },
  },
  sitemap: {
    en: {
      title: "Sitemap | Nusa Network Prakasa",
      description: "",
    },
    id: {
      title: "Sitemap | Nusa Network Prakasa",
      description: "",
    },
  },
  certifications: {
    en: {
      title: "Certifications | Nusa Network Prakasa",
      description:
        "Explore Nusa Network awards, showcasing our commitment to excellence and trusted IT solutions for businesses",
    },
    id: {
      title: "Sertifikat | Nusa Network Prakasa",
      description:
        "Jelajahi penghargaan Nusa Network yang menampilkan komitmen kami terhadap keunggulan dan solusi IT terpercaya untuk bisnis",
    },
  },
  contact: {
    en: {
      title: "Contact Us | Nusa Network Prakasa",
      description:
        "Have questions or need support? Contact Nusa Network and let our team assist your IT needs",
    },
    id: {
      title: "Hubungi Kami | Nusa Network Prakasa",
      description:
        "Ada pertanyaan atau butuh bantuan? Hubungi Nusa Network, tim kami siap membantu kebutuhan IT Anda",
    },
  },
} as const;
