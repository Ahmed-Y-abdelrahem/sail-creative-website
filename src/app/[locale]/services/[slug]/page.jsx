
import { notFound } from "next/navigation";

import TransitionLink from "@/components/layout/TransitionLink";

import { services } from "@/data/services";
import { projectBySlug } from "@/data/projects";
import { getServiceSeo } from "@/data/serviceSeo";

import { buildMetadata, SITE_URL } from "@/lib/seo";
import { locales, localePath, tx } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    services.map((service) => ({
      locale,
      slug: service.slug,
    }))
  );
}

function getPageData(locale, slug) {
  const service = services.find((item) => item.slug === slug);
  const seo = getServiceSeo(slug, locale);

  if (!service || !seo || !locales.includes(locale)) {
    return null;
  }

  return { service, seo };
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const data = getPageData(locale, slug);

  if (!data) {
    return {};
  }

  return buildMetadata({
    locale,
    title: data.seo.title,
    description: data.seo.description,
    path: `/services/${slug}`,
  });
}

function safeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function createStructuredData(locale, service, seo) {
  const path = `/services/${service.slug}`;
  const url = `${SITE_URL}${localePath(locale, path)}`;
  const homeUrl = `${SITE_URL}${localePath(locale, "/")}`;
  const servicesUrl = `${SITE_URL}${localePath(locale, "/services")}`;

  const breadcrumbId = `${url}#breadcrumb`;
  const serviceId = `${url}#service`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: seo.title,
        description: seo.description,
        inLanguage: locale === "ar" ? "ar-SA" : "en",
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        breadcrumb: {
          "@id": breadcrumbId,
        },
        mainEntity: {
          "@id": serviceId,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
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
            name: locale === "ar" ? "الخدمات" : "Services",
            item: servicesUrl,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: tx(service.title, locale),
            item: url,
          },
        ],
      },
      {
        "@type": "Service",
        "@id": serviceId,
        name: tx(service.title, locale),
        description: seo.intro,
        url,
        serviceType: tx(service.title, locale),
        provider: {
          "@id": `${SITE_URL}/#organization`,
        },
        areaServed: {
          "@type": "Country",
          name: "Saudi Arabia",
        },
      },
    ],
  };
}

