import type { Route } from "./+types/case-study";
import { useLoaderData, type MetaFunction } from "react-router";
import { ArrowRight } from "@carbon/icons-react";
import CTASection from "~/components/cta";
import CaseStudyCard from "~/components/case-study-card";
import {
  fetchProjectBySlug,
  fetchProjectsData,
  fetchSolutionsData,
} from "~/lib/api.server";
import { APP_BASE_URL } from "~/lib/utils";
import BlogContent from "~/components/blog/blog-content";
import NotFoundPage from "./404";

export async function loader({
  request,
  params,
}: Route.LoaderArgs & { params: { slug: string } }) {
  const slug = params.slug;
  const [project, { solutions, locale }, { projects }] = await Promise.all([
    fetchProjectBySlug(request, slug),
    fetchSolutionsData(request),
    fetchProjectsData(request),
  ]);

  return { project, solutions, locale, projects };
}

export const meta: MetaFunction<typeof loader> = (args) => {
  const { data } = args as { data: Awaited<ReturnType<typeof loader>> };
  const { project } = data;
  if (!project) return [{ title: "Not found" }];

  return [
    { title: `${project.title} | Nusa Network` },
    { name: "description", content: project.title },
    { property: "og:title", content: `${project.title} | Nusa Network` },
    { property: "og:description", content: project.title },
    { property: "og:image", content: project.banner.url },
  ];
};

export default function CaseStudyDetail() {
  const { project, solutions, locale, projects } =
    useLoaderData<typeof loader>();

  if (!project) return <NotFoundPage />;
  return (
    <main>
      <section className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-10 grid gap-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_2024_Perum_Peruri.svg/2560px-Logo_2024_Perum_Peruri.svg.png"
            alt="Peruri Logo"
            className="h-8 lg:h-10 mb-4"
          />
          <h1 className="text-2xl lg:text-3xl max-w-3xl md:text-4xl font-bold leading-relaxed">
            {project?.title}
          </h1>
        </div>

        {/* Image */}
        <div className="rounded-lg lg:rounded-xl overflow-hidden mb-12">
          <img
            src={APP_BASE_URL + project?.banner?.url}
            alt="Project Banner"
            className="w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* Left Content */}
          <div className="md:col-span-2 space-y-8 leading-relaxed lg:order-1 order-2">
            <BlogContent content={project?.content} />
          </div>

          {/* Right Highlight Card */}
          <div
            className="rounded-2xl lg:order-2 order-1 grid gap-3 lg:gap-8 h-fit border border-gray-200 shadow-sm p-3 lg:p-6 text-gray-800 bg-cover bg-no-repeat bg-center max-w-sm"
            style={{ backgroundImage: "url('/bg-card-2.png')" }}
          >
            {/* Metric 1 */}
            <div className="mb-6">
              <p data-aos="fade-down" className="text-2xl lg:text-3xl font-semibold lg:font-medium flex items-center gap-2">
                50% <span data-aos="fade-down" className="text-red-500 text-xl">↓</span>
              </p>
              <p data-aos="fade-down" className="mt-2 text-gray-400 text-sm lg:text-base">
                Reduction in network latency
              </p>
            </div>

            {/* Metric 2 */}
            <div className="mb-6">
              <p data-aos="fade-up" className="text-2xl lg:text-3xl font-semibold lg:font-medium flex items-center gap-2">
                30% <span data-aos="fade-up" className="text-green-500 text-xl">↑</span>
              </p>
              <p data-aos="fade-up" className="mt-2 text-gray-400 text-sm lg:text-base">
                Improvement in application performance
              </p>
            </div>

            {/* CTA */}
            <div>
              <p data-aos="fade-up" className="text-base lg:text-xl font-semibold lg:font-medium mb-6">
                Ready to solve your challenges?
              </p>
              <a
                data-aos="fade-up"
                href={locale === "en" ? "/contact" : "/id/hubungi-kami"}
                className="bg-primary w-fit hover:bg-primary text-white px-5 py-3 rounded-lg flex items-center gap-2 transition"
              >
                Contact our experts <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="grid gap-4">
        <section className="bg-gray-50 py-12 lg:order-1 order-2">
          <div className="max-w-7xl mx-auto px-4">
            <p data-aos="fade-up" className="uppercase text-sm tracking-wide text-gray-900 mb-2">
              <span className="font-semibold">Case</span> Study
            </p>
            <h2 data-aos="fade-up" className="text-3xl lg:text-4xl font-semibold mb-8 max-w-md">
              Customer Success with Nusa Network Prakarsa
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {projects.map((c, idx) => (
                <div data-aos="fade-up" data-aos-delay={100 * (idx + 1)} key={idx} >
                  <CaseStudyCard  data={c} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="order-1 lg:order-2">
          <CTASection />
        </div>
      </div>
    </main>
  );
}
