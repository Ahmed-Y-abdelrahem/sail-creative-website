"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import TransitionLink from "@/components/layout/TransitionLink";
import { ArrowLink } from "@/components/ui/Button";
import { useLocale } from "@/components/shared/LocaleProvider";
import { useDesktop } from "@/hooks/useMediaQuery";
import { pad2, clamp } from "@/lib/utils";

/** The window every project opens through: identity board, phone-format columns or photo strip. */
function WorldMedia({ project, sizes, eager }) {
  const loading = eager ? "eager" : "lazy";
  if (project.layout === "strips") {
    const strips = project.media.find((m) => m.type === "strips").imgs;
    return (
      <div className="absolute inset-0 grid grid-cols-4 gap-[0.6vw]">
        {strips.map((s, i) => (
          <div key={s.src} className="relative overflow-hidden">
            <Image src={s.src} alt="" fill sizes="25vw" loading={loading} className="object-cover object-top" style={{ transform: `translateY(${i % 2 ? "-6%" : "0"})` }} />
          </div>
        ))}
      </div>
    );
  }
  return <Image src={project.cover.src} alt="" fill sizes={sizes} loading={loading} className="object-cover" />;
}

function World({ project, i, n, progress, desktop, active, near }) {
  const { x, href, t } = useLocale();
  const local = useTransform(progress, (p) => p * n - i);

  // Each world wipes up over the previous one, then its window opens toward full-bleed.
  const reveal = useTransform(local, (l) => (i === 0 ? 0 : clamp(1 - (l + 0.3) / 0.3, 0, 1) * 100));
  const clip = useTransform(reveal, (r) => `inset(${r}% 0 0 0)`);

  const open = useTransform(local, (l) => clamp((l - 0.05) / 0.7, 0, 1));
  const windowClip = useTransform(open, (o) => {
    if (!desktop) return "inset(0% 0% 0% 0%)";
    const top = 22 * (1 - o);
    const bottom = 20 * (1 - o);
    const start = 44 * (1 - o);
    const end = 5 * (1 - o);
    return `inset(${top}% ${end}% ${bottom}% ${start}%)`;
  });
  const imgScale = useTransform(open, [0, 1], [1.25, 1]);
  const nameY = useTransform(local, [-0.3, 0.5, 1], ["14%", "0%", "-6%"]);
  const scrimOpacity = useTransform(open, [0, 1], [0, 0.55]);

  return (
    <motion.div
      className="absolute inset-0"
      style={{ clipPath: clip, background: project.brand.bg, color: project.brand.fg }}
      aria-hidden={!active}
    >
      <div className="absolute inset-0 grid grid-rows-[auto_1fr_auto] max-lg:grid-rows-[auto_auto_1fr]">
        <div className="relative z-20 flex items-start justify-between px-[var(--pad)] pt-24 sm:pt-28">
          <p dir="ltr" className="meta tabular-nums">
            {pad2(i + 1)} / {pad2(n)}
          </p>
          <p className="meta max-w-[16rem] text-end opacity-80">{x(project.work)}</p>
        </div>

        {/* media window */}
        <div className="absolute inset-0 z-10 max-lg:relative max-lg:mx-[var(--pad)] max-lg:mt-6 max-lg:h-[36svh]">
          <TransitionLink
            href={href(`/work/${project.slug}`)}
            tabIndex={active ? 0 : -1}
            data-cursor="view"
            data-cursor-label={t("cursor.view")}
            aria-label={x(project.name)}
            className="absolute inset-0 block"
          >
            <motion.div className="absolute inset-0 overflow-hidden" style={{ clipPath: windowClip }}>
              <motion.div className="absolute inset-0" style={{ scale: desktop ? imgScale : 1 }}>
                <WorldMedia project={project} sizes="100vw" eager={near} />
              </motion.div>
              <motion.div className="absolute inset-0" style={{ opacity: desktop ? scrimOpacity : 0, background: `linear-gradient(90deg, ${project.brand.bg}, transparent 70%)` }} />
            </motion.div>
          </TransitionLink>
        </div>

        {/* type sits in front of the media */}
        <div className="pointer-events-none relative z-20 flex items-end px-[var(--pad)] pb-20 max-lg:items-start max-lg:pb-6 max-lg:pt-6 lg:row-start-3">
          <motion.div style={{ y: nameY }} className="w-full">
            <h3 className="display leading-[0.82] text-[clamp(4rem,13.2vw,17rem)]">{x(project.name)}</h3>
            <div className="pointer-events-auto mt-6 flex flex-wrap items-center gap-x-10 gap-y-4">
              <ul className="meta flex flex-wrap gap-x-5 gap-y-1 opacity-80">
                {project.scope.slice(0, 3).map((s) => (
                  <li key={s.en}>{x(s)}</li>
                ))}
              </ul>
              <span style={{ color: project.brand.accent }}>
                <ArrowLink href={href(`/work/${project.slug}`)} className="meta">
                  {t("common.viewCase")}
                </ArrowLink>
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SelectedWork({ projects }) {
  const { t } = useLocale();
  const desktop = useDesktop();
  const n = projects.length;
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => setActive(clamp(Math.floor(p * n + 0.001), 0, n - 1)));

  return (
    <section ref={sectionRef} aria-label={t("work.title")} className="relative" style={{ height: `${n * 100}svh` }}>
      <div className="sticky top-0 h-svh overflow-hidden bg-night">
        {projects.map((p, i) => (
          <World key={p.slug} project={p} i={i} n={n} progress={scrollYProgress} desktop={desktop} active={active === i} near={Math.abs(active - i) <= 1} />
        ))}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex items-center justify-between gap-6 px-[var(--pad)] pb-5 mix-blend-difference text-white">
          <p className="meta">02 — {t("work.title")}</p>
          <div className="relative h-px w-[min(40vw,18rem)] bg-white/30" aria-hidden>
            <motion.span className="absolute inset-y-0 start-0 w-full origin-left bg-white rtl:origin-right" style={{ scaleX: scrollYProgress }} />
          </div>
          <p className="meta hidden sm:block">{t("work.hint")}</p>
        </div>
      </div>
    </section>
  );
}
