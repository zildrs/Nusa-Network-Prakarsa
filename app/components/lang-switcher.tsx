// app/components/LanguageSwitcher.tsx
import { Form, useLocation } from "react-router";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "~/components/ui/select";

export function LanguageSwitcher({ current }: { current: "id" | "en" }) {
  const loc = useLocation();
  return (
    <Form method="post" action="/resources/set-locale" replace>
      <input type="hidden" name="from" value={loc.pathname + loc.search} />
      <Select
        name="lang"
        defaultValue={current}
        onValueChange={() => (document.forms[0] as HTMLFormElement).submit()}
      >
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="id">Indonesia</SelectItem>
          <SelectItem value="en">English</SelectItem>
        </SelectContent>
      </Select>
    </Form>
  );
}
