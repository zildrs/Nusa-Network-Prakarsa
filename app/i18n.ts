// app/i18n.ts
const resources = {
  en: {
    common: {
      language: "Language",
      readMore: "Read more",
      notFound: "Not found",
    },
  },
  id: {
    common: {
      language: "Bahasa",
      readMore: "Baca selengkapnya",
      notFound: "Tidak ditemukan",
    },
  },
} as const;

export type Locale = keyof typeof resources;

export function createT(locale: Locale) {
  const dict = resources[locale];
  return function t(key: `${keyof typeof dict}.${string}`) {
    const [ns, k] = key.split(".") as [keyof typeof dict, string];
    return (dict[ns] as any)[k] ?? key;
  };
}
