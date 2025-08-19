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
      img: "https://placehold.co/400",
    },
    {
      title: "Transforming J&T Express Businesses with SD–WAN Technology",
      company: "J&T Express",
      img: "https://placehold.co/400",
    },
    {
      title: "Transforming Peruri Businesses with SD–WAN Technology",
      company: "Peruri",
      img: "https://placehold.co/400",
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
      <section className="bg-white">
        {/* Hero Text + Image */}
        <div
          className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-1 gap-10 items-center min-h-[384px]"
          style={{
            backgroundImage: `url(/bg-hero.png)`,
            backgroundSize: "cover",
          }}
        >
          {/* Left Side */}
          <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 lg:gap-10 items-end w-full">
            <h1 className="text-5xl md:text-5xl font-semibold leading-tight col-span-6">
              Trusted System Integrator <br /> Company in Indonesia
            </h1>
            {/* Right Side - Hero Image */}
            <p className="text-gray-500 mt-4 text-xl lg:text-xl col-span-2">
              Highly Tailored IT Design, Management & Support Services.
            </p>
          </div>
        </div>
        <img
          src="/hero.png"
          className="w-full aspect-[3/3] lg:aspect-[8/3] object-cover"
          alt="Server Room"
        />
        {/* Partner Logos */}
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-center text-lg tracking-[0.2em] text-gray-500 mb-6 w-[80%] mx-auto">
              TRUSTED BY COMPANIES ALL OVER THE WORLD
            </p>
            {Marquee && (
              <Marquee
                className="mt-8"
                gradient={true}
                autoFill={true}
                gradientWidth={50}
                spacing={16}
              >
                {partners.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt="Partner"
                    className="h-12 w-auto px-8"
                  />
                ))}
              </Marquee>
            )}
          </div>
        </div>

        {/* About + Stats */}
        <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-semibold leading-snug">
              As your IT Consultant, <br />
              we help you grow your business{" "}
              <span className="italic">exponentially</span>
            </h2>
            <p className="text-gray-500 mt-4 leading-7 text-lg">
              With over a decade of experience as a trusted system integrator in
              Indonesia, PT Nusa Network Prakarsa has consistently demonstrated
              its commitment to delivering advanced technology solutions that
              accelerate business growth and digital transformation.
            </p>
            <p className="text-gray-500 mt-4 leading-7 text-lg">
              We deliver relevant solutions to businesses around the globe.
              Strong innovation to leverage your IT resource is built in our
              vein.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 h-full">
            {stats.map((item) => (
              <div
                key={item.label}
                className="border border-gray-300 rounded-xl bg-white shadow-sm bg-center bg-cover bg-no-repeat bg-card flex flex-col justify-between"
                style={{ backgroundImage: `url(/bg-card.png)` }}
              >
                <p className="text-4xl font-semibold p-6">{item.value}</p>
                <div className="text-lg text-gray-500 bg-gray-50 p-3 rounded-b-xl">
                  <p className="lg:w-42 wrap-all">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-950 relative text-white pt-12 py-18 lg:py-12  overflow-hidden lg:overflow-visible">
        <img
          src="/bg-solutions.png"
          alt="Background Solution"
          className="absolute top-0 right-0 opacity-70 max-w-lg lg:max-w-4xl"
        />

        <div
          className="absolute z-10 top-[-250px] right-[-250px] w-[600px] h-[600px] rounded-full filter blur-xl"
          style={{
            background:
              "radial-gradient(circle, rgba(135,206,250,0.15), rgba(0,128,128,0.1))",
          }}
        ></div>

        <div
          className="absolute z-10 bottom-[-250px] left-[-100px] w-[600px] h-[600px] rounded-full filter blur-xl"
          style={{
            background:
              "radial-gradient(circle, rgba(135,206,250,0.15), rgba(0,128,128,0.1))",
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 relative">
          <p className="uppercase tracking-wide mb-6 z-20">
            <span className="font-semibold">Our</span> Solutions
          </p>
          <div className="flex justify-between items-center">
            <h2 className="text-4xl lg:text-5xl lg:font-semibold leading-snug mb-10">
              End-to-End IT Solutions <br /> for your Business Growth
            </h2>
            <div className="z-10 hidden lg:flex gap-8">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="p-3 bg-white rounded-lg hover:bg-gray-300"
              >
                <ArrowLeft className="text-gray-700" />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="p-3 bg-white rounded-lg hover:bg-gray-300"
              >
                <ArrowRight className="text-gray-700" />
              </button>
            </div>
          </div>

          <Swiper
            className="!overflow-visible z-10 relative"
            modules={[Navigation, Pagination]}
            loop
            spaceBetween={20}
            slidesPerView={1.2}
            breakpoints={{
              768: { slidesPerView: 2.5 },
              1024: { slidesPerView: 3.5, pagination: false },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            pagination={{ clickable: true }}
          >
            {solutions.map((s, idx) => (
              <SwiperSlide key={idx}>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full aspect-[3/5] lg:aspect-[3/4] object-cover"
                  />
                  <div className="p-4 bg-gradient-to-t from-black/50 to-transparent absolute bottom-0 w-full">
                    <p className="text-white font-medium text-xl">{s.title}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Section 2 - Case Study */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <p className="uppercase text-sm tracking-wide text-gray-900 mb-2">
            <span className="font-semibold">Case</span> Study
          </p>
          <h2 className="text-4xl font-semibold mb-8 max-w-md">
            Customer Success with Nusa Network Prakarsa
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((c, idx) => (
              <div
                key={idx}
                className="rounded-lg overflow-hidden shadow-lg relative aspect-square"
              >
                <img
                  src={c.img}
                  alt={c.title}
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex flex-col justify-end">
                  <p className="text-white text-xs font-semibold uppercase">
                    {c.company}
                  </p>
                  <p className="text-white font-medium">{c.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 - Our Clients Story */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <p className="uppercase text-sm tracking-wide text-gray-900 mb-2">
            Our <span className="font-semibold">Clients Story</span>
          </p>
          <h2 className="text-4xl font-semibold mb-8 max-w-lg">
            What our clients say about their journey with us.
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl  border border-gray-200"
              >
                <p className="text-gray-700 mb-4 leading-relaxed p-6">
                  “{t.quote}”
                </p>
                <div className="flex items-center gap-3 bg-gray-50 px-6 py-4 rounded-b-2xl">
                  <div>
                    <p className="font-medium mb-2">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                  <img
                    src={t.companyLogo}
                    alt="Company Logo"
                    className="ml-auto h-10"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4">
        <p className="text-sm tracking-widest text-gray-900 uppercase">
          <span className="font-semibold">Technology</span> Partners
        </p>
        <h2 className="mt-2 text-4xl font-semibold text-gray-900 leading-snug">
          Leading Solutions with <br /> World-Class Partners
        </h2>
        <a href="#" className="my-8 inline-flex items-center font-medium">
          Learn More about our Technology Partners →
        </a>

        {/* Logo carousel (contoh pakai flex biasa, bisa ganti swiper/marquee) */}
        {Marquee && (
          <Marquee
            className="mt-8"
            gradient={true}
            autoFill={true}
            gradientWidth={50}
            spacing={16}
          >
            {partners.map((src, index) => (
              <img
                key={index}
                src={src}
                alt="Partner"
                className="h-12 w-auto px-8"
              />
            ))}
          </Marquee>
        )}
      </section>

      {/* SECTION 2: CTA BLUE */}
      <section className="relative bg-blue-950 text-white py-20 overflow-hidden">
        <img
          src="/bg-solutions.png"
          alt="Background Solution"
          className="absolute top-0 right-0 opacity-70 max-w-4xl"
        />

        <div
          className="absolute z-10 top-[-250px] right-[-250px] w-[500px] h-[500px] rounded-full filter blur-xl"
          style={{
            background:
              "radial-gradient(circle, rgba(135,206,250,0.15), rgba(0,128,128,0.1))",
          }}
        ></div>

        <div
          className="absolute z-10 bottom-[-250px] left-[-100px] w-[300px] h-[300px] rounded-full filter blur-xl"
          style={{
            background:
              "radial-gradient(circle, rgba(135,206,250,0.15), rgba(0,128,128,0.1))",
          }}
        ></div>
        <div className="max-w-7xl relative mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <h2 className="text-4xl font-semibold max-w-xl leading-snug">
            We run all kinds of IT services <br /> that vow your success
          </h2>
          <a
            href="#"
            className="mt-6 md:mt-0 inline-flex items-center px-6 py-3 bg-white text-gray-900 font-medium rounded-full shadow"
          >
            Talk to our expert →
          </a>
        </div>
      </section>

      {/* SECTION 3: FOOTER */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Company Info */}
          <div>
            <img src="/logo.png" alt="NNP" className="h-10 mb-4" />
            <p className="text-sm text-gray-600 leading-relaxed">
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

          <div className="grid grid-cols-3 gap-8">
            {/* Solutions */}
            <div>
              <h4 className="font-semibold text-gray-500 mb-3">Solutions</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Security Infrastructure</li>
                <li>Managed Services</li>
                <li>IoT Solution</li>
                <li>Data Center Infrastructure</li>
                <li>Network Infrastructure</li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-gray-500 mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>About Us</li>
                <li>Case Study</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Partners</li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-gray-500 mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Privacy & Terms</li>
                <li>Sitemap</li>
                <li>Certifications</li>
                <li>Contact Us</li>
                <li>Support</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t-2 py-6 text-center md:flex md:justify-between border-gray-200 md:items-center max-w-7xl mx-auto px-6">
          <p className="text-sm text-gray-500">
            © 2025 Nusa Network Prakarsa. All rights reserved.
          </p>
          <div className="flex justify-center gap-4 mt-4 md:mt-0">
            {/* <a href="#">
              <Tikt size={24} />
            </a> */}
            <a href="#">
              <Linkedin size={24} />
            </a>
            <a href="#">
              <Facebook size={24} />
            </a>
            <a href="#">
              <Instagram size={24} />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
