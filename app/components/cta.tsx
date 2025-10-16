import { ArrowRight } from "@carbon/icons-react";
import { Link, useOutletContext } from "react-router";

type CTAPropsType = {
  title?: string;
  description?: string;
  link?: string;
  linkText?: string;
};

const CTASection = (props: CTAPropsType) => {
  const { t, locale } = useOutletContext<{ t: any; locale: "id" | "en" }>();
  return (
    <section className="relative bg-primary text-white py-20 overflow-hidden">
      <img
        data-aos="fade-left"
        src="/bg-solutions.png"
        alt="Background Solution"
        className="absolute top-0 right-0 opacity-70 max-w-4xl"
      />

      <div
        className="absolute z-10 top-[-250px] right-[-250px] w-[500px] h-[500px] rounded-full filter blur-xl"
        style={{
          background:
            "radial-gradient(circle, rgba(135,206,250,0.15), rgba(0,128,128,0.1))",
        }}
      ></div>

      <div
        className="absolute z-10 bottom-[-150px] left-[-100px] w-[300px] h-[300px] rounded-full filter blur-xl"
        style={{
          background:
            "radial-gradient(circle, rgba(135,206,250,0.15), rgba(0,128,128,0.1))",
        }}
      ></div>
      <div className="max-w-7xl relative mx-auto px-6 flex flex-col md:flex-row items-center justify-between z-20">
        <div>
          <h2
            data-aos="fade-right"
            className="text-[32px] lg:text-[36px] text-center lg:text-left font-semibold max-w-lg leading-snug"
          >
            {props.title || t("home.cta.title")}
          </h2>
          <p data-aos="fade-right" className=" mt-4 max-w-md">
            {props.description || ""}
          </p>
        </div>
        <Link
          data-aos="fade-left"
          to={props.link || locale === "en" ? "/contact" : "/id/hubungi-kami"}
          prefetch="intent"
          className="mt-6 md:mt-0 inline-flex items-center px-6 py-3 bg-white text-gray-900 font-medium rounded-lg shadow"
        >
          {props.linkText || t("home.cta.button")}{" "}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