export default async function ServiceDetailsPage({ params }) {
  const { locale, slug } = await params;
  const data = getPageData(locale, slug);

  if (!data) {
    notFound();
  }

  const { service, seo } = data;

  const isArabic = locale === "ar";

  const relatedProjects = service.projects
    .map((projectSlug) => projectBySlug[projectSlug])
    .filter(Boolean);

  const structuredData = createStructuredData(
    locale,
    service,
    seo
  );

  const labels = {
    home: isArabic ? "الرئيسية" : "Home",
    services: isArabic ? "الخدمات" : "Services",
    capabilities: isArabic
      ? "ماذا تشمل الخدمة؟"
      : "What does this service include?",
    related: isArabic
      ? "مشاريع مرتبطة بالخدمة"
      : "Related projects",
    contact: isArabic
      ? "تحدث معنا عن مشروعك"
      : "Let's discuss your project",
    back: isArabic
      ? "استكشف جميع الخدمات"
      : "Explore all services",
    whyUs: isArabic
      ? "حلول تناسب أهداف أعمالك"
      : "Solutions built around your business",
  };

  return (
    <>
      <article
        className="min-h-screen bg-[#101B29] text-[#F5F4F0]"
      >
        {/* Hero */}
        <header
          className="relative overflow-hidden px-[var(--pad)] pb-20 pt-36 sm:pb-28 sm:pt-44"
          style={{
            background: service.theme.bg,
            color: service.theme.fg,
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -end-32 -top-32 h-[420px] w-[420px] rounded-full opacity-20 blur-[100px]"
            style={{
              background: service.theme.accent,
            }}
          />

          <div className="relative mx-auto max-w-7xl">
            <nav
              aria-label="Breadcrumb"
              className="mb-12 flex flex-wrap items-center gap-3 text-sm opacity-70"
            >
              <TransitionLink href={localePath(locale, "/")}>
                {labels.home}
              </TransitionLink>

              <span aria-hidden="true">/</span>

              <TransitionLink
                href={localePath(locale, "/services")}
              >
                {labels.services}
              </TransitionLink>

              <span aria-hidden="true">/</span>

              <span aria-current="page">
                {tx(service.title, locale)}
              </span>
            </nav>

            <div
              className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em]"
              style={{ color: service.theme.accent }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: service.theme.accent }}
              />
              SAIL Creative Solutions
            </div>

            <h1
              className={`display max-w-5xl ${
                isArabic
                  ? "text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.4]"
                  : "text-[clamp(3.5rem,8vw,8rem)] leading-[1.05]"
              }`}
            >
              {tx(service.title, locale)}
            </h1>

            <p
              className={`mt-8 max-w-3xl opacity-85 ${
                isArabic
                  ? "text-lg leading-[2] sm:text-xl"
                  : "text-lg leading-[1.8] sm:text-xl"
              }`}
            >
              {seo.intro}
            </p>

            <div className="mt-12">
              <TransitionLink
                href={localePath(locale, "/contact")}
                className="inline-flex items-center justify-center rounded-full bg-[#FF6A1F] px-7 py-4 text-sm font-bold text-[#101B29] transition-transform duration-300 hover:-translate-y-1"
              >
                {labels.contact}
              </TransitionLink>
            </div>
          </div>
        </header>

        {/* Capabilities */}
        <section
          className="px-[var(--pad)] py-20 sm:py-28"
          aria-labelledby="service-capabilities"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-[#FF6A1F]">
                  {labels.whyUs}
                </p>

                <h2
                  id="service-capabilities"
                  className={`display ${
                    isArabic
                      ? "text-3xl leading-[1.5] sm:text-5xl"
                      : "text-4xl leading-tight sm:text-6xl"
                  }`}
                >
                  {labels.capabilities}
                </h2>

                <p
                  className={`mt-6 max-w-lg text-[#F5F4F0]/65 ${
                    isArabic
                      ? "leading-[2]"
                      : "leading-[1.8]"
                  }`}
                >
                  {tx(service.statement, locale)}
                </p>
              </div>

              <div className="lg:col-span-7">
                <ul className="grid gap-4 sm:grid-cols-2">
                  {service.capabilities.map(
                    (capability, index) => (
                      <li
                        key={index}
                        className="flex min-h-28 items-start gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-6"
                      >
                        <span className="mt-1 text-sm font-bold text-[#FF6A1F]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span
                          className={`font-medium ${
                            isArabic
                              ? "leading-[1.9]"
                              : "leading-[1.6]"
                          }`}
                        >
                          {tx(capability, locale)}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Related projects */}
        {relatedProjects.length > 0 && (
          <section className="bg-[#F5F4F0] px-[var(--pad)] py-20 text-[#101B29] sm:py-28">
            <div className="mx-auto max-w-7xl">
              <h2
                className={`display mb-10 ${
                  isArabic
                    ? "text-3xl leading-[1.5] sm:text-5xl"
                    : "text-4xl sm:text-6xl"
                }`}
              >
                {labels.related}
              </h2>

              <div className="grid gap-5 md:grid-cols-2">
                {relatedProjects.map((project) => (
                  <TransitionLink
                    key={project.slug}
                    href={localePath(
                      locale,
                      `/work/${project.slug}`
                    )}
                    className="group flex items-center justify-between gap-6 rounded-xl border border-[#101B29]/15 p-6 transition-colors hover:border-[#0A5A60] hover:bg-[#0A5A60]/5"
                  >
                    <span className="text-lg font-semibold">
                      {tx(project.name, locale)}
                    </span>

                    <span
                      aria-hidden="true"
                      className="text-2xl text-[#0A5A60] transition-transform group-hover:-translate-x-1"
                    >
                      ↗
                    </span>
                  </TransitionLink>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Contact CTA */}
        <section className="px-[var(--pad)] py-20 text-center sm:py-28">
          <div className="mx-auto max-w-3xl">
            <h2
              className={`display ${
                isArabic
                  ? "text-3xl leading-[1.5] sm:text-5xl"
                  : "text-4xl leading-tight sm:text-6xl"
              }`}
            >
              {labels.contact}
            </h2>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <TransitionLink
                href={localePath(locale, "/contact")}
                className="inline-flex rounded-full bg-[#FF6A1F] px-8 py-4 font-semibold text-[#101B29] transition-transform hover:-translate-y-1"
              >
                {labels.contact}
              </TransitionLink>

              <TransitionLink
                href={localePath(locale, "/services")}
                className="inline-flex rounded-full border border-white/25 px-8 py-4 font-semibold transition-colors hover:bg-white/10"
              >
                {labels.back}
              </TransitionLink>
            </div>
          </div>
        </section>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(structuredData),
        }}
      />
    </>
  );
}
