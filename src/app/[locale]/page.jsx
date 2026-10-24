
import Hero from "@/features/home/Hero";
import Intro from "@/features/home/Intro";
import SelectedWork from "@/features/home/SelectedWork";
import ServiceIndex from "@/features/home/ServiceIndex";
import MarketingWall from "@/features/home/MarketingWall";
import BrandShift from "@/features/home/BrandShift";
import MediaReel from "@/features/home/MediaReel";
import PartnersField from "@/features/home/PartnersField";
import EventJourney from "@/features/events/EventJourney";

import { featuredProjects } from "@/data/projects";
import { services } from "@/data/services";

import { buildMetadata, SITE_URL } from "@/lib/seo";
import { localePath } from "@/lib/i18n";
import { t } from "@/data/dictionary";

const seoTitles = {
  en: "Creative Agency in Saudi Arabia | Branding, Marketing & Events",
  ar: "شركة حلول إبداعية في السعودية | الهوية والتسويق والفعاليات",
};

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return buildMetadata({
    locale,
    title: seoTitles[locale] || seoTitles.en,
    description: t(locale, "meta.home"),
    path: "/",
  });
}

function getHomePageSchema(locale) {
  const url = `${SITE_URL}${localePath(locale, "/")}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: seoTitles[locale] || seoTitles.en,
    description: t(locale, "meta.home"),
    inLanguage: locale === "ar" ? "ar-SA" : "en",
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: {
      "@id": `${SITE_URL}/#organization`,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export default async function HomePage({ params }) {
  const { locale } = await params;

  const homePageSchema = getHomePageSchema(locale);

  return (
    <>
      <Hero />

      <Intro />

      <SelectedWork projects={featuredProjects} />

      <ServiceIndex services={services} />

      <MarketingWall />

      <BrandShift />

      <MediaReel />

      <EventJourney />

      <PartnersField />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homePageSchema).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />
    </>
  );
}
