import { useEffect, useState } from "react";
import type { Route } from "./+types/home";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ArrowRight } from "@carbon/icons-react";
import CTASection from "~/components/cta";
import CaseStudyCard from "~/components/case-study-card";
import { useLoaderData } from "react-router";
import { solutions } from "~/loaders/solutions";
import { fetchProjectsData } from "~/lib/api.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const slug = url.pathname.split("/").pop() as keyof typeof solutions;
  const { projects } = await fetchProjectsData(request);
  return { ...solutions[slug], slug, projects };
}

export default function Home() {
  const [Marquee, setMarquee] = useState<any>(null);

  const data = useLoaderData<typeof loader>();

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
            <span className="font-semibold">{data.title}</span> Solutions
          </p>
          <h1 className="mt-4 text-4xl lg:text-5xl font-semibold leading-tight lg:w-[589px]">
            {data.hero_title}
          </h1>
          <p className="mt-6 text-xl max-w-lg text-gray-200">
            {data.hero_subtitle}
          </p>
          <div className="mt-8">
            <a
              href={data.hero_cta_link}
              className="w-fit bg-white flex items-center text-blue-950 px-4 py-2 rounded-lg font-medium shadow hover:bg-gray-100 transition"
            >
              {data.hero_cta}{" "}
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
              className="bg-primary inline-flex items-center text-white px-4 py-2 rounded-lg hover:bg-[#19376D] transition"
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
              <p className="text-sm ">
                <span className="font-semibold">WHAT</span> WE DO
              </p>
              <h2 className="text-4xl font-semibold text-gray-900 mt-2">
                {data.what_we_do_title}
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                {data.what_we_do_subtitle}
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
            <span className="font-semibold">OUR</span>{" "}
            {data.title.toUpperCase()} SERVICES
          </p>
          <h2 className="text-3xl lg:text-5xl font-medium tracking-normal mt-2">
            Solutions that fit <br /> your infrastructure needs
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
            <span className="font-semibold">Case</span> Study
          </p>
          <h2 className="text-3xl lg:text-4xl font-semibold mb-8 max-w-md">
            Customer Success with Nusa Network Prakarsa
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
          <span className="font-semibold">Technology</span> Partners
        </p>
        <h2 className="mt-2 text-3xl lg:text-4xl max-w-2xl font-semibold text-gray-900 leading-snug">
          Simplifying Complex Hybrid IT with World-Class Technology Partners
        </h2>
        <a
          href="#"
          className="my-8 hidden lg:inline-flex items-center font-medium"
        >
          Learn More <ArrowRight className="ml-2 h-5 w-5" />
        </a>
        <a href="#" className="my-8 flex items-center font-medium lg:hidden">
          Learn More <ArrowRight className="ml-2 h-5 w-5" />
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
        title={data.cta_title}
        link={data.cta_link}
        linkText={data.cta_text}
        description={data.cta_subtitle}
      />
    </main>
  );
}
