import {
  LogoLinkedin,
  LogoFacebook,
  LogoInstagram,
  ArrowRight,
} from "@carbon/icons-react";
import { Link } from "react-router";

interface HeaderProps {
  locale: string;
  t: (key: string) => string;
}
export default function Footer({ locale, t }: HeaderProps) {
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
              <h4 className="font-semibold text-gray-500 mb-3">
                {t("footer.solutions.title")}
              </h4>
              <ul className="space-y-2  text-gray-600">
                <li>
                  <Link to="/solutions/security-infrastructure">
                    {t("footer.solutions.items.securityInfrastructure")}
                  </Link>
                </li>
                <li>
                  <Link to="/solutions/managed-services">
                    {t("footer.solutions.items.managedServices")}
                  </Link>
                </li>
                <li>
                  <Link to="/solutions/internet-of-things">
                    {t("footer.solutions.items.iotSolution")}
                  </Link>
                </li>
                <li>
                  <Link to="/solutions/data-center">
                    {t("footer.solutions.items.dataCenter")}
                  </Link>
                </li>
                <li>
                  <Link to="/solutions/network-infrastructure">
                    {t("footer.solutions.items.networkInfrastructure")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-gray-500 mb-3">
                {t("footer.company.title")}
              </h4>
              <ul className="space-y-2  text-gray-600">
                <li>
                  <Link to="/about">{t("footer.company.items.about")}</Link>
                </li>
                <li>
                  <Link to="/case-study">
                    {t("footer.company.items.caseStudy")}
                  </Link>
                </li>
                <li>
                  <Link to="/blog">{t("footer.company.items.blog")}</Link>
                </li>
                <li>
                  <Link to="/careers">{t("footer.company.items.careers")}</Link>
                </li>
                <li>
                  <Link to="/partners">
                    {t("footer.company.items.partners")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-gray-500 mb-3">
                {t("footer.resources.title")}
              </h4>
              <ul className="space-y-2  text-gray-600">
                <li>
                  <Link to="/privacy-policy">
                    {t("footer.resources.items.privacy")}
                  </Link>
                </li>
                <li>
                  <Link to="/sitemap">
                    {t("footer.resources.items.sitemap")}
                  </Link>
                </li>
                <li>
                  <Link to="/certifications">
                    {t("footer.resources.items.certifications")}
                  </Link>
                </li>
                <li>
                  <Link to="/contact">
                    {t("footer.resources.items.contact")}
                  </Link>
                </li>
                <li>
                  <Link to="https://ticket.nusanetwork.com/helpdesk">
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
            {/* <a href="#">
              <Tikt size={24} />
            </a> */}
            <a href="#">
              <LogoLinkedin
                size={24}
                className="text-gray-400 hover:text-gray-600"
              />
            </a>
            <a href="#">
              <LogoFacebook
                size={24}
                className="text-gray-400 hover:text-gray-600"
              />
            </a>
            <a href="#">
              <LogoInstagram
                size={24}
                className="text-gray-400 hover:text-gray-600"
              />
            </a>
          </div>
          <p className="text-gray-500">
            © 2025 Nusa Network Prakarsa. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
