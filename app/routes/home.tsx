import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ArrowLeft, ArrowRight } from "@carbon/icons-react";
import type { Swiper as SwiperRef } from "swiper/types";
import CTASection from "~/components/cta";
import CaseStudyCard from "~/components/case-study-card";
import {
  useLoaderData,
  useOutletContext,
  type LoaderFunctionArgs,
} from "react-router";
import {
  fetchHomeData,
  fetchProjectsData,
  fetchSolutionsData,
  fetchTestimonialsData,
} from "~/lib/api.server";
import { createMetaFunction, seoData } from "~/lib/meta";
import { API_BASE_URL } from "~/lib/utils";
import { solutionsMenu } from "~/components/header";
import type { Locale } from "~/i18n";

export const meta = createMetaFunction(seoData.home);

export async function loader({ request }: LoaderFunctionArgs) {
  const [{ solutions }, { projects }, { testimonies }, home] =
    await Promise.all([
      fetchSolutionsData(request),
      fetchProjectsData(request),
      fetchTestimonialsData(request),
      fetchHomeData(request),
    ]);

  return { solutions, projects, testimonies, home };
}

export default function Home() {
  const swiperRef = useRef<SwiperRef | null>(null);
  const [Marquee, setMarquee] = useState<any>(null);
  const { t } = useOutletContext<{ t: any; locale: Locale }>();
  const { projects, testimonies, home } = useLoaderData<typeof loader>();

  useEffect(() => {
    import("react-fast-marquee").then((mod) => {
      setMarquee(() => mod.default);
    });
  }, []);

  const stats = [
    { value: 150, label: t("home.stats.projectsAccomplished") },
    { value: 100, label: t("home.stats.clientsSuccess") },
    { value: 32, label: t("home.stats.technologyPartners") },
    { value: 15, label: t("home.stats.amazingAwards") },
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
            <h1
              data-aos="fade-up"
              className="text-5xl text-[40px] lg:text-[64px] leading-[50px] lg:leading-[80px] tracking-[-0.02em] font-semibold col-span-6"
            >
              {home?.hero_title ?? t("home.hero.title")}
            </h1>
            {/* Right Side - Hero Image */}
            <p
              data-aos="fade-left"
              className="text-gray-500 mt-4 text-xl lg:text-xl col-span-2"
            >
              {home?.hero_subtitle ?? t("home.hero.subtitle")}
            </p>
          </div>
        </div>
        <img
          src="/hero.png"
          className="w-full aspect-[3/3] lg:aspect-[8/3] object-cover"
          alt="Server Room"
        />
        {/* Partner Logos */}
        <div className="lg:p-[64px] py-[64px] ">
          <div data-aos="fade-up" className="max-w-7xl mx-auto px-4">
            <p className="text-center text-xs lg:text-lg tracking-[4px] leading-[18px] lg:tracking-[0.2em] text-gray-500 mb-12 lg:w-[80%] mx-auto">
              {t("home.hero.trustedBy")}
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
        <div className="max-w-7xl justify-between mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <h2
              data-aos="fade-up"
              className="text-[32px] lg:text-[40px] font-semibold leading-snug"
            >
              {t("home.consultant.heading")}
            </h2>
            <p
              data-aos="fade-up"
              className="text-gray-500 mt-4 leading-7 text-base lg:text-lg"
            >
              {t("home.consultant.description1")}
            </p>
            <p
              data-aos="fade-up"
              className="text-gray-500 mt-4 leading-7 text-base lg:text-lg"
            >
              {t("home.consultant.description2")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 h-full">
            {stats.map((item, i) => (
              <div
                key={item.label}
                data-aos="fade-up"
                data-aos-delay={200 * (i + 1)}
                className="border border-gray-200 rounded-xl aspect-square lg:aspect-auto bg-center bg-cover bg-no-repeat bg-card flex flex-col justify-between"
                style={{ backgroundImage: `url(/bg-card.png)` }}
              >
                <div className="lg:text-4xl text-[32px] font-semibold p-4 lg:p-6">
                  {item.value}+
                </div>
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

      <section className="bg-primary relative text-white pt-12 py-18 lg:py-12  overflow-hidden">
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
          className="absolute z-0 bottom-[-250px] left-[-100px] w-[600px] h-[600px] rounded-full filter blur-xl"
          style={{
            background:
              "radial-gradient(circle, rgba(135,206,250,0.15), rgba(0,128,128,0.1))",
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 relative">
          <p data-aos="fade-up" className="uppercase tracking-wide mb-6 z-20">
            <span className="font-semibold">{t("home.solutions.our")}</span>{" "}
            {t("home.solutions.solutions")}
          </p>
          <div className="flex justify-between items-center">
            <h2
              data-aos="fade-up"
              className="text-[32px] max-w-4xl lg:text-5xl font-semibold lg:font-semibold leading-snug mb-10"
            >
              {t("home.solutions.subtitle")} <br />
            </h2>
            <div className="z-10 hidden lg:flex gap-8">
              <button
                data-aos="fade-right"
                onClick={() => swiperRef.current?.slidePrev()}
                className="p-3 bg-white rounded-lg hover:bg-gray-300"
              >
                <ArrowLeft className="text-gray-700" />
              </button>
              <button
                data-aos="fade-left"
                onClick={() => swiperRef.current?.slideNext()}
                className="p-3 bg-white rounded-lg hover:bg-gray-300"
              >
                <ArrowRight className="text-gray-700" />
              </button>
            </div>
          </div>

          <Swiper
            data-aos="fade-left"
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
            {solutionsMenu.map((s, idx) => (
              <SwiperSlide key={idx}>
                <a href={`/solution/${s.slug}`} className="rounded-xl overflow-hidden relative group z-50 bg-gradient-to-t from-black/50 to-transparent">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full aspect-[3/5] rounded-xl  lg:aspect-[3/4] object-cover group-hover:blur-xs transition-all duration-500"
                  />
                  <div
                    className="absolute cursor-pointer bottom-8 left-0 right-0 translate-y-8 transition-all duration-500 ease-out group-hover:translate-y-0"
                  >
                    <div className="p-4 mb-8 absolute bottom-0 w-full">
                      <p className="text-white font-medium text-xl">
                        {s.title}
                      </p>
                    </div>
                    <div className="flex mt-4 pl-4 items-center  gap-2 opacity-0 group-hover:opacity-100 duration-500 transition-all">
                      <p className="text-white font-medium">Learn more</p>
                      <ArrowRight className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Section 2 - Case Study */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <p
            data-aos="fade-up"
            className="uppercase text-sm tracking-wide text-gray-900 mb-2"
          >
            <span className="font-semibold">{t("home.caseStudy.case")}</span>{" "}
            {t("home.caseStudy.study")}
          </p>
          <h2
            data-aos="fade-up"
            className="text-[32px] lg:text-4xl font-semibold mb-8 max-w-md"
          >
            {t("home.caseStudy.title")}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((c, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={200 * (idx + 1)}
              >
                <CaseStudyCard data={c} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <p
            data-aos="fade-up"
            className="uppercase tracking-wide text-gray-900 mb-2"
          >
            {t("home.testimonials.our")}{" "}
            <span className="font-semibold">
              {t("home.testimonials.clients")}
            </span>
          </p>
          <h2
            data-aos="fade-up"
            className="text-4xl font-semibold mb-8 max-w-xl"
          >
            {t("home.testimonials.title")}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonies.slice(0, 6).map((t, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={200 * (idx + 1)}
                className="bg-white rounded-2xl  border border-gray-200 flex flex-col justify-between"
              >
                <p className="text-gray-700 mb-4 leading-relaxed p-6">
                  “{t.description}”
                </p>
                <div className="flex items-center gap-3 bg-gray-50 px-6 py-4 rounded-b-2xl">
                  <div>
                    <p className="font-medium mb-2">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.position}</p>
                  </div>
                  <img
                    src={API_BASE_URL + t.company_logo.url}
                    alt="Company Logo"
                    className="ml-auto h-10 max-w-20 object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-6">
        <p
          data-aos="fade-up"
          className=" tracking-widest text-gray-900 uppercase"
        >
          <span className="font-semibold">
            {t("home.technologyPartners.technology")}
          </span>{" "}
          {t("home.technologyPartners.partners")}
        </p>
        <h2
          data-aos="fade-up"
          className="mt-2 text-3xl lg:text-4xl max-w-lg font-semibold text-gray-900 leading-snug"
        >
          {t("home.technologyPartners.heading")}
        </h2>

        <a
          data-aos="fade-right"
          href="/partners"
          className="my-8 flex items-center font-medium"
        >
          {t("home.technologyPartners.cta")}{" "}
          <ArrowRight className="ml-2 h-5 w-5" />
        </a>

        {/* Logo carousel (contoh pakai flex biasa, bisa ganti swiper/marquee) */}
        {Marquee && (
          <Marquee
            data-aos="fade-up"
            className="mt-16"
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

      <CTASection title={t("home.cta.title")} linkText={t("home.cta.button")} />
    </main>
  );
}
