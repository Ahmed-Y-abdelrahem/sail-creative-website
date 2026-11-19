
"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import TransitionLink from "@/components/layout/TransitionLink";
import { ArrowLink } from "@/components/ui/Button";
import RevealText from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/Section";
import { useLocale } from "@/components/shared/LocaleProvider";
import { useDesktop } from "@/hooks/useMediaQuery";
import { projects } from "@/data/projects";
import { campaignImage } from "@/data/media";

// Phone-format posts from real campaigns.
const projectNames = new Map(projects.map(({ slug, name }) => [slug, name]));
const col = campaignImage;

const columns = [
  {
    speed: -90,
    start: "4%",
    tiles: [
      ["namar-door", col("namar-door", 1)],
      ["gerflor", col("gerflor", 2)],
      ["carte-restaurant", col("carte-restaurant", 3)],
    ],
  },
  {
    speed: -190,
    start: "-6%",
    tiles: [
      ["gulf-cattle", col("gulf-cattle", 3)],
      ["enigma", col("enigma", 1)],
      ["fayya", col("fayya", 2)],
    ],
  },
  {
    speed: -60,
    start: "12%",
    tiles: [
      ["enigma", col("enigma", 2)],
      ["baab-app", col("baab-app", 3)],
      ["bella-center", col("bella-center", 1)],
    ],
  },
  {
    speed: -230,
    start: "-2%",
    tiles: [
      ["tricycle", col("tricycle", 2)],
      ["namar-door", col("namar-door", 3)],
      ["gerflor", col("gerflor", 4)],
    ],
  },
  {
    speed: -120,
    start: "9%",
    tiles: [
      ["baab-app", col("baab-app", 2)],
      ["carte-restaurant", col("carte-restaurant", 1)],
      ["tricycle", col("tricycle", 4)],
    ],
  },
  {
    speed: -170,
    start: "0%",
    tiles: [
      ["gerflor", col("gerflor", 3)],
      ["gulf-cattle", col("gulf-cattle", 1)],
      ["enigma", col("enigma", 4)],
    ],
  },
];

function Column({ c, progress, desktop, index }) {
  const { href, t, x, isRTL } = useLocale();

  const y = useTransform(
    progress,
    [0, 1],
    [0, desktop ? c.speed * 0.25 : c.speed * 0.12]
  );

  const visibility =
    index < 3
      ? "flex"
      : [
          "hidden sm:flex",
          "hidden md:flex",
          "hidden lg:flex",
        ][index - 3];

  return (
    <motion.div
      style={{ y, marginTop: c.start }}
      className={`min-w-0 flex-1 flex-col gap-2.5 ${visibility}`}
    >
      {c.tiles.map(([slug, img]) => (
        <TransitionLink
          key={img.src}
          href={href(`/work/${slug}`)}
          data-cursor="view"
          data-cursor-label={t("cursor.view")}
          className="block overflow-hidden shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]"
        >
          <Image
            src={img.src}
            alt={isRTL
              ? `تصاميم لمنصات التواصل لمشروع ${x(projectNames.get(slug))}`
              : `Social media designs for ${x(projectNames.get(slug))}`}
            width={img.w}
            height={img.h}
            sizes="(min-width:1024px) 17vw, 34vw"
            className="aspect-square w-full rounded-sm object-contain transition-transform duration-[1400ms] ease-[var(--ease)] hover:scale-[1.04]"
          />
        </TransitionLink>
      ))}
    </motion.div>
  );
}

export default function MarketingWall() {
  const { t, href, isRTL } = useLocale();

  const ref = useRef(null);
  const desktop = useDesktop();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={ref}
      className="surface-night relative grid gap-8 overflow-hidden py-16 lg:grid-cols-[2fr_3fr] lg:items-center lg:py-24"
      aria-labelledby="marketing-title"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,106,31,0.16),transparent_60%)]"
      />

      <div className="order-2 flex h-[clamp(16rem,45vw,34rem)] justify-center gap-2.5 overflow-auto px-[var(--pad)] lg:ps-0">
        {columns.map((c, i) => (
          <Column
            key={i}
            c={c}
            index={i}
            progress={scrollYProgress}
            desktop={desktop}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col gap-6 px-[var(--pad)] text-white">
        <SectionLabel index="04">
          {t("marketing.kicker")}
        </SectionLabel>

        <h2
          id="marketing-title"
          className="display section-heading leading-tight"
        >
          <RevealText
            text={t("marketing.title")}
            stagger={0.09}
          />
        </h2>

        <div className="pointer-events-auto flex flex-wrap items-end justify-between gap-6">
          <p className="max-w-sm text-lg leading-snug">
            {t("marketing.sub")}
          </p>

          <span className="inline-flex min-h-[44px] items-center">
            <ArrowLink
              href={href("/services/marketing")}
              className="inline-flex min-h-[44px] items-center"
            >
              {isRTL ? "خدمات التسويق" : "Marketing services"}
            </ArrowLink>
          </span>
        </div>
      </div>
    </section>
  );
}
