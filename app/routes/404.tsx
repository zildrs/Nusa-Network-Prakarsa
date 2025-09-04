import type { Route } from "./+types/contact";

import {
  DataCenter,
  LoadBalancerNetwork,
  IbmCloudHyperProtectDbaas,
  CloudMonitoring,
  IotPlatform,
} from "@carbon/icons-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact" },
    { name: "description", content: "Get in touch with us" },
  ];
}

const solutions = [
  {
    title: "Data Center",
    desc: "Safely secure your business data",
    icon: DataCenter,
  },
  {
    title: "Managed Services",
    desc: "Preventive & Corrective Maintenance",
    icon: LoadBalancerNetwork,
  },
  {
    title: "Security Infrastructure",
    desc: "Securing systems with layered defense",
    icon: IbmCloudHyperProtectDbaas,
  },
  {
    title: "Network Infrastructure",
    desc: "Reliable connectivity for operations",
    icon: CloudMonitoring,
  },
  {
    title: "Internet of Things (IoT)",
    desc: "Smart environment monitoring tools",
    icon: IotPlatform,
  },
];

export default function Contact() {
  return (
    <main className="w-full">
      <section className="bg-primary relative text-white pt-12 py-18 lg:py-12 lg:min-h-[350px] overflow-hidden">
        <div className="max-w-7xl grid grid-cols-1 lg:grid-cols-2 mx-auto my-auto lg:min-h-[270px] px-4 relative">
          <div className="flex flex-col justify-center">
            <h1 className="text-white text-4xl font-semibold mb-3">
              We're Sorry
            </h1>
            <p className="text-gray-300 mb-6 max-w-2xs">
              The page you're looking for may have been moved or deleted
            </p>
            <a
              href="/"
              className="px-6 w-fit py-2 bg-white text-[#082C4C] rounded-md font-medium shadow hover:bg-gray-100 transition"
            >
              Back to homepage
            </a>
          </div>
          <div className="relative"></div>
        </div>
        <h1 className="absolute hidden lg:block top-1/2 -right-10 transform -translate-y-1/2 text-[396px] font-medium opacity-10">
          404
        </h1>
      </section>

      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-medium text-slate-800 mb-10">
          Explore our solutions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {solutions.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl lg:aspect-square flex flex-col justify-between border border-slate-200 bg-white p-6 transition"
            >
              <div className="text-4xl mb-4">
                <item.icon className="mr-2" size={32} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text- mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
