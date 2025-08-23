import { useState } from "react";
import type { Route } from "./+types/partner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  // DialogTrigger,
  DialogClose,
} from "~/components/ui/dialog";
import { X } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const partners: Array<{ name: string; logo: string }> = [
  { name: "Fortinet", logo: "/partners/fortinet.png" },
  { name: "Nutanix", logo: "/partners/nutanix.png" },
  { name: "SentinelOne", logo: "/partners/sentinelone.png" },
  { name: "Dell Technologies", logo: "/partners/dell.png" },
  { name: "Cisco", logo: "/partners/cisco.png" },
  { name: "Fortinet", logo: "/partners/fortinet.png" },
  { name: "Nutanix", logo: "/partners/nutanix.png" },
  { name: "SentinelOne", logo: "/partners/sentinelone.png" },
  { name: "Dell Technologies", logo: "/partners/dell.png" },
  { name: "Cisco", logo: "/partners/cisco.png" },
];

export default function Partner() {
  const [selected, setSelected] = useState<{
    name: string;
    logo: string;
  } | null>(null);

  return (
    <div className="relative min-h-screen bg-white border-b border-gray-200">
      {/* Section Title */}
      <img
        src="/bg-solutions.png"
        alt="Background Solution"
        className="absolute top-0 right-0 opacity-10 max-w-md lg:max-w-3xl"
      />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-5xl font-medium lg:font-semibold text-gray-900">
          Technology Partners
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl">
          We partner with top global tech brands to deliver secure, scalable
          solutions and services tailored to your business needs.
        </p>
      </div>

      {/* Partners Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 items-center justify-center">
        {partners.map((p, i) => (
          <button
            key={i}
            onClick={() => setSelected(p)}
            className="flex justify-center grayscale min-h-[150px] items-center hover:grayscale-0 transition"
          >
            <img src={p.logo} alt={p.name} className="h-12 object-contain" />
          </button>
        ))}
      </div>

      <div className="relative px-4">
        <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
          <DialogContent className="max-w-2xl lg:min-w-xl p-0 overflow-hidden">
            {/* Modal Content */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left side */}
              <div className=" py-12 px-8">
                {selected?.logo && (
                  <img
                    src={selected.logo}
                    alt={selected.name}
                    className="h-10 mb-4"
                  />
                )}
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold text-left">
                    {selected?.name}
                  </DialogTitle>
                  <DialogDescription className="text-gray-500 text-lg mt-2 text-left">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Curabitur eget orci ac justo porta tincidunt. Suspendisse
                    sed lorem nec metus placerat facilisis.
                  </DialogDescription>
                </DialogHeader>
              </div>

              {/* Right side */}
              <div className=" rounded-r-2xl text-lg bg-gray-50 py-12 px-8">
                <h4 className="font-semibold text-2xl mb-2">Solutions</h4>
                <ul className="list-disc list-inside text-gray-500 space-y-1">
                  <li>Network Infrastructure</li>
                  <li>Data Infrastructure</li>
                  <li>Security Solutions</li>
                  <li>Managed Services</li>
                </ul>

                <h4 className="font-semibold mt-4 mb-2">Related</h4>
                <div className="flex">
                  <ul className="list-disc list-inside text-gray-500 space-y-1">
                    <li></li>
                  </ul>
                  <a className="text-blue-600 underline hover:text-blue-800 line-clamp-3 ">
                    Transforming Peruri Businesses with SD-WAN Technology max 3
                    lines
                  </a>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
