import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const stats = [
    { value: "150+", label: "Projects Accomplished" },
    { value: "100+", label: "Clients Success" },
    { value: "32+", label: "Technology Partners" },
    { value: "15+", label: "Amazing Awards Accomplished" },
  ];

  const partners = [
    "/logos/sinarmas.svg",
    "/logos/gojek.svg",
    "/logos/ihg.svg",
    "/logos/jnt.svg",
    "/logos/angkasapura.svg",
  ];
  return (
    <section className="bg-white">
      {/* Hero Text + Image */}
      <div
        className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-1 gap-10 items-center h-[384px]"
        style={{
          backgroundImage: `url(/bg-hero.png)`,
          backgroundSize: "cover",
        }}
      >
        {/* Left Side */}
        <div className="grid grid-cols-8 gap-10 items-end w-full">
          <h1 className="text-5xl md:text-5xl font-semibold leading-tight col-span-6">
            Trusted System Integrator <br /> Company in Indonesia
          </h1>

          {/* Right Side - Hero Image */}
          <p className="text-gray-500 mt-4 text-lg col-span-2">
            Highly Tailored IT Design, Management & Support Services.
          </p>
        </div>
      </div>
      <img
        src="https://placehold.co/500x300"
        className="w-full rounded-lg shadow-lg aspect-[8/3] object-cover"
        alt="Server Room"
      />

      {/* Partner Logos */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-sm tracking-widest text-gray-500 mb-6">
            TRUSTED BY COMPANIES ALL OVER THE WORLD
          </p>
          <div className="flex justify-center flex-wrap gap-10 opacity-80">
            {partners.map((logo, idx) => (
              <img key={idx} src={logo} alt="Partner Logo" className="h-10" />
            ))}
          </div>
        </div>
      </div>

      {/* About + Stats */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          <h2 className="text-3xl font-bold leading-snug">
            As your IT Consultant, <br />
            we help you grow your business{" "}
            <span className="italic">exponentially</span>
          </h2>
          <p className="text-gray-500 mt-4">
            With over a decade of experience as a trusted system integrator in
            Indonesia, PT Nusa Network Prakarsa has consistently demonstrated
            its commitment to delivering advanced technology solutions that
            accelerate business growth and digital transformation.
          </p>
          <p className="text-gray-500 mt-4">
            We deliver relevant solutions to businesses around the globe. Strong
            innovation to leverage your IT resource is built in our vein.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="border rounded-lg p-6 bg-white shadow-sm"
            >
              <p className="text-2xl font-bold">{item.value}</p>
              <p className="text-sm text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
