import {
  LogoLinkedin,
  LogoFacebook,
  LogoInstagram,
  ArrowRight,
} from "@carbon/icons-react";
import { Link } from "react-router";

export default function Footer() {
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
              <h4 className="font-semibold text-gray-500 mb-3">Solutions</h4>
              <ul className="space-y-2  text-gray-600">
                <li>
                  <Link to="/solutions/security-infrastructure">
                    Security Infrastructure
                  </Link>
                </li>
                <li>
                  <Link to="/solutions/managed-services">Managed Services</Link>
                </li>
                <li>
                  <Link to="/solutions/iot-solution">IoT Solution</Link>
                </li>
                <li>
                  <Link to="/solutions/data-center-infrastructure">
                    Data Center Infrastructure
                  </Link>
                </li>
                <li>
                  <Link to="/solutions/network-infrastructure">
                    Network Infrastructure
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-gray-500 mb-3">Company</h4>
              <ul className="space-y-2  text-gray-600">
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/case-study">Case Study</Link>
                </li>
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
                <li>
                  <Link to="/careers">Careers</Link>
                </li>
                <li>
                  <Link to="/partners">Partners</Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-gray-500 mb-3">Resources</h4>
              <ul className="space-y-2  text-gray-600">
                <li>
                  <Link to="/privacy-policy">Privacy & Terms</Link>
                </li>
                <li>
                  <Link to="/sitemap">Sitemap</Link>
                </li>
                <li>
                  <Link to="/certifications">Certifications</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link to="https://ticket.nusanetwork.com/helpdesk">
                    Support
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
