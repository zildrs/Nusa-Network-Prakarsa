// app/i18n.ts
import en from "./locales/en.json";
import id from "./locales/id.json";
const resources = {
  en,
  id,
} as const;

export type Locale = keyof typeof resources;

export function createT(locale: Locale) {
  const dict = resources[locale];
  return function t(key: `${keyof typeof dict}.${string}`) {
    const [ns, k] = key.split(".") as [keyof typeof dict, string];
    return (dict[ns] as any)[k] ?? key;
  };
}
