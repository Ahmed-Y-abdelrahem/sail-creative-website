"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import TransitionLink from "@/components/layout/TransitionLink";
import Arrow from "@/components/ui/Arrow";
import RevealText from "@/components/ui/RevealText";
import { Button } from "@/components/ui/Button";

import { visuals } from "./ServiceVisuals";
import { useLocale } from "@/components/shared/LocaleProvider";
import { projectBySlug } from "@/data/projects";
import { ease } from "@/lib/motion";
import { pad2 } from "@/lib/utils";

/* ==========================================
   CHAPTER ANIMATION DIRECTIONS
========================================== */

const from = {
  left: { x: -90, y: 0 },
  right: { x: 90, y: 0 },
  up: { x: 0, y: 80 },
};

/* ==========================================
   SERVICE CHAPTER
========================================== */

function Chapter({ service, index }) {
  const { x, t, href, isRTL } = useLocale();

  const { theme } = service;
  const Visual = visuals[service.slug];

  const dir = from[service.direction] || from.up;
  const sign = isRTL ? -1 : 1;

  const enter = {
    initial: {
      opacity: 0,
      x: dir.x * sign,
      y: dir.y,
    },
    whileInView: {
      opacity: 1,
      x: 0,
      y: 0,
    },
    viewport: {
      once: true,
      margin: "-12% 0px",
    },
    transition: {
      duration: 1.2,
      ease,
    },
  };

  return (
    <section
      id={service.slug}
      data-chapter={index}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden px-[var(--pad)] py-28"
      style={{
        background: theme.bg,
        color: theme.fg,
      }}
    >
      {/* Decorative background text */}
      <span
        aria-hidden="true"
        className={`display pointer-events-none absolute select-none whitespace-nowrap text-[clamp(8rem,27vw,36rem)] leading-none opacity-[0.07] ${
          index % 2
            ? "-start-[6%] bottom-[-8%]"
            : "-end-[8%] top-[2%]"
        }`}
      >
        {x(service.short)}
      </span>

      {/* Main content and visuals */}
      <div className="relative grid items-center gap-14 lg:grid-cols-12">
        <motion.div
          {...enter}
          className={`min-w-0 lg:col-span-6 ${
            index % 2 ? "lg:order-2 lg:col-start-7" : ""
          }`}
        >
          <p
            className="meta flex items-center gap-4"
            style={{ color: theme.accent }}
          >
            <span className="tabular-nums">
              {pad2(index + 1)}
            </span>

            <span
              aria-hidden="true"
              className="h-px w-10 bg-current"
            />

            <Arrow className="h-3 w-3" stroke={16} />
          </p>

          <h2
            className={`display mt-6 ${
              isRTL
                ? "text-[clamp(2.8rem,6vw,6.5rem)] leading-[1.35]"
                : "text-[clamp(3.4rem,9vw,11rem)] leading-[0.86]"
            }`}
          >
            {x(service.title)}
          </h2>

          <p className="mt-8 max-w-xl text-[clamp(1.2rem,2vw,1.7rem)] leading-snug opacity-90">
            {x(service.statement)}
          </p>

          <h3 className="meta mt-12 opacity-60">
            {t("services.capabilities")}
          </h3>

          <ul
            className={`mt-4 grid gap-x-10 ${
              service.capabilities.length > 5
                ? "sm:grid-cols-2"
                : ""
            }`}
          >
            {service.capabilities.map((capability) => (
              <li
                key={capability.en}
                className="flex gap-3 border-t border-current/20 py-2.5 text-[0.9688rem] leading-snug"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.55em] h-1.5 w-1.5 shrink-0"
                  style={{
                    background: theme.accent,
                  }}
                />

                {x(capability)}
              </li>
            ))}
          </ul>

          {service.projects.length > 0 && (
            <>
              <h3 className="meta mt-12 opacity-60">
                {t("services.related")}
              </h3>

              <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-1">
                {service.projects.map((slug) => {
                  const project = projectBySlug[slug];

                  if (!project) return null;

                  return (
                    <li key={slug}>
                      <TransitionLink
                        href={href(`/work/${slug}`)}
                        data-cursor="link"
                        className="link-line display display-wide inline-flex items-center gap-2 text-2xl"
                      >
                        {x(project.name)}

                        <Arrow
                          className="h-3 w-3"
                          stroke={16}
                        />
                      </TransitionLink>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </motion.div>

        {/* Visuals beside content */}
        {Visual && (
          <div
            className={`relative min-w-0 lg:col-span-5 ${
              index % 2
                ? "lg:order-1 lg:col-start-1"
                : "lg:col-start-8"
            }`}
          >
            <Visual />
          </div>
        )}

        {!Visual && (
          <div className="lg:col-span-5 lg:col-start-8">
            <p
              className="display display-wide text-[clamp(2rem,4vw,4.2rem)] leading-[1.02]"
              style={{
                color: theme.accent,
              }}
            >
              {x(service.short)}

              <span className="block opacity-30">
                →
              </span>
            </p>
          </div>
        )}
      </div>

      {!Visual && (
        <div className="relative mt-16">
          <Button href={href("/contact")}>
            {t("nav.talk")}
          </Button>
        </div>
      )}
    </section>
  );
}

/* ==========================================
   FIXED CHAPTER INDEX
========================================== */

function ChapterIndex({ services }) {
  const { x } = useLocale();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const elements = document.querySelectorAll(
      "[data-chapter]"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(
              Number(
                entry.target.getAttribute("data-chapter")
              )
            );
          }
        });
      },
      {
        rootMargin: "-45% 0px -45% 0px",
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Services"
      className="fixed end-5 top-1/2 z-[60] hidden -translate-y-1/2 mix-blend-difference text-white xl:block"
    >
      <ul className="grid gap-3">
        {services.map((service, index) => (
          <li key={service.slug}>
            <a
              href={`#${service.slug}`}
              data-cursor="link"
              className="group flex items-center justify-end gap-3"
            >
              <span
                className={`meta transition-all duration-500 ${
                  active === index
                    ? "translate-x-0 opacity-100"
                    : "pointer-events-none translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                }`}
              >
                {x(service.short)}
              </span>

              <span
                className={`block h-px transition-all duration-500 ${
                  active === index
                    ? "w-10 bg-white"
                    : "w-5 bg-white/50 group-hover:w-8"
                }`}
              />

              <span className="meta w-5 tabular-nums">
                {pad2(index + 1)}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ==========================================
   HERO BACKGROUND
========================================== */

function ServicesHeroBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(
              ellipse at 8% 42%,
              rgba(10, 90, 96, 0.34) 0%,
              transparent 52%
            ),
            radial-gradient(
              ellipse at 95% 65%,
              rgba(8, 116, 119, 0.24) 0%,
              transparent 48%
            ),
            linear-gradient(
              135deg,
              #142535 0%,
              #101B29 55%,
              #0B1724 100%
            )
          `,
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute end-[-15%] top-[10%] z-0 h-[55vw] w-[55vw] max-h-[750px] max-w-[750px] rounded-full opacity-40 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(10,138,134,0.16), transparent 65%)",
        }}
      />
    </>
  );
}

/* ==========================================
   CAPABILITIES MARQUEE

   FIX:
   - LTR animation track in both languages
   - Arabic labels when isRTL is true
   - Independent from page direction
========================================== */

const marqueeCapabilities = [
  {
    en: "Brand",
    ar: "العلامة التجارية",
  },
  {
    en: "Creative",
    ar: "الإبداع",
  },
  {
    en: "Content",
    ar: "المحتوى",
  },
  {
    en: "Digital",
    ar: "الحلول الرقمية",
  },
  {
    en: "Campaign",
    ar: "الحملات",
  },
  {
    en: "Production",
    ar: "الإنتاج",
  },
  {
    en: "Experience",
    ar: "التجارب",
  },
];

function CapabilitiesMarquee() {
  const { isRTL } = useLocale();

  return (
    <div
      dir="ltr"
      className="relative w-full overflow-hidden border-t border-white/15"
    >
      <div className="capabilities-marquee-track flex w-max items-center">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1 ? "true" : undefined}
            className="flex shrink-0 items-center"
          >
            {marqueeCapabilities.map((capability, index) => (
              <span
                key={`${copy}-${index}`}
                dir={isRTL ? "rtl" : "ltr"}
                className={`display mx-5 inline-flex shrink-0 items-center gap-4 whitespace-nowrap py-4 text-white/55 sm:py-5 ${
                  isRTL
                    ? "text-[clamp(1.3rem,2.5vw,2.2rem)] leading-[1.6]"
                    : "text-[clamp(1.5rem,3vw,3rem)] leading-[1.15]"
                }`}
              >
                {isRTL
                  ? capability.ar
                  : capability.en}

                <Arrow
                  className="h-[0.55em] w-[0.55em] shrink-0 text-[#FF6A1F]"
                  stroke={12}
                />
              </span>
            ))}
          </div>
        ))}
      </div>

      <style jsx>{`
        .capabilities-marquee-track {
          animation: capabilities-scroll 45s linear infinite;
          will-change: transform;
        }

        @keyframes capabilities-scroll {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .capabilities-marquee-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

/* ==========================================
   SERVICES HERO
========================================== */

function ServicesHero() {
  const { t, isRTL } = useLocale();

  const pageTitle = t("services.page.title");

  const titleParts = pageTitle.match(
    /^(Six capabilities\.)\s*(One line\.)$/i
  );

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#101B29] px-[var(--pad)] pb-0 pt-36 text-[#F5F4F0] sm:pt-40 lg:min-h-[100dvh] 2xl:min-h-[100svh]">
      <ServicesHeroBackground />

      <div className="relative z-10 flex flex-1 flex-col justify-center py-12 sm:py-16 lg:py-14">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF6A1F]" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
            SAIL Creative Solutions
          </span>
        </div>

        <h1
          className={`display max-w-[1200px] text-[#F5F4F0] ${
            isRTL
              ? "text-[clamp(2.6rem,5.8vw,5.8rem)] leading-[1.4] tracking-normal"
              : "text-[clamp(3.4rem,8.3vw,9rem)] leading-[1.02] tracking-[-0.045em]"
          }`}
        >
          {isRTL ? (
            <motion.span
              initial={{
                opacity: 0,
                y: 24,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
                ease,
              }}
              className="block"
            >
              {pageTitle}
            </motion.span>
          ) : titleParts ? (
            <>
              <span className="block">
                <RevealText
                  text={titleParts[1]}
                  immediate
                  stagger={0.08}
                />
              </span>

              <span className="mt-1 block sm:mt-2">
                <RevealText
                  text={titleParts[2]}
                  immediate
                  stagger={0.08}
                />
              </span>
            </>
          ) : (
            <RevealText
              text={pageTitle}
              immediate
              stagger={0.08}
            />
          )}
        </h1>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <p
            className={`max-w-[530px] text-white/70 ${
              isRTL
                ? "text-base leading-[1.9] sm:text-lg"
                : "text-base leading-[1.75] sm:text-lg"
            }`}
          >
            {t("services.page.sub")}
          </p>

          <div
            aria-hidden="true"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/25 md:flex"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF6A1F]" />
          </div>
        </div>
      </div>

      {/* Visible in Arabic and English */}
      <div className="relative z-10 -mx-[var(--pad)]">
        <CapabilitiesMarquee />
      </div>
    </section>
  );
}

/* ==========================================
   MAIN EXPORT
========================================== */

export default function ServiceChapters({ services }) {
  return (
    <>
      <ServicesHero />

      <ChapterIndex services={services} />

      {services.map((service, index) => (
        <Chapter
          key={service.slug}
          service={service}
          index={index}
        />
      ))}
    </>
  );
}