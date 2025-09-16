import { useEffect, useState, useRef } from "react";
import type { Route } from "./+types/home";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { Swiper as SwiperRef } from "swiper/types";
import CTASection from "~/components/cta";
import { useOutletContext } from "react-router";
import { createMetaFunction, seoData } from "~/lib/meta";
import { createOrganizationSchema } from "~/lib/seo";

export const meta = createMetaFunction(seoData.about);

export default function About() {
  const swiperRef = useRef<SwiperRef | null>(null);
  const { t } = useOutletContext<{ t: any; locale: "id" | "en" }>();

  const stats = [
    { value: "150+", label: t("home.stats.projectsAccomplished") },
    { value: "100+", label: t("home.stats.clientsSuccess") },
    { value: "32+", label: t("home.stats.technologyPartners") },
    { value: "15+", label: t("home.stats.amazingAwards") },
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
      text: t("about.mission.principles.n"),
    },
    {
      letter: "U",
      text: t("about.mission.principles.u"),
    },
    {
      letter: "S",
      text: t("about.mission.principles.s"),
    },
    {
      letter: "A",
      text: t("about.mission.principles.a"),
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
    <main className="overflow-hidden">
      <section className="bg-primary relative text-white pt-12 py-18 lg:py-12 lg:min-h-[450px] overflow-hidden">
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
            <span className="font-semibold">{t("about.label.about")}</span>{" "}
            {t("about.label.us")}
          </p>
          <div className="flex justify-between items-center">
            <h2 className="text-4xl max-w-md lg:text-5xl lg:font-semibold leading-snug mb-10">
              {t("about.hero.subtitle")}
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
                <div className="rounded-xl overflow-hidden">
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

        <div className="max-w-7xl justify-between mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <h2 className="text-[32px] lg:text-[40px] font-semibold leading-snug">
              {t("home.consultant.heading")}
            </h2>
            <p className="text-gray-500 mt-4 leading-7 text-base lg:text-lg">
              {t("home.consultant.description1")}
            </p>
            <p className="text-gray-500 mt-4 leading-7 text-base lg:text-lg">
              {t("home.consultant.description2")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 h-full">
            {stats.map((item) => (
              <div
                key={item.label}
                className="border border-gray-200 rounded-xl aspect-square lg:aspect-auto bg-center bg-cover bg-no-repeat bg-card flex flex-col justify-between"
                style={{ backgroundImage: `url(/bg-card.png)` }}
              >
                <p className="lg:text-4xl text-[32px] font-semibold p-4 lg:p-6">
                  {item.value}
                </p>
                <div className="text-lg text-gray-500 bg-gray-50 p-3 rounded-b-xl">
                  <p className="lg:w-42 wrap-all text-sm lg:text-base">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary relative text-white pt-12 py-18 lg:py-12 lg:min-h-[450px] overflow-hidden">
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
            <span className="font-semibold">{t("about.values.our")}</span>{" "}
            {t("about.values.values")}
          </p>
          <div className="flex justify-between items-center">
            <h2 className="text-4xl lg:text-5xl lg:font-semibold leading-snug mb-10">
              {t("about.values.subtitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {values.map((item, i) => (
              <div
                key={i}
                className="border min-h-[200px] aspect-auto lg:aspect-square p-4 border-gray-300 rounded-xl shadow-sm bg-top-right bg-cover bg-no-repeat bg-card flex flex-col justify-between"
                style={{ backgroundImage: `url(/bg-card.png)` }}
              >
                <img
                  className="w-24"
                  src={`/about/${item.letter}.png`}
                  alt={item.letter}
                />
                <div className="text-lg text-gray-500 py-3 rounded-b-xl">
                  <p className="wrap-all max-w-2xs">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Vision & Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 min-h-[400px] ">
            <div>
              <h3 className="uppercase text-xl mb-2">
                {t("about.vision.title")}
              </h3>
              <p className="text-lg leading-relaxed">
                {t("about.vision.description")}
              </p>
            </div>
            <div className="lg:items-start items-end flex flex-col justify-end lg:text-left text-right">
              <h3 className="uppercase text-xl mb-2">
                {t("about.mission.title")}
              </h3>
              <p className="text-lg leading-relaxed">
                {t("about.mission.description")}
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
              {t("about.achievement.our")}{" "}
              <span className="font-semibold">
                {" "}
                {t("about.achievement.achievement")}
              </span>
            </p>
            <h2 className="text-3xl md:text-4xl max-w-md leading-14 font-semibold text-gray-900 mt-2">
              {t("about.achievement.subtitle")}
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

      <CTASection
        title={t("about.services.title")}
        linkText={t("about.services.cta")}
      />
    </main>
  );
}
