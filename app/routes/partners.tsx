import { useState } from "react";
import type { Route } from "./+types/partners";
import { useLoaderData, useOutletContext } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import { createMetaFunction, seoData } from "~/lib/meta";
import {
  fetchPartnersData,
  fetchProjectsData,
} from "~/lib/api.server";
import type { PartnerType } from "~/types/partner";
import { API_BASE_URL } from "~/lib/utils";
import type { Locale } from "~/i18n";

export const meta = createMetaFunction(seoData.partners);

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const [{ partners }, { projects }] = await Promise.all([
      fetchPartnersData(request),
      fetchProjectsData(request),
    ]);

    return { 
      partners: partners || [], 
      projects: projects || [], 
      error: null 
    };
  } catch (error) {
    console.error("Error loading partners data:", error);
    return { 
      partners: [], 
      projects: [], 
      error: "Failed to load partners data" 
    };
  }
}

export default function Partner() {
  const { t, locale } = useOutletContext<{ t: any; locale: Locale }>();
  const { partners, projects, error } = useLoaderData<typeof loader>();
  const [selected, setSelected] = useState<PartnerType | null>(null);
  const [brokenImages, setBrokenImages] = useState<Set<string>>(new Set());

  // Filter out partners without logos to prevent rendering errors
  const validPartners = partners.filter(
    (p) => p.company_logo && p.company_logo.url
  );

  const handleImageError = (imageId: string) => {
    setBrokenImages(prev => new Set(prev).add(imageId));
  };

  return (
    <div className="relative min-h-[80vh] bg-white border-b border-gray-200">
      {/* Section Title */}
      <img
        src="/bg-solutions.png"
        alt="Background Solution"
        className="absolute top-0 right-0 opacity-10 max-w-md lg:max-w-3xl"
      />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2
          data-aos="fade-up"
          className="text-5xl font-medium lg:font-semibold text-gray-900"
        >
          {t("partners.hero.title")}
        </h2>
        <p data-aos="fade-up" className="mt-4 text-lg text-gray-600 max-w-2xl">
          {t("partners.hero.description")}
        </p>
      </div>

      {/* Partners Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">{error}</p>
            <p className="text-gray-500 mt-2">Please try again later.</p>
          </div>
        )}
        
        {!error && validPartners.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {t("partners.empty") || "No partners available at the moment."}
            </p>
          </div>
        )}
        
        {!error && validPartners.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 items-center justify-center">
            {validPartners.map((p, i) => {
              const imageId = `partner-${p.documentId || p.id}`;
              const isImageBroken = brokenImages.has(imageId);
              
              return (
                <button
                  key={p.documentId || p.id}
                  onClick={() => setSelected(p)}
                  data-aos="fade-up"
                  data-aos-delay={100 * (i + 1)}
                  className="flex justify-center grayscale min-h-[150px] items-center hover:grayscale-0 transition hover:scale-105 hover:cursor-pointer"
                >
                  {!isImageBroken && (
                    <img
                      src={API_BASE_URL + p.company_logo.url}
                      alt={p.name}
                      className="h-12 object-contain"
                      onError={() => handleImageError(imageId)}
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="relative px-4">
        <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
          <DialogContent className="max-w-2xl lg:min-w-xl p-0 overflow-hidden">
            {/* Modal Content */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left side */}
              <div className=" py-12 px-8">
                {selected?.company_logo?.url && !brokenImages.has(`selected-${selected.documentId || selected.id}`) && (
                  <img
                    src={API_BASE_URL + selected.company_logo.url}
                    alt={selected.name}
                    className="h-10 mb-4"
                    onError={() => handleImageError(`selected-${selected.documentId || selected.id}`)}
                  />
                )}
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold text-left">
                    {selected?.name}
                  </DialogTitle>
                  <DialogDescription className="text-gray-500 text-lg mt-2 text-left">
                    {selected?.description}
                  </DialogDescription>
                </DialogHeader>
              </div>

              {/* Right side */}
              <div className=" rounded-r-2xl text-lg bg-gray-50 py-12 px-8">
                <h3 className="font-semibold text-2xl mb-2">
                  {t("partners.modal.solutions")}
                </h3>
                <ul className="list-disc list-inside text-gray-500 space-y-1">
                  {selected?.solutions && selected.solutions.length > 0 ? (
                    selected.solutions.map((s) => (
                      <li key={s.documentId || s.id}>{s.name}</li>
                    ))
                  ) : (
                    <li className="list-none">{t("partners.modal.noSolutions") || "No solutions available"}</li>
                  )}
                </ul>

                <h3 className="font-semibold mt-4 mb-2">
                  {t("partners.modal.related")}
                </h3>

                {(() => {
                  const relatedProjects = projects.filter((p) =>
                    selected?.solutions?.some((s) => s.id === p.solution?.id)
                  ).slice(0, 2);

                  return relatedProjects.length > 0 ? (
                    relatedProjects.map((p) => (
                      <div key={p.documentId || p.id} className="mb-2">
                        <a
                          href={`${locale === "id" ? "/id/studi-kasus" : "/case-study"}/${p.slug}`}
                          className="text-blue-600 underline hover:text-blue-800 line-clamp-3 block"
                        >
                          • {p.title}
                        </a>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">{t("partners.modal.noRelated") || "No related projects available"}</p>
                  );
                })()}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
