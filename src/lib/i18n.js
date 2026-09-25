export const locales = ["en", "ar"];
export const defaultLocale = "en";
export const isRTL = (locale) => locale === "ar";
export const dirOf = (locale) => (isRTL(locale) ? "rtl" : "ltr");

/** Resolve a bilingual field ({ en, ar }) or plain string for a locale. */
export const tx = (field, locale = defaultLocale) => {
  if (field == null) return "";
  if (typeof field === "string" || typeof field === "number") return String(field);
  return field[locale] ?? field.en ?? "";
};

/** Locale-aware path. English is unprefixed, Arabic lives under /ar. */
export const localePath = (locale, path = "/") => {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === "ar") return clean === "/" ? "/ar" : `/ar${clean}`;
  return clean;
};

/** Swap the locale of an existing pathname. */
export const switchLocalePath = (pathname, target) => {
  const stripped = pathname.replace(/^\/ar(?=\/|$)/, "") || "/";
  return localePath(target, stripped);
};

export const numerals = (value, locale) =>
  locale === "ar" ? String(value).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]) : String(value);
