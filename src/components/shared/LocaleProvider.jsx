"use client";
import { createContext, useContext, useMemo } from "react";
import { dictionary } from "@/data/dictionary";
import { dirOf, localePath, tx, numerals } from "@/lib/i18n";

const LocaleContext = createContext(null);

export function LocaleProvider({ locale, children }) {
  const value = useMemo(() => {
    const dict = dictionary[locale] || dictionary.en;
    return {
      locale,
      dir: dirOf(locale),
      isRTL: locale === "ar",
      /** UI string */
      t: (key) => dict[key] ?? dictionary.en[key] ?? key,
      /** Bilingual data field */
      x: (field) => tx(field, locale),
      /** Locale-aware href */
      href: (path) => localePath(locale, path),
      /** Locale-aware numerals */
      num: (n) => numerals(n, locale),
    };
  }, [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export const useLocale = () => {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider");
  return ctx;
};
