import { useEffect, useState, useRef } from "react";
import type { Route } from "./+types/home";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { Swiper as SwiperRef } from "swiper/types";
import CTASection from "~/components/cta";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function About() {
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

  const solutions = [
    { title: "Managed Services", img: "/hero.png" },
    { title: "Network Infrastructure", img: "/network-infrastructure.jpg" },
    { title: "Data Center", img: "/data-center.jpg" },
    { title: "Security Infrastructure", img: "/security-infrastructure.png" },
    { title: "Internet of Things (IoT)", img: "/iot.png" },
  ];

  const values = [
    {
      letter: "N",
      text: "Nusa is Customer Oriented Company - Customer Satisfaction is Utmost Goal",
    },
    {
      letter: "U",
      text: "Unity, Integrity & Professional Team",
    },
    {
      letter: "S",
      text: "Strive for Excellence",
    },
    {
      letter: "A",
      text: "A Law Abiding Company and Community Contributor",
    },
  ];

  const awards = [
    {
      id: 1,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png",
      company: "Microsoft",
      title: "Leading Solutions with World-Class Partners",
      year: "2024",
    },
    {
      id: 2,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png",
      company: "Microsoft",
      title: "Leading Solutions with World-Class Partners",
      year: "2024",
    },
    {
      id: 3,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png",
      company: "Microsoft",
      title: "Leading Solutions with World-Class Partners",
      year: "2024",
    },
    {
      id: 4,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png",
      company: "Microsoft",
      title: "Leading Solutions with World-Class Partners",
      year: "2024",
    },
    {
      id: 5,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png",
      company: "Microsoft",
      title: "Leading Solutions with World-Class Partners",
      year: "2024",
    },
    {
      id: 6,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png",
      company: "Microsoft",
      title: "Leading Solutions with World-Class Partners",
      year: "2024",
    },
  ];

  return (
    <main>
      <section className="bg-blue-950 relative text-white pt-12 py-18 lg:py-12 lg:min-h-[450px] overflow-hidden">
        <div
          className="absolute z-10 top-[-250px] right-[-250px] w-[400px] h-[400px] rounded-full filter blur-xl"
          style={{
            background:
              "radial-gradient(circle, rgba(135,206,250,0.15), rgba(0,128,128,0.1))",
          }}
        ></div>

        <div
          className="absolute  bottom-[-250px] left-[-100px] w-[350px] h-[350px] rounded-full filter blur-xl"
          style={{
            background:
              "radial-gradient(circle, rgba(135,206,250,0.15), rgba(0,128,128,0.1))",
          }}
        ></div>

        <div className="max-w-7xl mx-auto my-auto h-full px-4 relative flex-col flex justify-center">
          <p className="uppercase tracking-wide mb-6 z-20">
            <span className="font-semibold">About</span> Us
          </p>
          <div className="flex justify-between items-center">
            <h2 className="text-4xl lg:text-5xl lg:font-semibold leading-snug mb-10">
              Where Vision
              <br />
              meets Execution
            </h2>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto">
        <div className="-mt-[70px] lg:-mt-[150px] overflow-visible max-w-7xl mx-auto">
          <Swiper
            className="lg:!overflow-visible overflow-hidden z-20 relative "
            modules={[Navigation]}
            loop
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              375: { slidesPerView: 1.1 },
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2.5 },
              1024: { slidesPerView: 1.5 },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            pagination={{ clickable: true }}
            centeredSlides
          >
            {solutions.map((s, idx) => (
              <SwiperSlide key={idx}>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full aspect-[12/7] lg:aspect-[12/5] object-cover"
                  />
                  <div className="p-4 bg-gradient-to-t from-black/50 to-transparent absolute bottom-0 w-full">
                    <p className="text-white font-medium text-xl">{s.title}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="max-w-7xl mx-auto relative px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
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
                className="border aspect-square lg:aspect-auto border-gray-300 rounded-xl bg-white shadow-sm bg-center bg-cover bg-no-repeat bg-card flex flex-col justify-between"
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

      <section className="bg-blue-950 relative text-white pt-12 py-18 lg:py-12 lg:min-h-[450px] overflow-hidden">
        <div
          className="absolute z-10 top-[-250px] right-[-250px] w-[600px] h-[600px] rounded-full filter blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(135,206,250,0.1), rgba(0,128,128,0.1))",
          }}
        ></div>

        <div
          className="absolute  bottom-[-150px] left-[-100px] w-[650px] h-[650px] rounded-full filter blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(135,206,250,0.15), rgba(0,128,128,0.1))",
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 relative">
          <p className="uppercase tracking-wide mb-6 z-20">
            <span className="font-semibold">Our</span> Values
          </p>
          <div className="flex justify-between items-center">
            <h2 className="text-4xl lg:text-5xl lg:font-semibold leading-snug mb-10">
              What We Believes
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {values.map((item, i) => (
              <div
                key={i}
                className="border min-h-[200px] aspect-auto lg:aspect-square p-4 border-gray-300 rounded-xl bg-white shadow-sm bg-top-right bg-cover bg-no-repeat bg-card flex flex-col justify-between"
                style={{ backgroundImage: `url(/bg-card.png)` }}
              >
                <div className="relative border-2 lg:border-3 text-blue-400 text-2xl lg:text-5xl font-bold w-12 h-12 lg:w-26 lg:h-26 flex items-center justify-center rounded-lg lg:rounded-xl overflow-hidden">
                  {item.letter}
                </div>
                <div className="text-lg text-gray-500 py-3 rounded-b-xl">
                  <p className="wrap-all max-w-2xs">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Vision & Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 min-h-[400px] ">
            <div>
              <h3 className="uppercase text-xl mb-2">Vision</h3>
              <p className="text-lg leading-relaxed">
                Nusa Network Prakarsa is a trusted Digital Transformation
                Solutions Partner who is responsible for managing and developing
                the life cycle of our customers’ technology.
              </p>
            </div>
            <div className="lg:items-start items-end flex flex-col justify-end lg:text-left text-right">
              <h3 className="uppercase text-xl mb-2">Mission</h3>
              <p className="text-lg leading-relaxed">
                Provide exceptional service, demonstrate high commitment to
                quality and integrity, develop mutually beneficial relationships
                with our stakeholders, encourage feedback, and foster a
                customer-oriented culture.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="mb-12">
            <p className="uppercase tracking-wide mb-6 z-20">
              Our<span className="font-semibold"> Awards</span>
            </p>
            <h2 className="text-3xl md:text-4xl max-w-md leading-14 font-semibold text-gray-900 mt-2">
              Leading Solutions with World-Class Awards
            </h2>
          </div>

          {/* Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {awards.map((award) => (
              <div
                key={award.id}
                className="rounded-2xl min-h-[230px] border border-gray-200 bg-white p-6 transition flex flex-col justify-between"
              >
                <div className="flex items-center gap-2 mb-4">
                  <img
                    src={award.logo}
                    alt={award.company}
                    className="h-5 object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-lg text-gray-900 max-w-[200px]">
                    {award.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">{award.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
