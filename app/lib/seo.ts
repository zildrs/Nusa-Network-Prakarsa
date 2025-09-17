import type { MetaFunction } from "react-router";

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
    name: "Nusa Network Prakarsa",
    url: "https://nusanetwork.com",
    logo: "https://nusanetwork.com/logo.png",
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
      url: "https://nusanetwork.com",
    },
    serviceType: "IT Services",
    areaServed: {
      "@type": "Country",
      name: "Indonesia",
    },
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
