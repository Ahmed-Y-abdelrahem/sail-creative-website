
"use client";

import { useState } from "react";
import RevealText from "@/components/ui/RevealText";
import { useLocale } from "@/components/shared/LocaleProvider";
import { site } from "@/data/site";

/* ==========================================
   SAIL OFFICE LOCATION
========================================== */

const OFFICE = {
  name: "Sail Creative Solutions",
  lat: 26.3728139,
  lng: 50.1203853,
  googleMaps: "https://maps.app.goo.gl/QiAmLrAUBEVztD9j7",
};

const MAP_EMBED = `https://maps.google.com/maps?q=${OFFICE.lat},${OFFICE.lng}&z=17&output=embed`;

/* ==========================================
   ICONS
========================================== */

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 rtl:-scale-x-100"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

/* ==========================================
   COMPANY LOCATION MAP
========================================== */

function LocationMap({ isRTL }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#132532]">
      {/* MAP HEADER */}

      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#FF6A1F]/30 bg-[#FF6A1F]/10 text-[#FF6A1F]">
            <PinIcon />
          </span>

          <div>
            <p className="text-sm font-semibold text-white">
              {isRTL
                ? "سيل للحلول التسويقية الإبداعية"
                : "Sail Creative Solutions"}
            </p>

            <p className="mt-1 text-xs text-white/50">
              {isRTL
                ? "مقر الشركة - المملكة العربية السعودية"
                : "Company Office - Saudi Arabia"}
            </p>
          </div>
        </div>

        <a
          href={OFFICE.googleMaps}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-[#FF6A1F]/30 px-4 py-2 text-xs font-semibold text-[#FF874A] transition-all duration-300 hover:border-[#FF6A1F] hover:bg-[#FF6A1F] hover:text-[#101C2A]"
        >
          {isRTL ? "افتح الموقع" : "View Location"}
          <ArrowIcon />
        </a>
      </div>

      {/* ACTUAL OFFICE MAP */}

      <div className="relative h-[260px] w-full bg-[#172B37] sm:h-[320px] lg:h-[360px]">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <span className="h-7 w-7 animate-spin rounded-full border-2 border-white/15 border-t-[#FF6A1F]" />

              <p className="text-xs text-white/50">
                {isRTL
                  ? "جاري تحميل موقع الشركة..."
                  : "Loading office location..."}
              </p>
            </div>
          </div>
        )}

        <iframe
          key={MAP_EMBED}
          title={
            isRTL
              ? "موقع شركة سيل للحلول التسويقية الإبداعية"
              : "Sail Creative Solutions Office Location"
          }
          src={MAP_EMBED}
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setLoaded(true)}
          className="absolute inset-0 h-full w-full border-0"
          allowFullScreen
        />
      </div>

      {/* MAP FOOTER */}

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#FF6A1F]" />

          <p className="text-xs text-white/65">
            {isRTL
              ? "موقع مكتب SAIL Creative Solutions"
              : "SAIL Creative Solutions Office"}
          </p>
        </div>

        <a
          href={OFFICE.googleMaps}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-xs font-semibold text-white transition-colors hover:text-[#FF6A1F]"
        >
          {isRTL
            ? "الاتجاهات عبر خرائط Google"
            : "Get Directions on Google Maps"}

          <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
            <ArrowIcon />
          </span>
        </a>
      </div>
    </div>
  );
}

/* ==========================================
   CONTACT HERO
========================================== */

export default function ContactHero({ children }) {
  const { t, isRTL } = useLocale();

  const links = [
    ["footer.instagram", site.social.instagram],
    ["footer.linkedin", site.social.linkedin],
    ["footer.whatsapp", site.social.whatsapp],
  ];

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="relative isolate overflow-hidden bg-[#101C2A] px-[var(--pad)] pb-12 pt-28 text-white sm:pb-16 sm:pt-32 lg:pt-36"
    >
      {/* ==================================
          CSS BACKGROUND - NO IMAGES
      ================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(
              ellipse at 0% 20%,
              rgba(0, 133, 132, 0.20),
              transparent 48%
            ),
            radial-gradient(
              ellipse at 100% 75%,
              rgba(0, 137, 132, 0.14),
              transparent 45%
            ),
            radial-gradient(
              ellipse at 85% 0%,
              rgba(255, 106, 31, 0.07),
              transparent 40%
            ),
            linear-gradient(
              135deg,
              #142535 0%,
              #101C2A 55%,
              #0B1724 100%
            )
          `,
        }}
      />

      {/* SUBTLE GRID */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(255,255,255,0.25) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.25) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "70px 70px",
        }}
      />

      <div className="relative mx-auto max-w-[1440px]">
        {/* ==================================
            TOP LABEL
        ================================== */}

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF6A1F]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">
              SAIL Creative Solutions
            </span>
          </div>

          <span className="text-[10px] uppercase tracking-[0.14em] text-white/35">
            {isRTL ? "تواصل معنا" : "Get in touch"}
          </span>
        </div>

        {/* ==================================
            TITLE AND DESCRIPTION
        ================================== */}

        <div className="grid gap-7 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="min-w-0 lg:col-span-8">
            <h1
              className={`
                display
                max-w-[850px]
                text-white
                ${
                  isRTL
                    ? "text-[clamp(2rem,3.8vw,4rem)] leading-[1.4] tracking-normal"
                    : "text-[clamp(2.5rem,5.3vw,5.5rem)] leading-[1.08] tracking-[-0.045em]"
                }
              `}
            >
              {isRTL ? (
                <span className="block">
                  {t("cta.title")}
                </span>
              ) : (
                <RevealText
                  text={t("cta.title")}
                  immediate
                  stagger={0.07}
                />
              )}
            </h1>
          </div>

          <div className="lg:col-span-4 lg:pb-2">
            <p className="max-w-sm text-sm leading-[1.9] text-white/65 sm:text-[15px]">
              {t("contact.sub")}
            </p>

            <div className="mt-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#FF6A1F]" />

              <span className="text-[10px] uppercase tracking-[0.12em] text-white/40">
                Marketing · Technology · Growth
              </span>
            </div>
          </div>
        </div>

        {/* DIVIDER */}

        <div className="mt-10 h-px w-full bg-white/10 sm:mt-12" />

        {/* ==================================
            EXISTING CONTACT FORM
        ================================== */}

        <div className="mt-10 sm:mt-12">
          {children}
        </div>

        {/* ==================================
            LOCATION SECTION
        ================================== */}

        <div className="mt-14 border-t border-white/10 pt-10 sm:mt-16 sm:pt-12">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF6A1F]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
                  {isRTL ? "موقعنا" : "Find us"}
                </span>
              </div>

              <h2
                className={`
                  display
                  text-white
                  ${
                    isRTL
                      ? "text-[clamp(1.6rem,2.6vw,2.5rem)] leading-[1.4]"
                      : "text-[clamp(1.8rem,3vw,3rem)] leading-[1.1] tracking-[-0.03em]"
                  }
                `}
              >
                {isRTL
                  ? "زورنا في مقر الشركة"
                  : "Visit our office."}
              </h2>
            </div>

            <p className="max-w-sm text-xs leading-[1.8] text-white/50 sm:text-sm">
              {isRTL
                ? "نسعد بتواصلك معنا ومناقشة أفكارك ومشروعاتك القادمة."
                : "We would love to connect and discuss your next project."}
            </p>
          </div>

          <LocationMap isRTL={isRTL} />
        </div>


      </div>
    </section>
  );
}
