"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale } from "@/components/shared/LocaleProvider";
import { SectionLabel } from "@/components/ui/Section";
import { site } from "@/data/site";

function Word({ word, i, n, progress }) {
  const start = (i / n) * 0.78;
  const opacity = useTransform(progress, [start, start + 0.12], [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block pe-[0.28em]">
      {word}
    </motion.span>
  );
}

/** Scroll-scrubbed statement: each word lights up as you move through it. */
export default function Intro() {
  const { t, num, isRTL } = useLocale();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const words = t("intro.text").split(" ");
  const numeralX = useTransform(scrollYProgress, [0, 1], isRTL ? ["12%", "-14%"] : ["-14%", "12%"]);
  const boatY = useTransform(scrollYProgress, [0, 1], ["18%", "-40%"]);
  const boatOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="tex-night relative h-[260svh] max-md:h-[220svh]" aria-label={t("intro.label")}>
      <div className="sticky top-0 flex h-svh flex-col justify-between overflow-hidden px-[var(--pad)] py-24 sm:py-28">
        <SectionLabel index="01">{t("intro.label")}</SectionLabel>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute bottom-[-9vw] start-0 w-max select-none"
          style={{ x: numeralX }}
        >
          <span className="display outline-text block text-[clamp(11rem,38vw,44rem)] leading-none text-white/15">{num(site.since)}</span>
        </motion.div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute end-[8%] top-[12%] hidden w-[7.5vw] min-w-[4rem] max-w-[7rem] sm:block"
          style={{ y: boatY, opacity: boatOpacity }}
        >
          <Image src="/brand/sail-boat.png" alt="" width={160} height={179} className="h-auto w-full" />
        </motion.div>

        <p className="display display-wide relative z-10 max-w-[27ch] text-[clamp(1.75rem,3.9vw,4.6rem)] leading-[1.06]" style={{ fontStretch: "88%" }}>
          {words.map((w, i) => (
            <Word key={i} word={w} i={i} n={words.length} progress={scrollYProgress} />
          ))}
        </p>

        <p className="meta relative z-10 flex items-center gap-3 text-orange">
          <span aria-hidden className="h-px w-10 bg-current" />
          {t("intro.since")} {num(site.since)}
        </p>
      </div>
    </section>
  );
}
