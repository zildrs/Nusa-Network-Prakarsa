import { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Building2,
  Database,
  Network,
  MonitorCheck,
  Cpu,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router";

const LangSwitcher = () => {
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState("en");
  return (
    <div className="relative">
      <button
        onClick={() => setLangOpen(true)}
        className="border border-gray-300 rounded-lg px-3 py-2 flex items-center gap-1 text-sm text-gray-500"
      >
        <img
          className="w-4 h-4 object-cover"
          src={`/icons/${lang}.png`}
          alt={lang.toUpperCase()}
        />{" "}
        {lang === "id" ? "ID" : "EN"} <ChevronDown size={16} />
      </button>
      {langOpen && (
        <div className="absolute right-0 mt-2 w-16 rounded-lg border bg-white shadow-lg p-1 z-50">
          <button
            onClick={() => {
              setLang("id");
              setLangOpen(false);
            }}
            className="block w-full py-1 text-center text-sm text-gray-500 hover:bg-gray-100"
          >
            ID
          </button>
          <button
            onClick={() => {
              setLang("en");
              setLangOpen(false);
            }}
            className="block w-full py-1 text-center text-sm text-gray-500 hover:bg-gray-100"
          >
            EN
          </button>
        </div>
      )}
    </div>
  );
};

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  const solutions = [
    {
      title: "Data Center",
      desc: "Safely secure your business data",
      icon: Building2,
    },
    {
      title: "Managed Services",
      desc: "Preventive & Corrective Maintenance",
      icon: Network,
    },
    {
      title: "Security Infrastructure",
      desc: "Securing systems with layered defense",
      icon: Database,
    },
    {
      title: "Network Infrastructure",
      desc: "Reliable connectivity for operations",
      icon: MonitorCheck,
    },
    {
      title: "Internet of Things (IoT)",
      desc: "Smart environment monitoring tools",
      icon: Cpu,
    },
  ];

  return (
    <header className="border-b border-gray-200 bg-white text-gray-600">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 lg:py-4">
        {/* Logo */}
        <div className="flex gap-16">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="NPP" className="h-8" />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-6">
            {/* Solutions dropdown */}
            <div className="relative">
              <button
                onClick={() => setSolutionsOpen(!solutionsOpen)}
                className="flex items-center gap-1 font-medium text-gray-700"
              >
                Solutions <ChevronDown size={16} />
              </button>
              {solutionsOpen && (
                <div className="absolute left-0 mt-2 w-72 rounded-lg border bg-white shadow-lg p-4 pl-6 z-50">
                  {solutions.map((item) => (
                    <Link
                      key={item.title}
                      to={`/solutions/${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className="py-3 flex items-center gap-2"
                      onClick={() => setMobileOpen(false)}
                    >
                      <item.icon className="mr-2" size={20} />
                      <div className="block">
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/about" className="font-medium text-gray-700">
              About Us
            </Link>
            <Link to="/case-study" className="font-medium text-gray-700">
              Case Study
            </Link>
            <Link to="/blog" className="font-medium text-gray-700">
              Blog
            </Link>
          </nav>
        </div>

        {/* Right buttons */}
        <div className="hidden lg:flex items-center gap-2">
          <LangSwitcher />
          <Link
            to="/support"
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-500"
          >
            Support
          </Link>
          <Link
            to="/contact"
            className="bg-blue-900 text-white rounded-lg px-4 py-2 text-sm flex items-center gap-1"
          >
            Contact us <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex gap-2 items-center lg:hidden">
          <LangSwitcher />
          <button
            className="lg:hidden border border-gray-300 p-2 rounded-lg"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="text-gray-400" size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-white z-50 p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <img src="/logo.png" alt="NPP" className="h-8" />
            <button onClick={() => setMobileOpen(false)}>
              <X className="text-gray-400" size={28} />
            </button>
          </div>

          <button
            className="flex justify-between w-full py-3 border-b font-medium border-gray-300"
            onClick={() => setSolutionsOpen(!solutionsOpen)}
          >
            Solutions <ChevronDown size={16} />
          </button>
          {solutionsOpen && (
            <div className="pl-4">
              {solutions.map((item) => (
                <Link
                  key={item.title}
                  to={`/solutions/${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="py-3 flex items-center gap-2"
                  onClick={() => setMobileOpen(false)}
                >
                  <item.icon className="mr-2" size={20} />
                  <div className="block">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <Link
            to="/about"
            className="block py-3 border-b font-medium border-gray-300"
            onClick={() => setMobileOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/case-study"
            className="block py-3 border-b font-medium border-gray-300"
            onClick={() => setMobileOpen(false)}
          >
            Case Study
          </Link>
          <Link
            to="/blog"
            className="block py-3 border-b font-medium border-gray-300"
            onClick={() => setMobileOpen(false)}
          >
            Article
          </Link>

          <div className="mt-6 flex flex-col gap-2">
            <Link
              to="/contact"
              className="bg-blue-900 text-white rounded-lg px-4 py-3 flex justify-center items-center gap-1"
            >
              Contact us →
            </Link>
            <Link
              to="/support"
              className="border rounded-lg px-4 py-3 text-center border-gray-300"
            >
              Support
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
