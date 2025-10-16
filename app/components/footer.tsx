import LogoFacebook from "~/components/icons/facebook.svg";
import LogoTiktok from "~/components/icons/tiktok.svg";
import LogoLinkedin from "~/components/icons/linkedin.svg";
import LogoInstagram from "~/components/icons/instagram.svg";

import { Link } from "react-router";
import {
  getLanguagePreference,
  getLocalizedUrl as getTranslatedUrl,
  type LanguagePreference,
} from "~/lib/locale-storage";

interface HeaderProps {
  locale: string;
  t: (key: string) => string;
}
export default function Footer({ locale, t }: HeaderProps) {
  const userPreference = getLanguagePreference();
  // Use URL locale first, then user preference, fallback to current locale
  const currentLocale: LanguagePreference =
    locale === "id" || locale === "en" ? (locale as LanguagePreference) : "en";
  const preferredLocale = currentLocale || userPreference || "en";

  // Helper function to generate locale-aware URLs with route translation
  const getLocalizedUrl = (englishRoute: string): string => {
    return getTranslatedUrl(englishRoute, preferredLocale);
  };
  return (
    <>
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Company Info */}
          <div className="col-span-2">
            <img src="/logo.png" alt="NNP" className="h-10 mb-4" />
            <p className=" text-gray-600 leading-relaxed">
              Jalan Kamal Raya Outer Ring Road, <br />
              Mutiara Taman Palem A17 / 29 - 30, <br />
              Kelurahan Cengkareng Timur, Kecamatan <br />
              Cengkareng, Jakarta Barat, 11730
            </p>
            <div className="flex gap-8 mt-6">
              <img src="/sgs.png" alt="SGS" className="h-10" />
              <img src="/kan.png" alt="KAN" className="h-10" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 col-span-3">
            {/* Solutions */}
            <div>
              <h3
                
                className="font-semibold text-gray-500 mb-3"
              >
                {t("footer.solutions.title")}
              </h3>
              <ul
                
                
                className="space-y-2  text-gray-600"
              >
                <li>
                  <Link
                    to={getLocalizedUrl(
                      `/${locale === "id" ? "solusi" : "solution"}/security-infrastructure`
                    )}
                    prefetch="intent"
                  >
                    {t("footer.solutions.items.securityInfrastructure")}
                  </Link>
                </li>
                <li>
                  <Link
                    to={getLocalizedUrl(
                      `/${locale === "id" ? "solusi" : "solution"}/managed-services`
                    )}
                    prefetch="intent"
                  >
                    {t("footer.solutions.items.managedServices")}
                  </Link>
                </li>
                <li>
                  <Link
                    to={getLocalizedUrl(
                      `/${locale === "id" ? "solusi" : "solution"}/internet-of-things`
                    )}
                    prefetch="intent"
                  >
                    {t("footer.solutions.items.iotSolution")}
                  </Link>
                </li>
                <li>
                  <Link
                    to={getLocalizedUrl(
                      `/${locale === "id" ? "solusi" : "solution"}/data-center`
                    )}
                    prefetch="intent"
                  >
                    {t("footer.solutions.items.dataCenter")}
                  </Link>
                </li>
                <li>
                  <Link
                    to={getLocalizedUrl(
                      `/${locale === "id" ? "solusi" : "solution"}/network-infrastructure`
                    )}
                    prefetch="intent"
                  >
                    {t("footer.solutions.items.networkInfrastructure")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3
                className="font-semibold text-gray-500 mb-3"
              >
                {t("footer.company.title")}
              </h3>
              <ul
                className="space-y-2  text-gray-600"
              >
                <li>
                  <Link
                    to={getLocalizedUrl(
                      locale === "id" ? "/tentang" : "/about"
                    )}
                    prefetch="intent"
                  >
                    {t("footer.company.items.about")}
                  </Link>
                </li>
                <li>
                  <Link
                    to={getLocalizedUrl(
                      locale === "id" ? "/studi-kasus" : "/case-study"
                    )}
                    prefetch="intent"
                  >
                    {t("footer.company.items.caseStudy")}
                  </Link>
                </li>
                <li>
                  <Link
                    to={getLocalizedUrl(locale === "id" ? "/blog" : "/blog")}
                    prefetch="intent"
                  >
                    {t("footer.company.items.blog")}
                  </Link>
                </li>
                <li>
                  <Link
                    to={getLocalizedUrl(
                      locale === "id" ? "/karir" : "/careers"
                    )}
                    prefetch="intent"
                  >
                    {t("footer.company.items.careers")}
                  </Link>
                </li>
                <li>
                  <Link
                    to={getLocalizedUrl(
                      locale === "id" ? "/partners" : "/partners"
                    )}
                    prefetch="intent"
                  >
                    {t("footer.company.items.partners")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3
                className="font-semibold text-gray-500 mb-3"
              >
                {t("footer.resources.title")}
              </h3>
              <ul
                className="space-y-2  text-gray-600"
              >
                <li>
                  <Link
                    to={getLocalizedUrl(
                      locale === "id" ? "/kebijakan-privasi" : "/policies"
                    )}
                    prefetch="intent"
                  >
                    {t("footer.resources.items.privacy")}
                  </Link>
                </li>
                <li>
                  <Link to={getLocalizedUrl("/sitemap")} prefetch="intent">
                    {t("footer.resources.items.sitemap")}
                  </Link>
                </li>
                <li>
                  <Link to={getLocalizedUrl("/certifications")} prefetch="intent">
                    {t("footer.resources.items.certifications")}
                  </Link>
                </li>
                <li>
                  <Link to={getLocalizedUrl("/contact")} prefetch="intent">
                    {t("footer.resources.items.contact")}
                  </Link>
                </li>
                <li>
                  <Link to="https://ticket.nusanetwork.com/helpdesk" prefetch="intent">
                    {t("footer.resources.items.support")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t-2 py-6 text-center md:flex md:justify-between flex-row-reverse border-gray-200 md:items-center max-w-7xl mx-auto px-6">
          <div className="flex mb-6 lg:mb-0 justify-center gap-4 mt-4 md:mt-0">
            <a
              target="_blank"
              href="https://www.tiktok.com/@nusanetworkprakarsa"
            >
              <img
                src={LogoTiktok}
                alt="tiktok"
                className="text-gray-400 hover:text-gray-600 w-6 h-6"
              />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/company/nusanetworkprakarsa/"
            >
              <img
                src={LogoLinkedin}
                alt="linkedin"
                className="text-gray-400 hover:text-gray-600 w-6 h-6"
              />
            </a>
            <a
              target="_blank"
              href="https://www.facebook.com/nusanetworkprakarsa"
            >
              <img
                src={LogoFacebook}
                alt="facebook"
                className="text-gray-400 hover:text-gray-600 w-6 h-6"
              />
            </a>
            <a
              target="_blank"
              href="https://www.instagram.com/nusanetworkprakarsa"
            >
              <img
                src={LogoInstagram}
                alt="instagram"
                className="text-gray-400 hover:text-gray-600 w-6 h-6"
              />
            </a>
          </div>
          <p  className="text-gray-500">
            © 2025 Nusa Network Prakarsa. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
