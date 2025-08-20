import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type DropdownItem = {
  value: string;
  label: string;
};

type DropdownProps = {
  label: string;
  icon: React.ReactNode;
  items: DropdownItem[];
  onSelect?: (value: string) => void; // 🔹 handler baru
  className?: string; // 🔹 untuk custom class
};

export function Dropdown({
  label,
  icon,
  items,
  onSelect,
  className,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // klik luar → close
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (item: DropdownItem) => {
    setSelectedValue(item.value);
    setOpen(false);
    if (onSelect) onSelect(item.value); // 🔹 kirim ke parent
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300
          text-gray-600 hover:bg-gray-50 transition
          ${className}
        `}
      >
        {icon}
        <span className="font-medium">
          {selectedValue
            ? items.find((i) => i.value === selectedValue)?.label
            : label}
        </span>
        <ChevronDown
          className={`transition-transform w-5 h-5 duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Menu */}
      {open && (
        <div
          className="
            z-50
            absolute mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200
            overflow-hidden animate-fadeIn
          "
        >
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => handleSelect(item)}
              className="
                w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100
                transition
              "
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
