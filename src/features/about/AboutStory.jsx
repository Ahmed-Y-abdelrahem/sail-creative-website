
"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

import RevealText from "@/components/ui/RevealText";
import Arrow from "@/components/ui/Arrow";
import { SectionLabel } from "@/components/ui/Section";
import PartnersField from "@/features/home/PartnersField";
import OriginSection from "@/features/about/OriginSection";
import { useLocale } from "@/components/shared/LocaleProvider";
import { capabilityLine, site } from "@/data/site";
import { pad2 } from "@/lib/utils";

/* ==========================================
   ANIMATION SETTINGS
========================================== */

const ease = [0.16, 1, 0.3, 1];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.75, ease },
};

/* ==========================================
   GRADIENT BACKGROUND
========================================== */

function GradientBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(
              ellipse at 5% 25%,
              rgba(0,133,132,0.22),
              transparent 48%
            ),
            radial-gradient(
              ellipse at 95% 80%,
              rgba(0,137,132,0.13),
              transparent 48%
            ),
            radial-gradient(
              ellipse at 85% 5%,
              rgba(255,106,31,0.09),
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
    </>
  );
}

/* ==========================================
   01 — HERO
========================================== */

function AboutHero() {
  const { t, num, isRTL } = useLocale();

  const heroTitle = t("about.title");
  const words = heroTitle.split(" ");

  const heroLines = [
    words[0],
    words.slice(1).join(" "),
  ];

  return (
    <section
      className="
        relative isolate flex min-h-[100svh]
        flex-col overflow-hidden
        bg-[#101C2A]
        px-[var(--pad)]
        pb-8 pt-32 text-white
        sm:pb-10 sm:pt-36
        lg:pb-12 lg:pt-40
      "
    >
      <GradientBackground />

      {/* SAIL BOAT */}
      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          end-[7%] top-[20%]
          w-[8vw] min-w-[3.5rem] max-w-[7rem]
        "
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <Image
          src="/brand/sail-boat.png"
          alt=""
          width={160}
          height={179}
          priority
          className="h-auto w-full"
        />
      </motion.div>

      {/* HERO CONTENT */}
      <div className="relative z-10 flex flex-1 flex-col justify-center py-8">
        <div className="mb-8 flex items-center gap-3">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6A1F]" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
            SAIL Creative Solutions
          </span>
        </div>

        <h1
          className={`
            display relative z-10
            max-w-[1100px] text-white
            ${
              isRTL
                ? "text-[clamp(2.6rem,5.5vw,5.5rem)] leading-[1.4] tracking-normal"
                : "text-[clamp(3.5rem,9vw,10rem)] leading-[1.02] tracking-[-0.045em]"
            }
          `}
        >
          {isRTL ? (
            <motion.span
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.2,
              }}
              className="block"
            >
              {heroTitle}
            </motion.span>
          ) : (
            <RevealText
              lines={heroLines}
              immediate
              stagger={0.1}
            />
          )}
        </h1>
      </div>

      {/* HERO FOOTER */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-6">
        <p className="meta flex items-center gap-3 text-orange">
          <Arrow className="h-3 w-3" stroke={16} />
          {t("hero.location")}
        </p>

        <p className="meta text-white/55">
          {num(site.since)} → {num(2026)}
        </p>
      </div>
    </section>
  );
}

/* ==========================================
   03 — HOW WE THINK
========================================== */

