
"use client";

import Link from "next/link";
import {
  usePathname,
  useSearchParams,
} from "next/navigation";

import { useLocale } from "./LocaleProvider";
import { switchLocalePath } from "@/lib/i18n";

export default function LangSwitch({
  className = "",
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { locale, t } = useLocale();

  const target = locale === "ar" ? "en" : "ar";

  // Keep the current page when switching languages.
  const targetPath = switchLocalePath(
    pathname || "/",
    target
  );

  // Preserve query parameters such as work filters.
  const query = searchParams.toString();

  const targetHref = query
    ? `${targetPath}?${query}`
    : targetPath;

  return (
    <Link
      href={targetHref}
      hrefLang={target}
      lang={target}
      aria-label={t("a11y.switchLang")}
      data-cursor="link"
      className={`
        meta link-line
        inline-flex min-h-[44px]
        min-w-[44px]
        items-center justify-center
        rounded-sm
        !text-[0.8125rem]
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-4
        focus-visible:outline-orange
        ${className}
      `}
    >
      {t("nav.lang")}
    </Link>
  );
}
