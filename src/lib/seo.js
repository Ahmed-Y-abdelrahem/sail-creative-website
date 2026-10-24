
import { localePath, tx } from "./i18n";
import { site } from "@/data/site";

const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.sail-ksa.com";

export const SITE_URL = rawSiteUrl.replace(/\/+$/, "");

export const SITE_NAME = "SAIL Creative";

const DEFAULT_OG_IMAGE = "/og.jpg";

function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function cleanTitle(title) {
  if (!title) {
    return `${SITE_NAME} | Creative Solutions`;
  }

  const value = String(title).trim();

  if (
    value.toLowerCase().includes("sail creative") ||
    value.includes("سيل")
  ) {
    return value;
  }

  return `${value} | ${SITE_NAME}`;
}

export function buildMetadata({
  locale = "en",
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  type = "website",
}) {
  const pageUrl = absoluteUrl(localePath(locale, path));
  const fullTitle = cleanTitle(title);
  const imageUrl = absoluteUrl(image);

  const languageAlternates = {
    en: absoluteUrl(localePath("en", path)),
    ar: absoluteUrl(localePath("ar", path)),
    "x-default": absoluteUrl(localePath("en", path)),
  };

  return {
    metadataBase: new URL(SITE_URL),

    title: fullTitle,
    description,

    alternates: {
      canonical: pageUrl,
      languages: languageAlternates,
    },

    openGraph: {
      title: fullTitle,
      description,
      url: pageUrl,
      siteName: SITE_NAME,
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export const organizationJsonLd = (social = {}) => {
  const socialLinks = [
    social.instagram,
    social.linkedin,
    site.social?.instagram,
    site.social?.linkedin,
  ].filter(
    (url) =>
      typeof url === "string" &&
      /^https?:\/\//i.test(url)
  );

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,

    name: SITE_NAME,

    alternateName: [
      "SAIL Creative Solutions",
      "سيل",
      "سيل كرييتف",
    ],

    url: SITE_URL,

    logo: absoluteUrl("/brand/sail-mark.png"),

    foundingDate: "2020",

    description:
      "SAIL Creative is a Saudi-based creative agency providing branding, digital marketing, web development, media production and event management solutions.",

    areaServed: {
      "@type": "Country",
      name: "Saudi Arabia",
    },

    sameAs: [...new Set(socialLinks)],
  };
};

export const projectJsonLd = (project, locale, cover) => {
  const projectUrl = absoluteUrl(
    localePath(locale, `/work/${project.slug}`)
  );

  const imagePath = cover?.src || project.cover?.src;

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${projectUrl}#creativework`,

    name: tx(project.name, locale),
    description: tx(project.overview, locale),

    url: projectUrl,

    inLanguage: locale === "ar" ? "ar-SA" : "en",

    creator: {
      "@id": `${SITE_URL}/#organization`,
    },

    ...(imagePath
      ? {
          image: absoluteUrl(imagePath),
        }
      : {}),

    about: tx(project.client, locale),
  };
};
