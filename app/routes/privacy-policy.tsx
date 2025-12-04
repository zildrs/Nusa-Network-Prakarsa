import React from "react";

import { cn } from "~/lib/utils";
import type { Route } from "./+types/contact";
import { useState } from "react";
import { useOutletContext } from "react-router";
import { createMetaFunction, seoData } from "~/lib/meta";

export const meta = createMetaFunction(seoData["policies"]);

export default function Contact() {
  const { t } = useOutletContext<{ t: any; locale: "id" | "en" }>();
  const [activeTab, setActiveTab] = useState("privacy");

  function renderNewlines(text: string) {
    if (typeof text !== 'string') return text;
    
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {}
        {index < text.split('\n').length - 1 && <br />} 
      </React.Fragment>
    ));
  }
  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-8 gap-y-10">
        {/* Sidebar */}
        <aside className="col-span-1 relative w-full">
          <div data-aos="fade-up" className="border rounded-xl p-4 h-fit">
            <nav className="space-y-4">
              <a
                href="#privacy"
                className={cn(
                  "block font-medium hover:text-black",
                  activeTab === "privacy" ? "text-gray-700" : "text-gray-400"
                )}
                onClick={() => setActiveTab("privacy")}
              >
                {t("privacyPolicy.navigation.privacyPolicy")}
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
                {t("privacyPolicy.navigation.generalTerms")}
              </a>
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="col-span-3">
          {/* Privacy Policy Section */}
          <section id="privacy" className="mb-16">
            <h1 className="text-3xl font-medium text-gray-900 mb-2">
              {t("privacyPolicy.privacyPolicy.title")}
            </h1>
            <p className="text-gray-700 mb-6">
              {t("privacyPolicy.privacyPolicy.lastUpdated")}
            </p>

            <div className="space-y-6 text-gray-500 leading-relaxed">
            <p>{renderNewlines(t("privacyPolicy.privacyPolicy.content"))}</p>
            <p>{renderNewlines(t("privacyPolicy.privacyPolicy.contenttwo"))}</p>
            </div>
          </section>

          {/* General Terms Section */}
          <section id="general-terms">
            <h1 className="text-3xl font-medium text-gray-900 mb-2">
              {t("privacyPolicy.generalTerms.title")}
            </h1>
            <p className=" text-gray-700 mb-6">
              {t("privacyPolicy.generalTerms.lastUpdated")}
            </p>

            <div className="space-y-6 text-gray-500 leading-relaxed">
               <p>{renderNewlines(t("privacyPolicy.generalTerms.content"))}</p>
              <p>{renderNewlines(t("privacyPolicy.generalTerms.contenttwo"))}</p>
            </div>
          </section>
        </main>
      </div>
    </main>
  );
}