const philosophyContent = {
  ar: {
    eyebrow: "فلسفتنا",
    title: "نفكر بشكل مختلف. لنصنع أثرًا حقيقيًا.",
    description:
      "نؤمن أن نجاح العلامات التجارية لا يعتمد على التصميم وحده، ولا على التكنولوجيا وحدها. النجاح يبدأ بفهم الأعمال والجمهور، ثم الجمع بين الاستراتيجية والإبداع والتنفيذ التقني لصناعة حلول تحقق أهدافًا واضحة.",
    quote: "لا نقدم خدمات منفصلة، بل نصنع حلولًا مترابطة.",
    pillars: [
      {
        number: "01",
        title: "نفهم أولًا",
        en: "Understand",
        description:
          "ندرس أهداف المشروع والجمهور والتحديات قبل اختيار الحل المناسب.",
      },
      {
        number: "02",
        title: "نبتكر بوضوح",
        en: "Create",
        description:
          "نحوّل الرؤية إلى أفكار وتجارب إبداعية تخدم هوية العلامة التجارية.",
      },
      {
        number: "03",
        title: "ننفذ ونطوّر",
        en: "Build & Grow",
        description:
          "نجمع بين البرمجة والتسويق والإنتاج الإعلامي لتنفيذ حلول قابلة للتطوير.",
      },
    ],
  },

  en: {
    eyebrow: "How We Think",
    title: "Different thinking. Meaningful impact.",
    description:
      "Great brands are built through more than design or technology alone. We start by understanding the business and its audience, then combine strategy, creativity, and technical execution to deliver solutions with clear purpose.",
    quote:
      "We don't deliver disconnected services. We build connected solutions.",
    pillars: [
      {
        number: "01",
        title: "Understand",
        en: "Research & Strategy",
        description:
          "We explore business goals, audiences, and challenges before defining the right direction.",
      },
      {
        number: "02",
        title: "Create",
        en: "Creative Thinking",
        description:
          "We turn ideas into distinctive identities, content, and digital experiences.",
      },
      {
        number: "03",
        title: "Build & Grow",
        en: "Execution & Performance",
        description:
          "We bring software, marketing, and media together to build scalable solutions.",
      },
    ],
  },
};

