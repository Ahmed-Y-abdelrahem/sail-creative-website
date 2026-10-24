
import { notFound } from "next/navigation";

import "@fontsource-variable/bricolage-grotesque/wdth.css";
import "@fontsource/bricolage-grotesque/latin-800.css";
import "@fontsource-variable/ibm-plex-sans";
import "@fontsource-variable/noto-kufi-arabic";
import "@fontsource/ibm-plex-sans-arabic/arabic-400.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-500.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-600.css";

import "../globals.css";

import Providers from "@/components/layout/Providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import { locales, dirOf } from "@/lib/i18n";
import {
  SITE_URL,
  organizationJsonLd,
  buildMetadata,
} from "@/lib/seo";

import { site } from "@/data/site";
import { t } from "@/data/dictionary";

export const dynamicParams = false;

export const generateStaticParams = () =>
  locales.map((locale) => ({ locale }));

export async function generateMetadata({ params }) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    return {};
  }

  return {
    ...buildMetadata({
      locale,
      description: t(locale, "meta.home"),
      path: "/",
    }),

    icons: {
      icon: "/icon.png",
      apple: "/icon.png",
    },

    applicationName: "SAIL Creative",
  };
}

export const viewport = {
  themeColor: "#0c1520",
  width: "device-width",
  initialScale: 1,
};

const introSkip = `try{if(sessionStorage.getItem('sail-intro-seen')==='1')document.documentElement.dataset.intro='skip'}catch(e){}`;

function safeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function websiteJsonLd(locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,

    name: "SAIL Creative",
    alternateName: "SAIL Creative Solutions",
    url: SITE_URL,

    inLanguage: ["ar-SA", "en"],
    description: t(locale, "meta.home"),

    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      (() => {
        const {
          "@context": ignoredContext,
          ...organization
        } = organizationJsonLd(site.social);

        return organization;
      })(),
      (() => {
        const {
          "@context": ignoredContext,
          ...website
        } = websiteJsonLd(locale);

        return website;
      })(),
    ],
  };

  return (
    <html
      lang={locale}
      dir={dirOf(locale)}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: introSkip,
          }}
        />
      </head>

      <body>
        <Providers locale={locale}>
          <a
            href="#main"
            className="fixed start-4 top-4 z-[200] -translate-y-24 rounded-full bg-orange px-5 py-3 font-semibold text-night focus:translate-y-0"
          >
            {t(locale, "a11y.skip")}
          </a>

          <Header />

          <main id="main">{children}</main>

          <Footer locale={locale} />
        </Providers>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd(structuredData),
          }}
        />
      </body>
    </html>
  );
}
