// app/components/LanguageSwitcher.tsx
import { useRef } from "react";
import { Form, useLocation } from "react-router";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "~/components/ui/select";

export function LanguageSwitcher({ current }: { current: "id" | "en" }) {
  const loc = useLocation();
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <Form ref={formRef} method="post" action="/resources/set-locale" replace reloadDocument>
      <input type="hidden" name="from" value={loc.pathname + loc.search} />
      <input type="hidden" name="lang" value={current} />
      <Select
        defaultValue={current}
        onValueChange={(value) => {
          const form = formRef.current;
          if (!form) return;
          // Update hidden lang
          const langInput = form.elements.namedItem("lang") as HTMLInputElement | null;
          if (langInput) langInput.value = value;
          // Update hidden from with ?locale=<value>
          const fromInput = form.elements.namedItem("from") as HTMLInputElement | null;
          if (fromInput) {
            const params = new URLSearchParams(loc.search);
            params.set("locale", value);
            const next = params.toString() ? `${loc.pathname}?${params.toString()}` : loc.pathname;
            fromInput.value = next;
          }
          form.requestSubmit();
        }}
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
          <SelectItem value="id">
            <img
              className="w-4 h-4 object-cover"
              src="/icons/id.png"
              alt="ID"
            />{" "}
            ID
          </SelectItem>
          <SelectItem value="en">
            <img
              className="w-4 h-4 object-cover"
              src="/icons/en.png"
              alt="EN"
            />{" "}
            EN
          </SelectItem>
        </SelectContent>
      </Select>
    </Form>
  );
}
