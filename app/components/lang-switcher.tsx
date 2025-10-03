// app/components/LanguageSwitcher.tsx
import { useLocation, useNavigate } from "react-router";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "~/components/ui/select";
import { saveLanguagePreference, translateCurrentPath, type LanguagePreference } from "~/lib/locale-storage";

export function LanguageSwitcher({ current }: { current: "id" | "en" }) {
  const navigate = useNavigate();
  const location = useLocation();

  if (/\/blog\/read\//.test(location.pathname)) {
    return null;
  }

  const handleLanguageChange = (newLocale: LanguagePreference) => {
    if (newLocale === current) return;

    // Save preference to localStorage
    saveLanguagePreference(newLocale);

    // Also set cookie for server-side persistence
    document.cookie = `user-language=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;

    // Translate current path to target locale using route translation utilities
    const newPath = translateCurrentPath(window.location.pathname, newLocale);

    // Preserve query parameters and hash
    const search = window.location.search;
    const hash = window.location.hash;
    const newUrl = `${newPath}${search}${hash}`;

    navigate(newUrl);
  };

  return (
    <Select defaultValue={current} onValueChange={handleLanguageChange}>
      <SelectTrigger className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-24">
        <SelectValue>
          <img
            className="w-4 h-4 object-cover"
            src={`/icons/${current}.png`}
            alt={current.toUpperCase()}
          />{" "}
          {current.toUpperCase()}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">
          <img
            className="w-4 h-4 object-cover"
            src="/icons/en.png"
            alt="EN"
          />{" "}
          EN
        </SelectItem>
        <SelectItem value="id">
          <img
            className="w-4 h-4 object-cover"
            src="/icons/id.png"
            alt="ID"
          />{" "}
          ID
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
