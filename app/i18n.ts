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

  return function t(key: string, options?: { defaultValue?: string }): string {
    const parts = key.split(".");
    let value: any = dict;

    for (const p of parts) {
      value = value?.[p];
      if (value === undefined) break;
    }

    if (typeof value === "string") {
      return value;
    }

    // kalau ada defaultValue → pakai itu
    if (options?.defaultValue !== undefined) {
      return options.defaultValue;
    }

    // fallback terakhir → key mentah
    return key;
  };
}
