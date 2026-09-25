"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import RevealText from "@/components/ui/RevealText";
import Arrow from "@/components/ui/Arrow";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/Section";
import PartnersField from "@/features/home/PartnersField";
import { useLocale } from "@/components/shared/LocaleProvider";
import { capabilityLine, companyStatement, site } from "@/data/site";
import { pad2 } from "@/lib/utils";

function LineOfWork() {
  const { t, x, isRTL } = useLocale();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const boatTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="surface-paper relative overflow-x-clip px-[var(--pad)] py-28 sm:py-40" aria-labelledby="line-title">
      <SectionLabel index="03">{t("about.line.label")}</SectionLabel>
      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <h2 id="line-title" className="display text-[clamp(2.8rem,8vw,9.5rem)] leading-[0.88] lg:col-span-8">
          <RevealText text={t("about.line.title")} />
        </h2>
        <p className="max-w-sm text-lg leading-relaxed text-ink/75 lg:col-span-3 lg:col-start-10 lg:self-end">{t("about.line.body")}</p>
      </div>

      <div ref={ref} className="relative mx-auto mt-24 max-w-6xl">
        <span aria-hidden className="absolute inset-y-0 start-1/2 w-px bg-ink/15 max-md:start-3" />
        <motion.span aria-hidden className="absolute start-1/2 top-0 h-full w-px origin-top bg-orange max-md:start-3" style={{ scaleY: scrollYProgress }} />
        <motion.div aria-hidden className="absolute start-1/2 z-10 w-10 -translate-x-1/2 max-md:start-3 max-md:w-8" style={{ top: boatTop }}>
          <Image src="/brand/sail-boat.png" alt="" width={160} height={179} className="-mt-9 h-auto w-full" />
        </motion.div>

        <ol className="grid gap-16 md:gap-24">
          {capabilityLine.map((c, i) => {
            const left = i % 2 === 0;
            return (
              <li key={c.en} className="relative grid md:grid-cols-2">
                <span aria-hidden className="absolute start-1/2 top-6 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-ink max-md:start-3" />
                <motion.div
                  className={`ps-10 md:ps-0 ${left ? "md:pe-16 md:text-end" : "md:col-start-2 md:ps-16"}`}
                  initial={{ opacity: 0, x: (left ? -1 : 1) * (isRTL ? -1 : 1) * 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="meta text-orange tabular-nums">{pad2(i + 1)}</p>
                  <h3 className="display text-[clamp(3rem,7.5vw,8rem)] leading-[0.9]">{x(c)}</h3>
                  <p className="mt-2 text-[1rem] text-ink/65">{x(c.note)}</p>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export default function AboutStory() {
  const { t, x, num, locale } = useLocale();
  const heroLines = t("about.title").split(" ");
  const first = [heroLines[0], heroLines.slice(1).join(" ")];

  return (
    <>
      {/* 1 — Since 2018 */}
      <section className="tex-night grain relative flex min-h-svh flex-col justify-end overflow-hidden px-[var(--pad)] pb-14 pt-40">
        <motion.div aria-hidden className="absolute end-[7%] top-[18%] w-[9vw] min-w-[4.5rem] max-w-[9rem]" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, delay: 0.5 }}>
          <Image src="/brand/sail-boat.png" alt="" width={160} height={179} priority className="h-auto w-full" />
        </motion.div>
        <h1 className="display text-[clamp(4.2rem,17.5vw,23rem)] leading-[0.8]">
          <RevealText lines={first} immediate stagger={0.1} />
        </h1>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-6">
          <p className="meta flex items-center gap-3 text-orange">
            <Arrow className="h-3 w-3" stroke={16} />
            {t("hero.location")}
          </p>
          <p className="meta opacity-60">{num(site.since)} → 2026</p>
        </div>
      </section>

      {/* 2 — Origin, in both languages, exactly as the profile has it */}
      <section className="surface-light tex-day px-[var(--pad)] py-28 sm:py-40" aria-labelledby="origin-title">
        <SectionLabel index="01">{t("about.origin.label")}</SectionLabel>
        <h2 id="origin-title" className="sr-only">
          {t("about.origin.label")}
        </h2>
        <div className="mt-14 grid gap-16 lg:grid-cols-2 lg:gap-24">
          <p lang="en" dir="ltr" className="display display-wide text-[clamp(1.5rem,2.7vw,2.9rem)] leading-[1.14]" style={{ fontStretch: "90%", fontFamily: "'Bricolage Grotesque Variable', system-ui, sans-serif" }}>
            <RevealText text={companyStatement.en} stagger={0.015} />
          </p>
          <p lang="ar" dir="rtl" className="text-[clamp(1.5rem,2.5vw,2.6rem)] font-semibold leading-[1.6]" style={{ fontFamily: "'Noto Kufi Arabic Variable', system-ui, sans-serif" }}>
            <RevealText text={companyStatement.ar} stagger={0.03} />
          </p>
        </div>
      </section>

      {/* 3 — Philosophy */}
      <section className="tex-night relative overflow-hidden px-[var(--pad)] py-32 sm:py-44" aria-labelledby="philosophy-title">
        <SectionLabel index="02">{t("about.philosophy.label")}</SectionLabel>
        <h2 id="philosophy-title" className="display mt-12 max-w-[18ch] text-[clamp(2.6rem,7.4vw,8.8rem)] leading-[0.94]">
          <RevealText text={t("about.philosophy.title")} stagger={0.05} />
        </h2>
        <p className="display outline-text mt-16 text-[clamp(3.4rem,13vw,17rem)] leading-[0.86] text-white/80">
          <RevealText text={t("about.philosophy.body")} stagger={0.12} />
        </p>
      </section>

      <LineOfWork />

      {/* 4 — Today */}
      <section className="surface-light px-[var(--pad)] py-24 sm:py-32">
        <SectionLabel index="04">{t("about.today.label")}</SectionLabel>
        <p className="display display-wide mt-10 max-w-4xl text-[clamp(1.6rem,3.2vw,3.6rem)] leading-[1.1]" style={{ fontStretch: "90%" }}>
          {t("about.today.body")}
        </p>
      </section>

      {/* 5 — Who sails with us */}
      <PartnersField index="05" />

      {/* 6 — Approach */}
      <section className="relative overflow-hidden px-[var(--pad)] py-32 sm:py-44" style={{ background: "#0a5a60" }}>
        <h2 className="display text-[clamp(3.4rem,13.5vw,18rem)] leading-[0.84]">
          <RevealText text={t("about.approach.title")} stagger={0.1} />
        </h2>
        <div className="mt-14 flex flex-wrap items-end justify-between gap-8">
          <p className="max-w-md text-xl leading-relaxed text-white/85">{t("about.approach.body")}</p>
          <Button variant="light" href={locale === "ar" ? "/ar/contact" : "/contact"}>
            {t("cta.button")}
          </Button>
        </div>
      </section>
    </>
  );
}
