
"use client";

import Link from "next/link";
import { Suspense } from "react";
import {
  usePathname,
  useSearchParams,
} from "next/navigation";

import { useLocale } from "./LocaleProvider";
import { switchLocalePath } from "@/lib/i18n";

const linkClassName = `
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
`;

// This component uses useSearchParams.
// It must be rendered inside Suspense.
function LangSwitchWithSearchParams({
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
      className={`${linkClassName} ${className}`}
    >
      {t("nav.lang")}
    </Link>
  );
}

// Fallback shown while Next.js resolves search params.
function LangSwitchFallback({
  className = "",
}) {
  const pathname = usePathname();

  const { locale, t } = useLocale();

  const target = locale === "ar" ? "en" : "ar";

  const targetPath = switchLocalePath(
    pathname || "/",
    target
  );

  return (
    <Link
      href={targetPath}
      hrefLang={target}
      lang={target}
      aria-label={t("a11y.switchLang")}
      data-cursor="link"
      className={`${linkClassName} ${className}`}
    >
      {t("nav.lang")}
    </Link>
  );
}

export default function LangSwitch({
  className = "",
}) {
  return (
    <Suspense
      fallback={
        <LangSwitchFallback
          className={className}
        />
      }
    >
      <LangSwitchWithSearchParams
        className={className}
      />
    </Suspense>
  );
}
