
import Image from "next/image";
import TransitionLink from "./TransitionLink";
import BackToTop from "@/components/shared/BackToTop";
import { Container } from "@/components/ui/Section";
import { nav, site } from "@/data/site";
import { t } from "@/data/dictionary";
import { localePath, numerals } from "@/lib/i18n";

/* CTA ARROW */

function CTAArrow() {
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

/* FOOTER BACKGROUND */

function FooterBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #101B29 0%, #142334 48%, #0C1927 100%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 42% 65% at 0% 45%, rgba(0,124,131,0.14), transparent 75%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 38% 60% at 100% 55%, rgba(0,129,134,0.15), transparent 75%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 35% 35% at 88% 0%, rgba(255,106,31,0.065), transparent 75%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}

/* FOOTER */

export default function Footer({ locale }) {
  const L = (key) => t(locale, key);
  const p = (path) => localePath(locale, path);
  const year = numerals(new Date().getFullYear(), locale);
  const isArabic = locale === "ar";

  const footerTopics = isArabic
    ? ["التسويق", "التكنولوجيا", "النمو"]
    : ["Marketing", "Technology", "Growth"];

  const caseStudiesLabel = isArabic
    ? "دراسات الحالة"
    : "Case Studies";

  const caseStudiesItem = {
    key: "caseStudies",
    href: "/case-studies",
  };

  // Avoid duplicate Case Studies links.
  const baseNav = nav.filter(
    (item) =>
      item.key !== "caseStudies" &&
      item.href !== "/case-studies"
  );

  const footerNav = [...baseNav];

  const workIndex = footerNav.findIndex(
    (item) =>
      item.key === "work" || item.href === "/work"
  );

  if (workIndex >= 0) {
    footerNav.splice(
      workIndex + 1,
      0,
      caseStudiesItem
    );
  } else {
    footerNav.push(caseStudiesItem);
  }

  const getNavLabel = (item) => {
    if (item.key === "caseStudies") {
      return caseStudiesLabel;
    }

    return L(`nav.${item.key}`);
  };

  return (
    <footer
      className="
        relative isolate overflow-hidden
        bg-[#101B29] text-paper
      "
    >
      <FooterBackground />

      {/* CTA SECTION */}

      <section
        aria-labelledby="footer-cta-title"
        className="relative z-10 overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            -end-40 -top-40
            h-[360px] w-[360px]
            rounded-full border
            border-[#FF6A1F]/10
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            -end-24 -top-24
            h-[240px] w-[240px]
            rounded-full border
            border-white/[0.05]
          "
        />

        <Container className="relative py-14 sm:py-16 lg:py-20">
          {/* TOP LABEL */}

          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF6A1F]" />

              <span
                className="
                  text-xs font-semibold uppercase
                  tracking-[0.16em] text-white/55
                "
              >
                SAIL Creative Solutions
              </span>
            </div>

            <span
              className="
                hidden text-xs uppercase
                tracking-[0.12em]
                text-white/35 sm:block
              "
            >
              {L("cta.sub")}
            </span>
          </div>

          {/* MAIN CONTENT */}

          <div className="grid gap-9 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="lg:col-span-8">
              <h2
                id="footer-cta-title"
                className="
                  display max-w-[15ch]
                  text-[clamp(2.7rem,5.2vw,5.6rem)]
                  leading-[0.98]
                  tracking-[-0.045em]
                  text-white
                "
              >
                {L("cta.title")}
              </h2>
            </div>

            {/* DESCRIPTION + BUTTON */}

            <div className="flex flex-col items-start gap-7 lg:col-span-4">
              <p
                className="
                  max-w-sm text-sm
                  leading-[1.9]
                  text-white/65
                  sm:text-base
                "
              >
                {L("cta.body")}
              </p>

              <TransitionLink
                href={p("/contact")}
                data-cursor="open"
                data-cursor-label={L("nav.talk")}
                className="
                  group inline-flex min-h-[48px]
                  items-center justify-center gap-5
                  rounded-full bg-[#FF6A1F]
                  px-7 py-3.5
                  text-[13px] font-semibold
                  text-[#101B29]
                  transition-all duration-300
                  hover:bg-[#FF874A]
                  hover:shadow-[0_10px_30px_rgba(255,106,31,0.2)]
                "
              >
                {L("cta.button")}

                <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                  <CTAArrow />
                </span>
              </TransitionLink>
            </div>
          </div>

          {/* BOTTOM STRIP */}

          <div
            className="
              mt-12 flex flex-wrap
              items-center justify-between
              gap-4 border-t border-white/10 pt-5
            "
          >
            <p className="text-xs text-white/45">
              {isArabic
                ? "نحوّل الأفكار إلى تجارب رقمية تصنع الفرق."
                : "Turning ideas into digital experiences that matter."}
            </p>

            <div
              className="
                flex flex-wrap items-center
                gap-2 text-xs uppercase
                tracking-[0.1em] text-white/40
              "
            >
              {footerTopics.map((topic, index) => (
                <span
                  key={topic}
                  className="inline-flex items-center gap-2"
                >
                  {index > 0 && (
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 rounded-full bg-[#FF6A1F]"
                    />
                  )}

                  <span>{topic}</span>
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* FOOTER DETAILS */}

      <div
        className="
          relative z-10 isolate
          overflow-hidden
          border-t border-white/10
        "
      >
        {/* DECORATIVE SAIL WORDMARK */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-0 z-0
            flex items-center justify-center
            overflow-hidden
          "
        >
          <Image
            src="/brand/sail-wordmark.png"
            alt=""
            width={927}
            height={296}
            sizes="(min-width:1024px) 85vw, 90vw"
            className="
              block h-full max-h-[260px]
              w-[88%] max-w-[1100px]
              select-none object-contain
              object-center opacity-[0.075]
            "
          />
        </div>

        {/* FOOTER LINKS */}

        <Container
          className="
            relative z-10 grid gap-8 py-10
            sm:grid-cols-2
            lg:grid-cols-12 lg:gap-10 lg:py-12
          "
        >
          {/* BRAND */}

          <div className="lg:col-span-4">
            <Image
              src="/brand/sail-boat.png"
              alt=""
              width={160}
              height={179}
              className="mb-4 h-11 w-auto opacity-90"
            />

            <p className="meta text-xs opacity-55">
              {L("hero.location")}
            </p>

            <a
              href={site.website}
              className="
                link-line mt-2 inline-flex
                min-h-[44px] items-center text-sm
              "
              dir="ltr"
            >
              {site.websiteLabel}
            </a>
          </div>

          {/* NAVIGATION */}

          <nav
            aria-label={
              isArabic ? "روابط الفوتر" : "Footer"
            }
            className="lg:col-span-4"
          >
            <p className="meta mb-4 text-xs opacity-45">
              {L("footer.explore")}
            </p>

            <ul className="grid gap-1">
              {footerNav.map((item) => (
                <li key={item.key}>
                  <TransitionLink
                    href={p(item.href)}
                    className="
                      link-line inline-flex
                      min-h-[44px] items-center
                      text-sm text-white/80
                      transition-colors
                      hover:text-[#FF6A1F]
                    "
                  >
                    {getNavLabel(item)}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* SOCIAL MEDIA */}

          <div className="lg:col-span-4">
            <p className="meta mb-4 text-xs opacity-45">
              {L("footer.social")}
            </p>

            <ul className="grid gap-1">
              {[
                ["instagram", site.social.instagram],
                ["linkedin", site.social.linkedin],
                ["whatsapp", site.social.whatsapp],
              ].map(([key, url]) => (
                <li key={key}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      link-line inline-flex
                      min-h-[44px] items-center
                      text-sm text-white/80
                      transition-colors
                      hover:text-[#FF6A1F]
                    "
                  >
                    {L(`footer.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>

        {/* COPYRIGHT */}

        <Container
          className="
            relative z-10 flex flex-wrap
            items-center justify-between
            gap-4 border-t border-white/10 py-5
          "
        >
          <p className="meta text-xs opacity-55">
            © {year} SAIL Creative.{" "}
            {L("footer.rights")}
          </p>

          <BackToTop label={L("common.top")} />
        </Container>
      </div>
    </footer>
  );
}
