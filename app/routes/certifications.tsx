import CTASection from "~/components/cta";
import type { Route } from "./+types/certifications";
import { useLoaderData, useOutletContext } from "react-router";
import { createMetaFunction, seoData } from "~/lib/meta";
import { fetchCertificationsData } from "~/lib/api.server";
import { APP_BASE_URL } from "~/lib/utils";

export const meta = createMetaFunction(seoData["certifications"]);

export async function loader({ request }: Route.LoaderArgs) {
  const { certifications } = await fetchCertificationsData(request);
  return { certifications };
}

export default function Certification() {
  const { t } = useOutletContext<{ t: any; locale: "id" | "en" }>();
  const { certifications } = useLoaderData<typeof loader>();
  return (
    <main>
      <section className="bg-primary relative text-white pt-12 py-18 lg:py-12 lg:min-h-[350px] overflow-hidden">
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

        <div className="max-w-7xl mx-auto my-auto lg:min-h-[250px] px-4 relative flex-col flex justify-center">
          <p data-aos="fade-up" className="uppercase tracking-wide mb-6 z-20">
            <span className="font-semibold">{t("achievement.title")}</span>
          </p>
          <div className="flex justify-between items-center">
            <h2 data-aos="fade-up" className="text-4xl lg:text-5xl lg:font-semibold leading-snug mb-10">
              {t("achievement.subtitle")}
            </h2>
          </div>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {certifications.map((item, i) => (
            <div
              data-aos="fade-up" data-aos-delay={100 * (i + 1)}
              key={i}
              className="border rounded-2xl p-6  bg-white transition"
            >
              <img
                src={APP_BASE_URL + item.certification_img.url}
                alt={item.name}
                className="h-8 mb-4"
              />
              <h3 className="text-base font-medium text-gray-900 mb-2 max-w-3xs line-clamp-2">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500">{item.year}</p>
            </div>
          ))}
        </div>
      </section>
      <CTASection />
    </main>
  );
}
