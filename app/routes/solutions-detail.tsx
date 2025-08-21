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

  const services = [
    { title: "Colocation Services", icon: "📦" },
    { title: "Private Cloud & Virtualization", icon: "☁️" },
    { title: "Disaster Recovery", icon: "⚡" },
    { title: "Data Backup & Storage Solutions", icon: "💾" },
    { title: "Network Redundancy & Load Balancing", icon: "🌐" },
    { title: "Managed Server Hosting", icon: "🖥️" },
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
      <section className="relative bg-blue-950 text-white">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
        linear-gradient(to right, rgba(0, 51, 102, 0.9), rgba(0, 51, 102, 0.6), rgba(0, 51, 102, 0)),
        url('/data-center.jpg')
      `,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="absolute inset-0 bg-blue-950/70"></div>
        <div className="relative flex flex-col justify-end container mx-auto px-6 py-28 lg:py-40 max-w-7xl">
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
          <div className="mt-8">
            <a
              href="#"
              className="w-fit bg-white flex items-center text-blue-950 px-4 py-2 rounded-lg font-medium shadow hover:bg-gray-100 transition"
            >
              Schedule Free Consultation{" "}
              <ArrowRight className="inline-block ml-2 w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full bg-white">
          <div className="container mx-auto px-6 max-w-7xl py-4 flex justify-between items-center text-sm font-medium">
            <div className="flex gap-8 text-gray-700">
              <a href="#" className="hover:text-blue-950">
                What we do
              </a>
              <a href="#" className="hover:text-blue-950">
                Our services
              </a>
              <a href="#" className="hover:text-blue-950">
                Case study
              </a>
              <a href="#" className="hover:text-blue-950">
                Our partners
              </a>
            </div>

            <a
              href="#"
              className="bg-blue-950 inline-flex items-center text-white px-4 py-2 rounded-lg hover:bg-[#19376D] transition"
            >
              Consult free with us <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="container max-w-7xl px-6 py-18 lg:py-12 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold">WHAT WE DO</p>
              <h2 className="text-4xl font-bold text-gray-900 mt-2">
                Reliable. Scalable. <br /> Always On.
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                From secure colocation and cloud-ready hosting to disaster
                recovery and 24/7 monitoring, our solutions are tailored...
              </p>
            </div>
            <div className="min-h-[450px] overflow-visible">
              <img
                src="/data-center.jpg"
                alt="server"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[40vw] object-cover rounded-l-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 1 - Services */}
      <section className="bg-gradient-to-r  from-[#0A2A5E] to-[#063970] text-white py-16 px-6 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold">OUR DATA CENTER SERVICES</p>
          <h2 className="text-3xl lg:text-4xl font-bold mt-2">
            Solutions that fit <br /> your infrastructure needs
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {services.map((service, i) => (
              <div
                key={i}
                style={{ backgroundImage: "url('/bg-card-2.png')" }}
                className="bg-white flex flex-col justify-between aspect-[6/3] text-gray-800 p-6 rounded-xl"
              >
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="font-semibold">{service.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/*  */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <p className="uppercase text-sm tracking-wide text-gray-900 mb-2">
            <span className="font-semibold">Case</span> Study
          </p>
          <h2 className="text-3xl lg:text-4xl font-semibold mb-8 max-w-md">
            Customer Success with Nusa Network Prakarsa
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((c, idx) => (
              <CaseStudyCard key={idx} data={c} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
