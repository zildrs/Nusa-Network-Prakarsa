import { useEffect, useState } from "react";
import type { Route } from "./+types/home";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ArrowRight } from "@carbon/icons-react";
import CTASection from "~/components/cta";
import CaseStudyCard from "~/components/case-study-card";
import {
  useLoaderData,
  useOutletContext,
  type MetaFunction,
} from "react-router";
import { solutions } from "~/data/solutions";
import { fetchProjectsData } from "~/lib/api.server";
import { createMetaFunction, seoData } from "~/lib/meta";

type SolutionSlug = keyof typeof seoData;
export const meta: MetaFunction = (args) => {
  const { location, params } = args;
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://nusanetwork.com";

  const url = new URL(location.pathname + location.search, origin);
  const searchParams = new URLSearchParams(url.search);

  // ambil slug dari params
  const rawSlug = params.slug as SolutionSlug | undefined;

  // cek valid slug
  const slug: SolutionSlug | null =
    rawSlug && rawSlug in seoData ? (rawSlug as SolutionSlug) : null;

  // ambil locale dari query param
  const locale = searchParams.get("locale") === "en" ? "en" : "id";

  const seo =
    (slug && seoData[slug]?.[locale]) ??
    ({
      title: "Solution",
      description: "Detail Solution",
    } as const);

  // ✅ langsung kembalikan MetaFunction
  return createMetaFunction(seo)(args);
};

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const slug = url.pathname.split("/").pop() as keyof typeof solutions;
  const { projects } = await fetchProjectsData(request);
  return { ...solutions[slug], slug, projects };
}

