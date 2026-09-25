"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import TransitionLink from "@/components/layout/TransitionLink";
import { ArrowLink } from "@/components/ui/Button";
import RevealText from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/Section";
import { useLocale } from "@/components/shared/LocaleProvider";
import { useDesktop } from "@/hooks/useMediaQuery";
import { M } from "@/data/media";

// Phone-format posts from real campaigns, each column links to its project.
const col = (base, n) => M(`${base}/col${n}`);
const columns = [
  { speed: -90, start: "4%", tiles: [["namar-door", col("namar-door", 1)], ["gerflor", col("gerflor", 2)], ["carte-restaurant", col("carte-restaurant", 3)]] },
  { speed: -190, start: "-6%", tiles: [["gulf-cattle", col("gulf-cattle", 3)], ["enigma", col("enigma", 1)], ["fayya", col("fayya", 2)]] },
  { speed: -60, start: "12%", tiles: [["enigma", col("enigma", 2)], ["baab-app", col("baab-app", 3)], ["bella-center", col("bella-center", 1)]] },
  { speed: -230, start: "-2%", tiles: [["tricycle", col("tricycle", 2)], ["namar-door", col("namar-door", 3)], ["gerflor", col("gerflor", 4)]] },
  { speed: -120, start: "9%", tiles: [["baab-app", col("baab-app", 2)], ["carte-restaurant", col("carte-restaurant", 1)], ["tricycle", col("tricycle", 4)]] },
  { speed: -170, start: "0%", tiles: [["gerflor", col("gerflor", 3)], ["gulf-cattle", col("gulf-cattle", 1)], ["enigma", col("enigma", 4)]] },
];

function Column({ c, progress, desktop, index }) {
  const { href, t } = useLocale();
  const y = useTransform(progress, [0, 1], [0, desktop ? c.speed : c.speed * 0.35]);
  return (
    <motion.div
      style={{ y, marginTop: c.start }}
      className={`w-[29vw] shrink-0 flex-col gap-[1.4vw] sm:w-[22vw] md:w-[19vw] lg:w-[15.5vw] ${index < 3 ? "flex" : ["hidden sm:flex", "hidden md:flex", "hidden lg:flex"][index - 3]}`}
    >
      {c.tiles.map(([slug, img]) => (
        <TransitionLink
          key={img.src}
          href={href(`/work/${slug}`)}
          data-cursor="view"
          data-cursor-label={t("cursor.view")}
          className="block overflow-hidden shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]"
          tabIndex={-1}
          aria-hidden
        >
          <Image src={img.src} alt="" width={img.w} height={img.h} sizes="(min-width:1024px) 17vw, 34vw" className="h-auto w-full transition-transform duration-[1400ms] ease-[var(--ease)] hover:scale-[1.04]" />
        </TransitionLink>
      ))}
    </motion.div>
  );
}

export default function MarketingWall() {
  const { t, href } = useLocale();
  const ref = useRef(null);
  const desktop = useDesktop();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section ref={ref} className="surface-night relative h-[185svh] overflow-hidden max-md:h-[150svh]" aria-labelledby="marketing-title">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,106,31,0.16),transparent_60%)]" />

      <div className="absolute inset-x-0 top-0 flex justify-between gap-[1.4vw] px-[3vw]">
        {columns.map((c, i) => (
          <Column key={i} c={c} index={i} progress={scrollYProgress} desktop={desktop} />
        ))}
      </div>

      {/* Type in front of the media, inverted by the picture behind it. */}
      <div className="pointer-events-none sticky top-0 z-10 flex h-svh flex-col justify-between px-[var(--pad)] py-24 text-white mix-blend-difference sm:py-28">
        <SectionLabel index="04">{t("marketing.kicker")}</SectionLabel>
        <h2 id="marketing-title" className="display text-[clamp(3.2rem,12vw,15rem)] leading-[0.84]">
          <RevealText text={t("marketing.title")} stagger={0.09} />
        </h2>
        <div className="pointer-events-auto flex flex-wrap items-end justify-between gap-6">
          <p className="max-w-sm text-lg leading-snug">{t("marketing.sub")}</p>
          <ArrowLink href={href("/work")}>{t("common.seeAllWork")}</ArrowLink>
        </div>
      </div>
    </section>
  );
}
