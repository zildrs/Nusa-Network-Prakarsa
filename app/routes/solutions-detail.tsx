import { useEffect, useState, useRef } from "react";
import type { Route } from "./+types/home";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  ArrowLeft,
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import type { Swiper as SwiperRef } from "swiper/types";
import CTASection from "~/components/cta";
import CaseStudyCard from "~/components/case-study-card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const swiperRef = useRef<SwiperRef | null>(null);
  const [Marquee, setMarquee] = useState<any>(null);

  useEffect(() => {
    import("react-fast-marquee").then((mod) => {
      setMarquee(() => mod.default);
    });
  }, []);

  const stats = [
    { value: "150+", label: "Projects Accomplished" },
    { value: "100+", label: "Clients Success" },
    { value: "32+", label: "Technology Partners" },
    { value: "15+", label: "Amazing Awards Accomplished" },
  ];

  const partners = [
    "/logos/allianz.png",
    "/logos/angkasa-pura.png",
    "/logos/bhimasena.png",
    "/logos/briagro.png",
    "/logos/british-council.png",
    "/logos/gojek.png",
    "/logos/icon.png",
    "/logos/ihg.png",
    "/logos/indika.png",
    "/logos/itm.png",
    "/logos/jnt.png",
    "/logos/kalbe.png",
    "/logos/lemeridien.png",
    "/logos/otsuka.png",
    "/logos/peruru.png",
    "/logos/pii.png",
    "/logos/sinarmas.png",
    "/logos/taman-safari.png",
    "/logos/telkom.png",
  ];

  const solutions = [
    { title: "Managed Services", img: "/hero.png" },
    { title: "Network Infrastructure", img: "/network-infrastructure.jpg" },
    { title: "Data Center", img: "/data-center.jpg" },
    { title: "Security Infrastructure", img: "/security-infrastructure.png" },
    { title: "Internet of Things (IoT)", img: "/iot.png" },
  ];

  const caseStudies = [
    {
      title: "Transforming Peruri Businesses with SD–WAN Technology",
      company: "Peruri",
      img: "https://awsimages.detik.net.id/community/media/visual/2024/11/19/kantor-peruri-resmi-jadi-cagar-budaya-1_169.jpeg?w=700&q=90",
      companyLogo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_2024_Perum_Peruri.svg/2560px-Logo_2024_Perum_Peruri.svg.png",
    },
    {
      title: "Transforming J&T Express Businesses with SD–WAN Technology",
      company: "J&T Express",
      img: "https://foto.kontan.co.id/8TQWPa6yy4jEQX5iWDd_3ql1pv4=/640x360/smart/2021/12/15/1054233720p.jpg",
      companyLogo:
        "https://1000logos.net/wp-content/uploads/2022/08/JT-Express-Logo.png",
    },
    {
      title: "Transforming Peruri Businesses with SD–WAN Technology",
      company: "Peruri",
      img: "https://awsimages.detik.net.id/community/media/visual/2024/11/19/kantor-peruri-resmi-jadi-cagar-budaya-1_169.jpeg?w=700&q=90",
      companyLogo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_2024_Perum_Peruri.svg/2560px-Logo_2024_Perum_Peruri.svg.png",
    },
  ];

  const testimonials = Array(6).fill({
    quote:
      "Overall, everything has been good from the salesperson and other teams, including other services such as SOC, Managed Services, and Application Platform.",
    name: "Widiya Kumoro",
    role: "IT Manager",
    companyLogo:
      "https://rec-data.kalibrr.com/www.kalibrr.com/logos/7QSUT6KX6LRD4USDXZXTUD4PCDAMZN5F7EKZV3ZF-60e032e2.png",
  });

  return (
    <main>
      {/* === HERO SECTION === */}
      <section className="relative bg-[#0B2447] text-white">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/data-center.jpg"
            alt="Data Center"
            className="w-full h-full object-cover opacity-70"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#0B2447]/70"></div>

        {/* Content */}
        <div className="relative container mx-auto px-6 lg:px-20 py-28 lg:py-40">
          <p className="uppercase text-sm font-semibold tracking-wide">
            Data Center Solutions
          </p>
          <h1 className="mt-4 text-4xl lg:text-5xl font-bold leading-tight max-w-3xl">
            Modern, Secure, <br />
            and Scalable Data <br />
            Center Solutions
          </h1>
          <p className="mt-6 text-lg max-w-xl text-gray-200">
            Empower your business with enterprise-grade data center solutions,
            24/7 uptime, and expert support — all tailored to your needs.
          </p>

          {/* Button */}
          <div className="mt-8">
            <a
              href="#"
              className="inline-block bg-white text-[#0B2447] px-6 py-3 rounded-lg font-medium shadow hover:bg-gray-100 transition"
            >
              Schedule Free Consultation →
            </a>
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="absolute bottom-0 left-0 w-full bg-white shadow">
          <div className="container mx-auto px-6 lg:px-20 py-4 flex justify-between items-center text-sm font-medium">
            {/* Menu */}
            <div className="flex gap-8 text-gray-700">
              <a href="#" className="hover:text-[#0B2447]">
                What we do
              </a>
              <a href="#" className="hover:text-[#0B2447]">
                Our services
              </a>
              <a href="#" className="hover:text-[#0B2447]">
                Case study
              </a>
              <a href="#" className="hover:text-[#0B2447]">
                Our partners
              </a>
            </div>

            {/* Button */}
            <a
              href="#"
              className="bg-[#0B2447] text-white px-5 py-2 rounded-lg hover:bg-[#19376D] transition"
            >
              Consult free with us →
            </a>
          </div>
        </div>
      </section>

      {/* === WHAT WE DO SECTION === */}
      <section className="container mx-auto px-6 lg:px-20 py-28 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          <p className="uppercase text-sm font-semibold tracking-wide text-gray-500">
            What We Do
          </p>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold leading-snug">
            Reliable. Scalable. <br /> Always On.
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-lg">
            From secure colocation and cloud-ready hosting to disaster recovery
            and 24/7 monitoring, our solutions are tailored to ensure uptime,
            compliance, and total peace of mind. Backed by certified experts and
            advanced infrastructure, we help you stay online, connected, and
            future-ready.
          </p>
        </div>

        {/* Image */}
        <div className="relative">
          <img
            src="/data-center.jpg"
            alt="Data Center Technician"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </section>

      <CTASection />
    </main>
  );
}
