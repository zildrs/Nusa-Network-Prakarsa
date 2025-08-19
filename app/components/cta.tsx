import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative bg-blue-950 text-white py-20 overflow-hidden">
      <img
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
        className="absolute z-10 bottom-[-250px] left-[-100px] w-[300px] h-[300px] rounded-full filter blur-xl"
        style={{
          background:
            "radial-gradient(circle, rgba(135,206,250,0.15), rgba(0,128,128,0.1))",
        }}
      ></div>
      <div className="max-w-7xl relative mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <h2 className="text-4xl px-3 lg:text-4xl text-center lg:text-left font-semibold max-w-xl leading-snug">
          We run all kinds of IT services that vow your success
        </h2>
        <a
          href="#"
          className="mt-6 md:mt-0 inline-flex items-center px-6 py-3 bg-white text-gray-900 font-medium rounded-full shadow"
        >
          Talk to our expert <ArrowRight className="ml-2 h-5 w-5" />
        </a>
      </div>
    </section>
  );
};

export default CTASection;
