import type { Route } from "./+types/contact";
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

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact" },
    { name: "description", content: "Get in touch with us" },
  ];
}

export default function Contact() {
  return (
    <main className="w-full">
      {/* Section 1 - Contact Form */}
      <section className="max-w-7xl mx-auto grid lg:grid-cols-2 lg:gap-44 px-6 lg:px-8 py-16">
        {/* Left - Form */}
        <div className="flex flex-col justify-center lg:py-4 pb-12">
          <h2 className="text-4xl font-semibold text-gray-900">Contact Us</h2>
          <p className="mt-4 text-lg text-gray-600">
            Let’s talk about how Nusa Network Prakarsa can deliver the right
            solutions for your unique IT needs.
          </p>

          <form className="mt-8 space-y-6 relative w-full">
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Name<span className="text-red-500">*</span>
              </label>
              <Input type="text" placeholder="Your Name" className="mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Your Business Mail<span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                placeholder="example@usanetwork.com"
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Message
              </label>
              <Textarea
                placeholder="We’re ready to help, just let us know what you need."
                className="mt-1 h-[124px]"
              />
            </div>

            <Button
              type="submit"
              className="bg-[#002855] hover:bg-[#001f40] w-full rounded-lg px-6 py-6 text-base"
            >
              Submit Message <ArrowRight />
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
          Contact us via any <br /> our available channels
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 relative">
          {/* Card 1 */}
          <div className="border justify-between rounded-2xl p-6 flex flex-col gap-3 lg:min-h-[320px] bg-white">
            <UserFeedback size={32} className="text-[#002855]" />
            <div className="grid gap-1">
              <h3 className="font-semibold text-lg">Email to our Sales</h3>
              <p className="text-gray-500 text-sm mb-6">
                Tell your needs with our sales
              </p>
              <Button
                variant="default"
                className="mt-auto bg-[#002855] hover:bg-[#001f40] w-fit px-5 py-2"
              >
                Contact our Sales <ArrowRight />
              </Button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="border justify-between rounded-2xl p-6 flex flex-col gap-3 lg:min-h-[320px] bg-white">
            <Email size={32} className="text-[#002855]" />
            <div className="grid gap-1">
              <h3 className="font-semibold text-lg">Email to Nusa Support</h3>
              <p className="text-gray-500 text-sm mb-6">
                Let Nusa solve your issues.
              </p>
              <Button
                variant="default"
                className="mt-auto bg-[#002855] hover:bg-[#001f40] w-fit px-5 py-2"
              >
                Contact Support <ArrowRight />
              </Button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="border justify-between rounded-2xl p-6 flex flex-col gap-3 lg:min-h-[320px] bg-white">
            <Building size={32} className="text-[#002855]" />
            <div className="grid gap-1">
              <h3 className="font-semibold text-lg">Our Location</h3>
              <p className="text-gray-500 text-sm mb-6">
                Visit our main Office
              </p>
              <Button
                variant="default"
                className="mt-auto bg-[#002855] hover:bg-[#001f40] w-fit px-5 py-2"
              >
                Visit our Location <ArrowRight />
              </Button>
            </div>
          </div>

          {/* Card 4 */}
          <div className="border justify-between rounded-2xl p-6 flex flex-col gap-3 lg:min-h-[320px] bg-white">
            <Phone size={32} className="text-[#002855]" />
            <div className="grid gap-1">
              <h3 className="font-semibold text-lg">Call Us</h3>
              <p className="text-gray-500 text-sm mb-6">We're available 24/7</p>
              <Button
                variant="default"
                className="mt-auto bg-[#002855] hover:bg-[#001f40] w-fit px-5 py-2"
              >
                +62 21 5435 3007
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
