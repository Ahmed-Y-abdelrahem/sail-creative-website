
import ServiceChapters from "@/features/services/ServiceChapters";

import { services } from "@/data/services";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { localePath, tx } from "@/lib/i18n";
import { t } from "@/data/dictionary";

const pageTitles = {
  en: "Creative Agency Services in Saudi Arabia",
  ar: "خدمات التسويق والهوية والحلول الإبداعية في السعودية",
};

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return buildMetadata({
    locale,
    title: pageTitles[locale] || pageTitles.en,
    description: t(locale, "meta.services"),
    path: "/services",
  });
}

function createServicesSchema(locale) {
  const pageUrl = `${SITE_URL}${localePath(locale, "/services")}`;
  const homeUrl = `${SITE_URL}${localePath(locale, "/")}`;

  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "ar" ? "الرئيسية" : "Home",
        item: homeUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "ar" ? "خدماتنا" : "Services",
        item: pageUrl,
      },
    ],
  };

  const servicesListSchema = {
    "@type": "ItemList",
    "@id": `${pageUrl}#services-list`,
    name:
      locale === "ar"
        ? "خدمات سيل الإبداعية"
        : "SAIL Creative Services",
    itemListElement: services.map((service, index) => {
      const serviceUrl = `${pageUrl}#${service.slug}`;

      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          "@id": `${serviceUrl}-service`,
          name: tx(service.title, locale),
          description: tx(service.statement, locale),
          url: serviceUrl,
          provider: {
            "@id": organizationId,
          },
          areaServed: {
            "@type": "Country",
            name: "Saudi Arabia",
          },
          ...(service.capabilities?.length
            ? {
                hasOfferCatalog: {
                  "@type": "OfferCatalog",
                  name: tx(service.title, locale),
                  itemListElement: service.capabilities.map(
                    (capability) => ({
                      "@type": "OfferCatalog",
                      name: tx(capability, locale),
                    })
                  ),
                },
              }
            : {}),
        },
      };
    }),
  };

  const webpageSchema = {
    "@type": "CollectionPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: pageTitles[locale] || pageTitles.en,
    description: t(locale, "meta.services"),
    inLanguage: locale === "ar" ? "ar-SA" : "en",
    isPartOf: {
      "@id": websiteId,
    },
    about: {
      "@id": organizationId,
    },
    breadcrumb: {
      "@id": `${pageUrl}#breadcrumb`,
    },
    mainEntity: {
      "@id": `${pageUrl}#services-list`,
    },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      webpageSchema,
      breadcrumbSchema,
      servicesListSchema,
    ],
  };
}

export default async function ServicesPage({ params }) {
  const { locale } = await params;

  const structuredData = createServicesSchema(locale);

  return (
    <>
      <ServiceChapters services={services} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />
    </>
  );
}
