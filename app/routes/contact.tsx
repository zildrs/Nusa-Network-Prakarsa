import type { Route } from "./+types/contact";
import { useOutletContext } from "react-router";
import {
  ArrowRight,
  Building,
  Email,
  Location,
  Phone,
  User,
  UserFeedback,
} from "@carbon/icons-react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Input } from "~/components/ui/input";
import CTASection from "~/components/cta";
import { createMetaFunction, seoData } from "~/lib/meta";

export function meta({ request }: Route.MetaArgs) {
  const url = new URL(request.url);
  const locale = url.pathname.startsWith("/en") ? "en" : "id";
  const seo = seoData.contact[locale];

  return createMetaFunction({
    title: seo.title,
    description: seo.description,
    canonical: url.origin + url.pathname,
    hreflang: [
      { href: `${url.origin}/en/contact`, hreflang: "en" },
      { href: `${url.origin}/id/contact`, hreflang: "id" },
    ],
  })({ request });
}

export default function Contact() {
  const { t } = useOutletContext<{ t: any; locale: "id" | "en" }>();

  return (
    <main className="w-full">
      {/* Section 1 - Contact Form */}
      <section className="max-w-7xl mx-auto grid lg:grid-cols-2 lg:gap-44 px-6 lg:px-8 py-16">
        {/* Left - Form */}
        <div className="flex flex-col justify-center lg:py-4 pb-12">
          <h2 className="text-4xl font-semibold text-gray-900">
            {t("contact.hero.title")}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {t("contact.hero.description")}
          </p>

          <form className="mt-8 space-y-6 relative w-full">
            <div>
              <label className="block text-sm font-medium text-gray-900">
                {t("contact.form.name")}
                <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder={t("contact.form.namePlaceholder")}
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                {t("contact.form.email")}
                <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                placeholder={t("contact.form.emailPlaceholder")}
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                {t("contact.form.message")}
              </label>
              <Textarea
                placeholder={t("contact.form.messagePlaceholder")}
                className="mt-1 h-[124px]"
              />
            </div>

            <Button
              type="submit"
              className="bg-[#002855] hover:bg-[#001f40] w-full rounded-lg px-6 py-6 text-base"
            >
              {t("contact.form.submitButton")} <ArrowRight />
            </Button>
          </form>
        </div>

        {/* Right - Image */}
        <div className="flex items-center justify-center">
          <img
            src="/hero.png"
            alt="Data Center Team"
            className="rounded-2xl aspect-[3/4] w-full object-cover h-full"
          />
        </div>
      </section>

      {/* Section 2 - Contact Channels */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 relative">
        <img
          src="/bg-solutions.png"
          alt="Background Solution"
          className="absolute block lg:hidden top-0 right-0 opacity-20 max-w-sm"
        />

        <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900">
          {t("contact.channels.title")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 relative">
          {/* Card 1 */}
          <div className="border justify-between rounded-2xl p-6 flex flex-col gap-3 lg:min-h-[320px] bg-white">
            <UserFeedback size={32} className="text-[#002855]" />
            <div className="grid gap-1">
              <h3 className="font-semibold text-lg">
                {t("contact.channels.sales.title")}
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                {t("contact.channels.sales.description")}
              </p>
              <Button
                variant="default"
                className="mt-auto bg-[#002855] hover:bg-[#001f40] w-fit px-5 py-2"
                asChild
              >
                <a href="mailto:sales@usanetwork.com">
                  {t("contact.channels.sales.button")} <ArrowRight />
                </a>
              </Button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="border justify-between rounded-2xl p-6 flex flex-col gap-3 lg:min-h-[320px] bg-white">
            <Email size={32} className="text-[#002855]" />
            <div className="grid gap-1">
              <h3 className="font-semibold text-lg">
                {t("contact.channels.support.title")}
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                {t("contact.channels.support.description")}
              </p>
              <Button
                variant="default"
                className="mt-auto bg-[#002855] hover:bg-[#001f40] w-fit px-5 py-2"
                asChild
              >
                <a href="mailto:support@usanetwork.com">
                  {t("contact.channels.support.button")} <ArrowRight />
                </a>
              </Button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="border justify-between rounded-2xl p-6 flex flex-col gap-3 lg:min-h-[320px] bg-white">
            <Building size={32} className="text-[#002855]" />
            <div className="grid gap-1">
              <h3 className="font-semibold text-lg">
                {t("contact.channels.location.title")}
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                {t("contact.channels.location.description")}
              </p>
              <Button
                variant="default"
                className="mt-auto bg-[#002855] hover:bg-[#001f40] w-fit px-5 py-2"
                asChild
              >
                <a
                  href="https://maps.google.com/?q=Jalan+Kamal+Raya+Outer+Ring+Road,+Mutiara+Taman+Palem+A17+29-30,+Kelurahan+Cengkareng+Timur,+Kecamatan+Cengkareng,+Jakarta+Barat,+11730"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("contact.channels.location.button")} <ArrowRight />
                </a>
              </Button>
            </div>
          </div>

          {/* Card 4 */}
          <div className="border justify-between rounded-2xl p-6 flex flex-col gap-3 lg:min-h-[320px] bg-white">
            <Phone size={32} className="text-[#002855]" />
            <div className="grid gap-1">
              <h3 className="font-semibold text-lg">
                {t("contact.channels.phone.title")}
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                {t("contact.channels.phone.description")}
              </p>
              <Button
                variant="default"
                className="mt-auto bg-[#002855] hover:bg-[#001f40] w-fit px-5 py-2"
                asChild
              >
                <a href="tel:+622154353007">
                  {t("contact.channels.phone.number")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <div className="lg:hidden block">
        <CTASection />
      </div>
    </main>
  );
}