function PhilosophySection() {
  const { isRTL } = useLocale();

  const data = isRTL
    ? philosophyContent.ar
    : philosophyContent.en;

  return (
    <section
      aria-labelledby="philosophy-title"
      className="
        relative isolate overflow-hidden
        bg-[#101B29] px-[var(--pad)]
        py-20 text-white sm:py-28
      "
    >
      <GradientBackground />

      <div className="relative z-10 mx-auto max-w-[1440px]">
        <SectionLabel index="02">
          {data.eyebrow}
        </SectionLabel>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <motion.div
            {...reveal}
            className="lg:col-span-7"
          >
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#FF8A4A]">
              SAIL / Our Philosophy
            </p>

            <h2
              id="philosophy-title"
              className={`
                display max-w-[850px]
                ${
                  isRTL
                    ? "text-[clamp(2rem,3.8vw,4rem)] leading-[1.5] tracking-normal"
                    : "text-[clamp(2.8rem,5.8vw,6rem)] leading-[1.12] tracking-[-0.04em]"
                }
              `}
            >
              {data.title}
            </h2>
          </motion.div>

          <motion.div
            {...reveal}
            className="lg:col-span-4 lg:col-start-9 lg:self-end"
          >
            <p className="max-w-[520px] text-[0.95rem] leading-[2] text-white/65 sm:text-base">
              {data.description}
            </p>
          </motion.div>
        </div>

        {/* PHILOSOPHY PILLARS */}
        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-3 sm:mt-20">
          {data.pillars.map((pillar, index) => (
            <motion.article
              key={pillar.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease,
              }}
              className="
                group flex min-h-[250px] flex-col
                bg-[#132334] p-6
                transition-colors duration-300
                hover:bg-[#193344] sm:p-8
              "
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tabular-nums text-[#FF6A1F]">
                  {pillar.number}
                </span>

                <span className="h-2 w-2 rounded-full border border-white/35 transition-colors group-hover:bg-[#FF6A1F]" />
              </div>

              <div className="mt-12">
                <h3
                  className={`
                    display text-white
                    ${
                      isRTL
                        ? "text-[clamp(1.4rem,2.1vw,2rem)] leading-[1.5]"
                        : "text-[clamp(1.7rem,2.4vw,2.5rem)] leading-[1.2]"
                    }
                  `}
                >
                  {pillar.title}
                </h3>

                <p
                  dir="ltr"
                  className="mt-2 text-start text-[10px] uppercase tracking-[0.12em] text-[#69B6B4]"
                >
                  {pillar.en}
                </p>

                <p className="mt-5 max-w-sm text-sm leading-[1.9] text-white/60">
                  {pillar.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* BOTTOM STATEMENT */}
        <motion.div
          {...reveal}
          className="mt-10 flex flex-wrap items-center gap-4 border-t border-white/10 pt-7"
        >
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#FF6A1F]" />

          <p
            className={`
              font-medium text-white/80
              ${
                isRTL
                  ? "text-base leading-[1.9]"
                  : "text-lg leading-[1.6]"
              }
            `}
          >
            {data.quote}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ==========================================
   04 — LINE OF WORK
========================================== */

function LineOfWork() {
  const { t, x, isRTL } = useLocale();

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.6"],
  });

  const boatTop = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <section
      className="surface-paper relative overflow-x-clip px-[var(--pad)] py-20 sm:py-28"
      aria-labelledby="line-title"
    >
      <SectionLabel index="03">
        {t("about.line.label")}
      </SectionLabel>

      <div className="mt-9 grid gap-8 lg:grid-cols-12">
        <h2
          id="line-title"
          className={`
            display lg:col-span-8
            ${
              isRTL
                ? "text-[clamp(2rem,4vw,4.5rem)] leading-[1.35]"
                : "text-[clamp(2.6rem,6vw,7rem)] leading-[1.05]"
            }
          `}
        >
          {isRTL ? (
            t("about.line.title")
          ) : (
            <RevealText text={t("about.line.title")} />
          )}
        </h2>

        <p className="max-w-sm text-sm leading-[1.9] text-ink/75 sm:text-base lg:col-span-3 lg:col-start-10 lg:self-end">
          {t("about.line.body")}
        </p>
      </div>

      <div
        ref={ref}
        className="relative mx-auto mt-16 max-w-6xl sm:mt-20"
      >
        <span
          aria-hidden="true"
          className="absolute inset-y-0 start-1/2 w-px bg-ink/15 max-md:start-3"
        />

        <motion.span
          aria-hidden="true"
          className="absolute start-1/2 top-0 h-full w-px origin-top bg-orange max-md:start-3"
          style={{
            scaleY: scrollYProgress,
          }}
        />

        <motion.div
          aria-hidden="true"
          className="absolute start-1/2 z-10 w-10 -translate-x-1/2 max-md:start-3 max-md:w-8"
          style={{
            top: boatTop,
          }}
        >
          <Image
            src="/brand/sail-boat.png"
            alt=""
            width={160}
            height={179}
            className="-mt-9 h-auto w-full"
          />
        </motion.div>

        <ol className="grid gap-14 md:gap-20">
          {capabilityLine.map((item, index) => {
            const left = index % 2 === 0;

            return (
              <li
                key={item.en}
                className="relative grid md:grid-cols-2"
              >
                <span
                  aria-hidden="true"
                  className="absolute start-1/2 top-6 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-ink max-md:start-3"
                />

                <motion.div
                  className={`
                    ps-10 md:ps-0
                    ${
                      left
                        ? "md:pe-16 md:text-end"
                        : "md:col-start-2 md:ps-16"
                    }
                  `}
                  initial={{
                    opacity: 0,
                    x:
                      (left ? -1 : 1) *
                      (isRTL ? -1 : 1) *
                      60,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: "-15% 0px",
                  }}
                  transition={{
                    duration: 1,
                    ease,
                  }}
                >
                  <p className="meta tabular-nums text-orange">
                    {pad2(index + 1)}
                  </p>

                  <h3
                    className={`
                      display
                      ${
                        isRTL
                          ? "text-[clamp(1.8rem,3.8vw,3.5rem)] leading-[1.4]"
                          : "text-[clamp(2.5rem,6vw,6rem)] leading-[1.05]"
                      }
                    `}
                  >
                    {x(item)}
                  </h3>

                  <p className="mt-3 text-sm leading-[1.8] text-ink/65 sm:text-base">
                    {x(item.note)}
                  </p>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ==========================================
   05 — TODAY
========================================== */

const todayContent = {
  ar: {
    eyebrow: "سيل اليوم",
    title: "خبرات متعددة. فريق واحد. رؤية متكاملة.",
    description:
      "اليوم، نجمع في سيل بين الخبرة التقنية والتسويقية والإبداعية لنقدم حلولًا تساعد الشركات على بناء حضور أقوى، وتطوير أعمالها، وتحقيق نمو قابل للقياس.",
    areas: [
      "تطوير البرمجيات والمواقع",
      "التسويق الرقمي وإدارة الحملات",
      "الإنتاج الإعلامي وصناعة المحتوى",
      "الهوية التجارية والتصميم",
      "تحسين محركات البحث",
      "الفعاليات والحلول الإبداعية",
    ],
    closing:
      "شريك واحد يجمع الاستراتيجية والإبداع والتكنولوجيا.",
  },

  en: {
    eyebrow: "SAIL Today",
    title: "Multiple disciplines. One connected team.",
    description:
      "Today, SAIL brings together technical, marketing, and creative expertise to help businesses build a stronger presence, develop better experiences, and pursue measurable growth.",
    areas: [
      "Software & Web Development",
      "Digital Marketing & Paid Media",
      "Media & Content Production",
      "Branding & Creative Design",
      "Search Engine Optimization",
      "Events & Creative Solutions",
    ],
    closing:
      "One partner connecting strategy, creativity, and technology.",
  },
};

function TodaySection() {
  const { isRTL } = useLocale();

  const data = isRTL
    ? todayContent.ar
    : todayContent.en;

  return (
    <section
      aria-labelledby="today-title"
      className="
        surface-light relative overflow-hidden
        px-[var(--pad)] py-20 sm:py-28
      "
    >
      <div className="mx-auto max-w-[1440px]">
        <SectionLabel index="04">
          {data.eyebrow}
        </SectionLabel>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* TITLE AND DESCRIPTION */}
          <motion.div
            {...reveal}
            className="lg:col-span-6"
          >
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0A8A86]">
              SAIL Creative Solutions
            </p>

            <h2
              id="today-title"
              className={`
                display max-w-[750px] text-ink
                ${
                  isRTL
                    ? "text-[clamp(2rem,3.7vw,3.9rem)] leading-[1.5] tracking-normal"
                    : "text-[clamp(2.7rem,5.2vw,5.5rem)] leading-[1.12] tracking-[-0.035em]"
                }
              `}
            >
              {data.title}
            </h2>

            <div className="mt-7 h-1 w-14 rounded-full bg-[#FF6A1F]" />

            <p className="mt-7 max-w-[580px] text-[0.95rem] leading-[2] text-ink/65 sm:text-base">
              {data.description}
            </p>
          </motion.div>

          {/* EXPERTISE LIST */}
          <motion.div
            {...reveal}
            className="lg:col-span-5 lg:col-start-8"
          >
            <div className="border-t border-ink/15">
              {data.areas.map((area, index) => (
                <div
                  key={area}
                  className="
                    group flex items-center gap-5
                    border-b border-ink/10
                    py-5 transition-colors
                    hover:bg-[#0A8A86]/[0.035]
                  "
                >
                  <span className="w-7 shrink-0 text-xs font-semibold tabular-nums text-[#FF6A1F]">
                    {pad2(index + 1)}
                  </span>

                  <h3
                    className={`
                      flex-1 font-semibold text-ink
                      ${
                        isRTL
                          ? "text-[0.95rem] leading-[1.8] sm:text-base"
                          : "text-base leading-[1.5] sm:text-lg"
                      }
                    `}
                  >
                    {area}
                  </h3>

                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0A8A86]/40 transition-colors group-hover:bg-[#FF6A1F]"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* BOTTOM SIGNATURE */}
        <motion.div
          {...reveal}
          className="
            mt-14 flex flex-wrap items-center
            justify-between gap-5
            border-t border-ink/10 pt-7
            sm:mt-20
          "
        >
          <p className="max-w-xl text-sm font-medium leading-[1.9] text-ink/65">
            {data.closing}
          </p>

          <span
            dir="ltr"
            className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0A8A86]"
          >
            SAIL / Built to Grow
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* ==========================================
   ABOUT PAGE
========================================== */

export default function AboutStory() {
  return (
    <>
      {/* 01 — HERO */}
      <AboutHero />

      {/* 02 — WHO WE ARE */}
      <OriginSection />

      {/* 03 — HOW WE THINK */}
      <PhilosophySection />

      {/* 04 — LINE OF WORK */}
      <LineOfWork />

      {/* 05 — TODAY */}
      <TodaySection />

      {/* 06 — PARTNERS */}
      <PartnersField index="05" />
    </>
  );
}
