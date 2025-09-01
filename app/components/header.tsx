import { useState } from "react";
import {
  DataCenter,
  LoadBalancerNetwork,
  IbmCloudHyperProtectDbaas,
  CloudMonitoring,
  IotPlatform,
  ArrowRight,
  ChevronDown,
  Close,
  Menu,
} from "@carbon/icons-react";
import { Link } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const LangSwitcher = () => {
  const [lang, setLang] = useState("en");

  return (
    <div className="relative">
      <Select onValueChange={(lang) => setLang(lang)} value={lang}>
        <SelectTrigger className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
          <SelectValue>
            <img
              className="w-4 h-4 object-cover"
              src={`/icons/${lang}.png`}
              alt={lang.toUpperCase()}
            />{" "}
            {lang.toUpperCase()}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">
            <img
              className="w-4 h-4 object-cover"
              src={`/icons/en.png`}
              alt="EN"
            />{" "}
            EN
          </SelectItem>
          <SelectItem value="id">
            <img
              className="w-4 h-4 object-cover"
              src={`/icons/id.png`}
              alt="ID"
            />{" "}
            ID
          </SelectItem>
        </SelectContent>
      </Select>
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
            to="https://ticket.nusanetwork.com/helpdesk"
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-500"
          >
            Support
          </Link>
          <Link
            to="https://www.nusanetwork.com/contact/"
            className="bg-primary text-white rounded-lg px-4 py-2 text-sm flex items-center gap-1"
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
              <Close className="text-gray-400" size={28} />
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
              to="https://www.nusanetwork.com/contact/"
              className="bg-primary text-white rounded-lg px-4 py-3 flex justify-center items-center gap-1"
            >
              Contact us <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
            <Link
              to="https://ticket.nusanetwork.com/helpdesk"
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
