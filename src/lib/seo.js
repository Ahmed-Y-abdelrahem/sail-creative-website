import { localePath, tx } from "./i18n";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sail-ksa.com";
export const SITE_NAME = "SAIL Creative";

export function buildMetadata({ locale, title, description, path = "/", image = "/og.jpg", type = "website" }) {
  const url = `${SITE_URL}${localePath(locale, path)}`;
  const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Creative Solutions`;
  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}${localePath("en", path)}`,
        ar: `${SITE_URL}${localePath("ar", path)}`,
        "x-default": `${SITE_URL}${localePath("en", path)}`,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type,
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] },
    robots: { index: true, follow: true },
  };
}

export const organizationJsonLd = (social) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  alternateName: "سيل",
  url: SITE_URL,
  logo: `${SITE_URL}/brand/sail-mark.png`,
  foundingDate: "2018",
  areaServed: "SA",
  description:
    "SAIL Creative is a Saudi-based company providing innovative marketing and advertisement solutions.",
  sameAs: [social.instagram, social.linkedin],
});

export const projectJsonLd = (project, locale, cover) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: tx(project.name, locale),
  creator: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  about: tx(project.client, locale),
  description: tx(project.overview, locale),
  image: `${SITE_URL}${cover.src}`,
  url: `${SITE_URL}${localePath(locale, `/work/${project.slug}`)}`,
});
