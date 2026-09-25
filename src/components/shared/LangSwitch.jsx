"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "./LocaleProvider";
import { switchLocalePath } from "@/lib/i18n";

export default function LangSwitch({ className = "" }) {
  const pathname = usePathname();
  const { locale, t } = useLocale();
  const target = locale === "ar" ? "en" : "ar";
  return (
    <Link
      href={switchLocalePath(pathname || "/", target)}
      hrefLang={target}
      lang={target}
      aria-label={t("a11y.switchLang")}
      data-cursor="link"
      className={`meta link-line !text-[0.8125rem] ${className}`}
    >
      {t("nav.lang")}
    </Link>
  );
}
