import { useState } from "react";
import {
  DataCenter,
  LoadBalancerNetwork,
  IbmCloudHyperProtectDbaas,
  CloudMonitoring,
  IotPlatform,
  ArrowRight,
  ChevronDown,
  Close,
  Menu,
} from "@carbon/icons-react";
import { Link } from "react-router";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { LanguageSwitcher } from "~/components/lang-switcher";
import {
  getLanguagePreference,
  getLocalizedUrl as getTranslatedUrl,
  type LanguagePreference,
} from "~/lib/locale-storage";

interface HeaderProps {
  locale: string;
  t: (key: string) => string;
}

export const solutionsMenu = [
  {
    title: "Managed Services",
    slug: "managed-services",
    desc: "Preventive & Corrective Maintenance",
    icon: LoadBalancerNetwork,
    img: "/hero.png",
  },
  {
    title: "Network Infrastructure",
    slug: "network-infrastructure",
    desc: "Reliable connectivity for operations",
    icon: CloudMonitoring,
    img: "/network-infrastructure.jpg",
  },
  {
    title: "Data Center",
    slug: "data-center",
    desc: "Safely secure your business data",
    icon: DataCenter,
    img: "/data-center.jpg",
  },
  {
    title: "Security Infrastructure",
    slug: "security-infrastructure",
    desc: "Securing systems with layered defense",
    icon: IbmCloudHyperProtectDbaas,
    img: "/security-infrastructure.png",
  },
  {
    title: "Internet of Things (IoT)",
    slug: "internet-of-things",
    desc: "Smart environment monitoring tools",
    icon: IotPlatform,
    img: "/iot.png",
  },
];

export default function Header({ locale, t }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  // Get user's language preference from localStorage
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
    <header className="border-b border-gray-200 bg-white text-gray-600">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 lg:py-4">
        {/* Logo */}
        <div className="flex gap-16">
          <Link
            to={locale === "id" ? `/id` : "/"}
            className="flex items-center gap-2"
          >
            <img src="/logo.png" alt="NPP" className="h-8" />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    {t("nav.solution")}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="min-w-[350px]">
                    {solutionsMenu.map((item) => (
                      <Link
                        key={item.title}
                        to={getLocalizedUrl(
                          `/${locale === "id" ? "solusi" : "solution"}/${item.slug}`
                        )}
                        className="py-3 flex items-center gap-2 group hover:bg-gray-50 px-4"
                        onClick={() => setMobileOpen(false)}
                      >
                        <item.icon
                          className="mr-2 group-hover:text-white group-hover:bg-primary bg-gray-50 p-1 rounded"
                          size={30}
                        />
                        <div className="block">
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link
                      to={getLocalizedUrl(
                        locale === "id" ? "/tentang" : "/about"
                      )}
                    >
                      {t("nav.about")}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link
                      to={getLocalizedUrl(
                        locale === "id" ? "/studi-kasus" : "/case-study"
                      )}
                    >
                      {t("nav.caseStudy")}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link to={getLocalizedUrl("/blog")}>
                      {t("nav.article")}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Solutions dropdown
            <div className="relative">
              <button
                onClick={() => setSolutionsOpen(!solutionsOpen)}
                className="flex items-center gap-1 font-medium text-gray-700"
              >
                Solutions <ChevronDown size={16} />
              </button>
              {solutionsOpen && (
                <div className="absolute left-0 mt-2 w-72 rounded-lg border bg-white shadow-lg p-4 pl-6 z-50">
                  {solutions.map((item) => (
                    <Link
                      key={item.title}
                      to={`/solutions/${item.slug}`}
                      className="py-3 flex items-center gap-2"
                      onClick={() => setMobileOpen(false)}
                    >
                      <item.icon className="mr-2" size={20} />
                      <div className="block">
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/about" className="font-medium text-gray-700">
              About Us
            </Link>
            <Link to="/case-study" className="font-medium text-gray-700">
              Case Study
            </Link>
            <Link to="/blog" className="font-medium text-gray-700">
              Blog
            </Link> */}
          </nav>
        </div>

        {/* Right buttons */}
        <div className="hidden lg:flex items-center gap-2">
          <LanguageSwitcher current={preferredLocale} />
          <Link
            to="https://ticket.nusanetwork.com/helpdesk"
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-500"
          >
            {t("nav.support")}
          </Link>
          <Link
            to="https://www.nusanetwork.com/contact/"
            className="bg-primary text-white rounded-lg px-4 py-2 text-sm flex items-center gap-1"
          >
            {t("nav.contact")} <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex gap-2 items-center lg:hidden">
          <LanguageSwitcher current={preferredLocale} />
          <button
            className="lg:hidden border border-gray-300 p-2 rounded-lg"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="text-gray-400" size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-white z-50 p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <img src="/logo.png" alt="NPP" className="h-8" />
            <button onClick={() => setMobileOpen(false)}>
              <Close className="text-gray-400" size={28} />
            </button>
          </div>

          <button
            className="flex justify-between w-full py-3 border-b font-medium border-gray-300"
            onClick={() => setSolutionsOpen(!solutionsOpen)}
          >
            {t("nav.solutions")} <ChevronDown size={16} />
          </button>
          {solutionsOpen && (
            <div className="pl-4">
              {solutionsMenu.map((item) => (
                <Link
                  key={item.title}
                  to={getLocalizedUrl(
                    `/${locale === "id" ? "solusi" : "solution"}/${item.slug}`
                  )}
                  className="py-3 flex items-center gap-2"
                  onClick={() => setMobileOpen(false)}
                >
                  <item.icon className="mr-2" size={20} />
                  <div className="block">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <Link
            to={getLocalizedUrl(locale === "id" ? "/tentang" : "/about")}
            className="block py-3 border-b font-medium border-gray-300"
            onClick={() => setMobileOpen(false)}
          >
            {t("nav.about")}
          </Link>
          <Link
            to={getLocalizedUrl("case-study")}
            className="block py-3 border-b font-medium border-gray-300"
            onClick={() => setMobileOpen(false)}
          >
            {t("nav.caseStudy")}
          </Link>
          <Link
            to={getLocalizedUrl("/blog")}
            className="block py-3 border-b font-medium border-gray-300"
            onClick={() => setMobileOpen(false)}
          >
            {t("nav.blog")}
          </Link>

          <div className="mt-6 flex flex-col gap-2">
            <Link
              to="https://www.nusanetwork.com/contact/"
              className="bg-primary text-white rounded-lg px-4 py-3 flex justify-center items-center gap-1"
            >
              {t("nav.contact")} <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
            <Link
              to="https://ticket.nusanetwork.com/helpdesk"
              className="border rounded-lg px-4 py-3 text-center border-gray-300"
            >
              {t("nav.support")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
