import { cn } from "~/lib/utils";
import type { Route } from "./+types/contact";
import { useEffect, useState } from "react";
import { Card, CardContent } from "~/components/ui/card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact" },
    { name: "description", content: "Get in touch with us" },
  ];
}

export default function Contact() {
  const [activeTab, setActiveTab] = useState("privacy");

  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-8 gap-y-10">
        {/* Sidebar */}
        <aside className="col-span-1 relative w-full">
          <div className="border rounded-xl p-4 h-fit">
            <nav className="space-y-4">
              <a
                href="#privacy"
                className={cn(
                  "block font-medium hover:text-black",
                  activeTab === "privacy" ? "text-gray-700" : "text-gray-400"
                )}
                onClick={() => setActiveTab("privacy")}
              >
                Privacy Policy
              </a>
              <a
                href="#general-terms"
                className={cn(
                  "block font-medium hover:text-black",
                  activeTab === "general-terms"
                    ? "text-gray-700"
                    : "text-gray-400"
                )}
                onClick={() => setActiveTab("general-terms")}
              >
                General Terms
              </a>
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="col-span-3">
          {/* Privacy Policy Section */}
          <section id="privacy" className="mb-16">
            <h1 className="text-3xl font-medium text-gray-900 mb-2">
              Privacy Policy
            </h1>
            <p className="text-gray-700 mb-6">
              Last updated: September 22, 2023
            </p>

            <div className="space-y-6 text-gray-500 leading-relaxed">
              <p>
                This Privacy Policy describes Our policies and procedures on the
                collection, use, and disclosure of Your information when You use
                the Service and tells You about Your privacy rights and how the
                law protects You. We use Your Personal data to provide and
                improve the Service. By using the Service, You agree to the
                collection and use of information in accordance with this
                Privacy Policy. This Privacy Policy has been created with the
                help of the Privacy Policy Generator.
              </p>

              <p>
                This Privacy Policy describes Our policies and procedures on the
                collection, use, and disclosure of Your information when You use
                the Service and tells You about Your privacy rights and how the
                law protects You. We use Your Personal data to provide and
                improve the Service. By using the Service, You agree to the
                collection and use of information in accordance with this
                Privacy Policy. This Privacy Policy has been created with the
                help of the Privacy Policy Generator.
              </p>

              <p>
                This Privacy Policy describes Our policies and procedures on the
                collection, use, and disclosure of Your information when You use
                the Service and tells You about Your privacy rights and how the
                law protects You. We use Your Personal data to provide and
                improve the Service. By using the Service, You agree to the
                collection and use of information in accordance with this
                Privacy Policy. This Privacy Policy has been created with the
                help of the Privacy Policy Generator.
              </p>
            </div>
          </section>

          {/* General Terms Section */}
          <section id="general-terms">
            <h1 className="text-3xl font-medium text-gray-900 mb-2">
              General Terms
            </h1>
            <p className=" text-gray-700 mb-6">
              Last updated: September 22, 2023
            </p>

            <div className="space-y-6 text-gray-500 leading-relaxed">
              <p>
                This Privacy Policy describes Our policies and procedures on the
                collection, use, and disclosure of Your information when You use
                the Service and tells You about Your privacy rights and how the
                law protects You. We use Your Personal data to provide and
                improve the Service. By using the Service, You agree to the
                collection and use of information in accordance with this
                Privacy Policy. This Privacy Policy has been created with the
                help of the Privacy Policy Generator.
              </p>

              <p>
                This Privacy Policy describes Our policies and procedures on the
                collection, use, and disclosure of Your information when You use
                the Service and tells You about Your privacy rights and how the
                law protects You. We use Your Personal data to provide and
                improve the Service. By using the Service, You agree to the
                collection and use of information in accordance with this
                Privacy Policy. This Privacy Policy has been created with the
                help of the Privacy Policy Generator.
              </p>

              <p>
                This Privacy Policy describes Our policies and procedures on the
                collection, use, and disclosure of Your information when You use
                the Service and tells You about Your privacy rights and how the
                law protects You. We use Your Personal data to provide and
                improve the Service. By using the Service, You agree to the
                collection and use of information in accordance with this
                Privacy Policy. This Privacy Policy has been created with the
                help of the Privacy Policy Generator.
              </p>
            </div>
          </section>
        </main>
      </div>
    </main>
  );
}