export default function Home() {
  const [Marquee, setMarquee] = useState<any>(null);

  const data = useLoaderData<typeof loader>();
  const { t } = useOutletContext<{ t: any; locale: "id" | "en" }>();

  useEffect(() => {
    import("react-fast-marquee").then((mod) => {
      setMarquee(() => mod.default);
    });
  }, []);

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
    <main className="relative">
      <section className="relative bg-primary text-white min-h-screen lg:min-h-screen">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('${data.hero_img}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: "scaleX(-1)", // hanya gambar yang mirror
            }}
          />

          {/* layer gradient (tetap normal) */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(274deg, rgba(4, 42, 77, 0) 36.52%, #042A4D 68.52%)",
            }}
          />
        </div>

        <div className="relative flex flex-col justify-end container mx-auto px-6 py-28 lg:py-40 max-w-7xl">
          <p className="uppercase text-sm tracking-wide">
            <span className="font-semibold">{data.title}</span>{" "}
            {t(`solutionsDetail.${data.slug}.hero.title`)}
          </p>
          <h1 className="mt-4 text-4xl lg:text-5xl font-semibold leading-tight lg:w-[589px]">
            {t(`solutionsDetail.${data.slug}.hero.subtitle`)}
          </h1>
          <p className="mt-6 text-xl max-w-lg text-gray-200">
            {t(`solutionsDetail.${data.slug}.hero.description`)}
          </p>
          <div className="mt-8">
            <a
              href={data.hero_cta_link}
              className="w-fit bg-white flex items-center text-blue-950 px-4 py-2 rounded-lg font-medium shadow hover:bg-gray-100 transition"
            >
              {t(`solutionsDetail.${data.slug}.hero.cta`)}{" "}
              <ArrowRight className="inline-block ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="relative lg:block hidden">
        <div className="absolute bottom-0 left-0 w-full bg-white">
          <div className="container mx-auto px-6 max-w-7xl py-4 flex justify-between items-center text-sm font-medium">
            <div className="flex gap-8 text-gray-700 text-base">
              <a href="#" className="hover:text-blue-950">
                {t(`solutionsDetail.${data.slug}.navigation.whatWeDo`)}
              </a>
              <a href="#" className="hover:text-blue-950">
                {t(`solutionsDetail.${data.slug}.navigation.ourServices`)}
              </a>
              <a href="#" className="hover:text-blue-950">
                {t(`solutionsDetail.${data.slug}.navigation.caseStudy`)}
              </a>
              <a href="#" className="hover:text-blue-950">
                {t(`solutionsDetail.${data.slug}.navigation.ourPartners`)}
              </a>
            </div>

            <a
              href="#"
              className="bg-primary inline-flex items-center text-white px-4 py-2 rounded-lg hover:bg-[#19376D] transition"
            >
              {t(`solutionsDetail.${data.slug}.navigation.consultFree`)}{" "}
              <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="container max-w-7xl px-6 py-18 lg:py-12 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center">
              <p className="text-sm ">
                <span className="font-semibold">
                  {t(`solutionsDetail.${data.slug}.whatWeDo.label`)}
                </span>
              </p>
              <h2 className="text-4xl font-semibold text-gray-900 mt-2">
                {t(`solutionsDetail.${data.slug}.whatWeDo.title`)}
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                {t(`solutionsDetail.${data.slug}.whatWeDo.description`)}
              </p>
            </div>
            <div className="min-h-[450px] lg:overflow-visible overflow-hidden">
              <img
                src={data.what_we_do_img}
                alt="server"
                className="absolute min-h-[350px] sm:max-h-[250px] right-0 top-1/2 transform lg:-translate-y-1/2 lg:w-[40vw] w-[95vw] object-cover rounded-l-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 1 - Services */}
      <section className="bg-gradient-to-r from-[#0A2A5E] to-[#063970] text-white py-16 px-6 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm ">
            <span className="font-semibold">
              {t(`solutionsDetail.${data.slug}.services.label`)}
            </span>
          </p>
          <h2 className="text-3xl lg:text-5xl font-medium tracking-normal mt-2">
            {t(`solutionsDetail.${data.slug}.services.title`)}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {data.services.map((service, i) => {
              const Icon = solutions[data.slug].services[i].icon;
              return (
                <div
                  key={i}
                  style={{ backgroundImage: "url('/bg-card-2.png')" }}
                  className="bg-white max-h-[250px] h-full flex flex-col justify-between aspect-[6/3] text-gray-800 p-6 rounded-xl"
                >
                  <div className="text-3xl mb-4">
                    <Icon size={32} />
                  </div>
                  <h3 className="font-semibold lg:text-xl">{service.title}</h3>
                  <p className="text-gray-400 block lg:hidden">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/*  */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <p className="uppercase text-sm tracking-wide text-gray-900 mb-2">
            <span className="font-semibold">
              {t(`solutionsDetail.${data.slug}.caseStudy.label`)}
            </span>
          </p>
          <h2 className="text-3xl lg:text-4xl font-semibold mb-8 max-w-md">
            {t(`solutionsDetail.${data.slug}.caseStudy.title`)}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {data.projects.slice(0, 3).map((c, idx) => (
              <CaseStudyCard key={idx} data={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4">
        <p className=" tracking-widest text-gray-900 uppercase">
          <span className="font-semibold">
            {t(`solutionsDetail.${data.slug}.technologyPartners.label`)}
          </span>
        </p>
        <h2 className="mt-2 text-3xl lg:text-4xl max-w-2xl font-semibold text-gray-900 leading-snug">
          {t(`solutionsDetail.${data.slug}.technologyPartners.title`)}
        </h2>
        <a
          href="#"
          className="my-8 hidden lg:inline-flex items-center font-medium"
        >
          {t(`solutionsDetail.${data.slug}.technologyPartners.cta`)}{" "}
          <ArrowRight className="ml-2 h-5 w-5" />
        </a>
        <a href="#" className="my-8 flex items-center font-medium lg:hidden">
          {t(`solutionsDetail.${data.slug}.technologyPartners.cta`)}{" "}
          <ArrowRight className="ml-2 h-5 w-5" />
        </a>

        {/* Logo carousel (contoh pakai flex biasa, bisa ganti swiper/marquee) */}
        {Marquee && (
          <Marquee
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

      <CTASection
        title={t(`solutionsDetail.${data.slug}.cta.title`)}
        link={data.cta_link}
        linkText={t(`solutionsDetail.${data.slug}.cta.button`)}
        description={t(`solutionsDetail.${data.slug}.cta.description`)}
      />
    </main>
  );
}
