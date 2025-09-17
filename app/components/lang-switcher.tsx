// app/components/LanguageSwitcher.tsx
import { useNavigate } from "react-router";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "~/components/ui/select";

export function LanguageSwitcher({ current }: { current: "id" | "en" }) {
  const navigate = useNavigate();

  const handleLanguageChange = (newLocale: "id" | "en") => {
    if (newLocale === current) return;

    // Get current path segments
    const pathSegments = window.location.pathname.split('/').filter(Boolean);

    let newPath: string;

    if (newLocale === "en") {
      // For English, remove the locale prefix if it exists
      if (pathSegments[0] === "id") {
        // Remove the 'id' prefix and reconstruct path
        const remainingSegments = pathSegments.slice(1);
        newPath = remainingSegments.length > 0 ? '/' + remainingSegments.join('/') : '/';
      } else {
        // Already English or no prefix, keep as is
        newPath = window.location.pathname;
      }
    } else {
      // For Indonesian, add the 'id' prefix
      if (pathSegments[0] === "id") {
        // Already has 'id' prefix, keep as is
        newPath = window.location.pathname;
      } else {
        // Add 'id' prefix to current path
        newPath = '/id' + window.location.pathname;
      }
    }

    // Preserve query parameters
    const search = window.location.search;
    const newUrl = search ? `${newPath}${search}` : newPath;

    navigate(newUrl);
  };

  return (
    <Select
      defaultValue={current}
      onValueChange={handleLanguageChange}
    >
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
