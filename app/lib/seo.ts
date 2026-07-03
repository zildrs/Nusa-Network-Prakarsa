import type { MetaFunction } from "react-router";

/** Domain kanonik yang dipakai di semua schema markup (Organization, Service, Breadcrumb). */
export const SCHEMA_BASE_URL = "https://www.nusanetwork.com";

export interface SEOData {
  title: string;
  description: string;
  canonical: string;
  hrefLang: Array<{ href: string; hrefLang: string }>;
  schema?: any;
}

/**
 * Dapatkan canonical URL dari request
 */
export function getCanonicalUrl(request: Request): string {
  const url = new URL(request.url);
  return url.origin + url.pathname + url.search;
}

/**
 * Generate hrefLang URLs berbasis query param locale
 */
export function gethrefLangUrls(
  request: Request
): Array<{ href: string; hrefLang: string }> {
  const url = new URL(request.url);
  const base = url.origin + url.pathname;

  return [
    { href: `${base}?locale=en`, hrefLang: "en" },
    { href: `${base}?locale=id`, hrefLang: "id" },
  ];
}

/**
 * Schema untuk Organization
 */
export function createOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SCHEMA_BASE_URL}/#organization`,
    name: "Nusa Network Prakarsa",
    url: SCHEMA_BASE_URL,
    logo: `${SCHEMA_BASE_URL}/logo.png`,
    description:
      "Trusted System Integrator in Indonesia providing end-to-end IT solutions",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Jalan Kamal Raya Outer Ring Road, Mutiara Taman Palem A17 / 29 - 30",
      addressLocality: "Jakarta Barat",
      postalCode: "11730",
      addressCountry: "ID",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+62-21-5435-3007",
      contactType: "customer service",
    },
    sameAs: [
      "https://www.linkedin.com/company/nusa-network-prakarsa",
      "https://www.facebook.com/nusanetworkprakarsa",
    ],
  };
}

/**
 * Schema untuk Service
 */
export function createServiceSchema(
  serviceName: string,
  serviceDescription: string,
  serviceUrl: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: serviceDescription,
    url: serviceUrl,
    provider: {
      "@type": "Organization",
      name: "Nusa Network Prakarsa",
      url: SCHEMA_BASE_URL,
    },
    serviceType: "IT Services",
    areaServed: {
      "@type": "Country",
      name: "Indonesia",
    },
  };
}

/**
 * Konten Service schema per solusi, per locale.
 * Solusi yang belum punya entry di sini tidak akan menghasilkan schema
 * (createSolutionServiceSchema akan return null).
 */
type SolutionServiceEntry = {
  name: string;
  description: string;
  serviceType: string;
  /** BCP-47 language tag untuk field inLanguage. Default: kode locale ("en"/"id"). */
  inLanguage?: string;
};

export const solutionServiceSchemaData: Record<
  string,
  Partial<Record<"en" | "id", SolutionServiceEntry>>
> = {
  "network-infrastructure": {
    en: {
      name: "Network Infrastructure Solution",
      description:
        "PT Nusa Network Prakarsa provides network infrastructure solutions, including network design, deployment, integration, optimization, and management to help businesses build secure, reliable, and scalable network infrastructures.",
      serviceType: "Network Infrastructure",
    },
    id: {
      name: "Network Infrastructure Solution",
      description:
        "PT Nusa Network Prakarsa menyediakan solusi network infrastructure yang mencakup perencanaan, implementasi, integrasi, optimalisasi, dan pengelolaan jaringan untuk membantu perusahaan membangun infrastruktur jaringan yang aman, andal, dan mudah dikembangkan sesuai kebutuhan bisnis.",
      serviceType: "Network Infrastructure",
      inLanguage: "id-ID",
    },
  },
  "data-center": {
    en: {
      name: "Data Center Infrastructure Solutions",
      description:
        "PT Nusa Network Prakarsa provides comprehensive Data Center Infrastructure solutions, including planning, implementation, integration, optimization, and maintenance to build secure, reliable, and high-performance data centers.",
      serviceType: "Data Center Infrastructure",
    },
    id: {
      name: "Data Center Solution",
      description:
        "PT Nusa Network Prakarsa menyediakan solusi Data Center yang komprehensif, meliputi perencanaan, implementasi, integrasi, optimalisasi, dan pemeliharaan untuk membantu perusahaan membangun infrastruktur pusat data yang aman, andal, dan berkinerja tinggi.",
      serviceType: "Data Center",
      inLanguage: "id-ID",
    },
  },
  "security-infrastructure": {
    en: {
      name: "Security Infrastructure Solutions",
      description:
        "PT Nusa Network Prakarsa provides Security Infrastructure solutions to enhance network security and protect business data.",
      serviceType: "Security Infrastructure",
    },
    id: {
      name: "Solusi Security Infrastructure",
      description:
        "Nusa Network menyediakan solusi Security Infrastructure untuk meningkatkan keamanan jaringan dan data bisnis.",
      serviceType: "Security Infrastructure",
      inLanguage: "id-ID",
    },
  },
  "managed-services": {
    en: {
      name: "Managed Services",
      description:
        "PT Nusa Network Prakarsa provides Managed Services, including IT monitoring, Network Operations Center (NOC), Security Operations Center (SOC), IT Helpdesk, VAPT, and Engineer On Site to support secure, reliable, and efficient IT operations.",
      serviceType: "Managed Services",
    },
    id: {
      name: "Managed Services",
      description:
        "PT Nusa Network Prakarsa menyediakan solusi Managed Services untuk membantu menjaga operasional IT melalui monitoring, optimasi, keamanan, cloud, dan layanan teknis yang efisien.",
      serviceType: "Managed Services",
      inLanguage: "id-ID",
    },
  },
  "internet-of-things": {
    en: {
      name: "Internet of Things (IoT) Solutions",
      description:
        "PT Nusa Network Prakarsa offers NADA, an Internet of Things (IoT)-based Early Warning System for real-time environmental monitoring, enhancing security, enabling informed decision-making, and supporting rapid response.",
      serviceType: "Internet of Things (IoT)",
    },
    id: {
      name: "Solusi Internet of Things (IoT)",
      description:
        "PT Nusa Network Prakarsa menghadirkan NADA, solusi Internet of Things (IoT) berbasis Early Warning System untuk meningkatkan keamanan dan mendukung respons yang lebih cepat.",
      serviceType: "Internet of Things (IoT)",
      inLanguage: "id-ID",
    },
  },
};

/**
 * Schema Service untuk halaman detail solusi (/solution/:slug atau /id/solusi/:slug).
 * Return null kalau slug belum punya entry di solutionServiceSchemaData.
 */
export function createSolutionServiceSchema(
  slug: string,
  locale: "en" | "id"
) {
  const entry =
    solutionServiceSchemaData[slug]?.[locale] ??
    solutionServiceSchemaData[slug]?.en;

  if (!entry) return null;

  const baseUrl = SCHEMA_BASE_URL;
  const path = locale === "id" ? `/id/solusi/${slug}` : `/solution/${slug}`;
  const url = `${baseUrl}${path}`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}/#service`,
    name: entry.name,
    description: entry.description,
    serviceType: entry.serviceType,
    url,
    provider: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "PT Nusa Network Prakarsa",
    },
    areaServed: {
      "@type": "Country",
      name: "Indonesia",
    },
    inLanguage: entry.inLanguage ?? locale,
  };
}

/**
 * Schema untuk Breadcrumb
 */
export function createBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
