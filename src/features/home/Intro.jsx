
"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale } from "@/components/shared/LocaleProvider";
import { SectionLabel } from "@/components/ui/Section";
import { partners } from "@/data/partners";
import { site } from "@/data/site";

function Word({ word, i, n, progress }) {
  const start = (i / n) * 0.78;

  const opacity = useTransform(
    progress,
    [start, start + 0.12],
    [0.14, 1]
  );

  return (
    <>
      {i > 0 && " "}
      <motion.span
        style={{ opacity }}
        className="inline-block"
        aria-hidden="true"
      >
        {word}
      </motion.span>
    </>
  );
}

/**
 * Scroll-scrubbed statement:
 * Each word lights up as you scroll.
 * Real spaces are preserved between words.
 */
export default function Intro({ projectCount }) {
  const { t, num, isRTL } = useLocale();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const introText = t("intro.text");
  const words = introText.trim().split(/\s+/);

  const numeralX = useTransform(
    scrollYProgress,
    [0, 1],
    isRTL ? ["12%", "-14%"] : ["-14%", "12%"]
  );

  const boatY = useTransform(
    scrollYProgress,
    [0, 1],
    ["18%", "-40%"]
  );

  const boatOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0]
  );

  return (
    <section
      ref={ref}
      className="tex-night relative min-h-[155svh]"
      aria-label={t("intro.label")}
    >
      <div className="sticky top-0 flex min-h-svh flex-col justify-between gap-6 overflow-hidden px-[var(--pad)] py-20 lg:py-24">
        <SectionLabel index="01">
          {t("intro.label")}
        </SectionLabel>

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-9vw] start-0 w-max select-none"
          style={{ x: numeralX }}
        >
          <span className="display outline-text block text-[clamp(11rem,38vw,44rem)] leading-none text-white/[0.07]">
            {num(site.since)}
          </span>
        </motion.div>

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute end-[8%] top-[12%] hidden w-[7.5vw] min-w-[4rem] max-w-[7rem] sm:block"
          style={{
            y: boatY,
            opacity: boatOpacity,
          }}
        >
          <Image
            src="/brand/sail-boat.png"
            alt=""
            width={160}
            height={179}
            className="h-auto w-full"
          />
        </motion.div>

        <p
          className="display display-wide relative z-10 max-w-[27ch] section-heading leading-[1.2]"
          style={{
            fontStretch: "88%",
            wordSpacing: "0.28em",
          }}
        >
          <span className="sr-only">
            {introText}
          </span>

          <span aria-hidden="true">
            {words.map((word, i) => (
              <Word
                key={i}
                word={word}
                i={i}
                n={words.length}
                progress={scrollYProgress}
              />
            ))}
          </span>
        </p>

        <dl className="relative z-10 grid max-w-xl grid-cols-3 gap-3 border-t border-white/20 pt-4">
          <div>
            <dt className="meta text-white/80">{isRTL ? "نعمل منذ" : "Established"}</dt>
            <dd className="project-heading text-orange">{num(site.since)}</dd>
          </div>
          <div>
            <dt className="meta text-white/80">{isRTL ? "مشروعًا" : "Portfolio projects"}</dt>
            <dd className="project-heading text-orange">{num(projectCount)}</dd>
          </div>
          <div>
            <dt className="meta text-white/80">{isRTL ? "علامة وثقت بسيل" : "Brands that trust SAIL"}</dt>
            <dd className="project-heading text-orange">{num(partners.length)}+</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
