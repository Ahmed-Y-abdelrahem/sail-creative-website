"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import TransitionLink from "@/components/layout/TransitionLink";
import Arrow from "@/components/ui/Arrow";
import { ArrowLink } from "@/components/ui/Button";
import RevealText from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/Section";
import { useLocale } from "@/components/shared/LocaleProvider";
import { useFinePointer } from "@/hooks/useMediaQuery";
import { pad2 } from "@/lib/utils";

/**
 * Interactive index: six lines of oversized type. On hover a piece of real work follows the pointer,
 * the line leans forward and the rest step back.
 */
export default function ServiceIndex({ services }) {
  const { t, x, href } = useLocale();
  const fine = useFinePointer();
  const [hover, setHover] = useState(null);
  const box = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 180, damping: 22, mass: 0.5 });

  const onMove = (e) => {
    const r = box.current.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };
  const current = hover != null ? services[hover] : null;

  return (
    <section className="surface-light tex-day relative overflow-hidden py-28 sm:py-36" aria-labelledby="services-title">
      <div className="px-[var(--pad)]">
        <SectionLabel index="03">{t("services.title")}</SectionLabel>
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <h2 id="services-title" className="display fs-xl lg:col-span-7">
            <RevealText text={t("services.title")} />
          </h2>
          <p className="max-w-sm self-end text-lg leading-relaxed text-ink/75 lg:col-span-4 lg:col-start-9">{t("services.sub")}</p>
        </div>
      </div>

      <div ref={box} onPointerMove={fine ? onMove : undefined} onPointerLeave={() => setHover(null)} className="relative mt-16">
        <ul>
          {services.map((s, i) => (
            <li key={s.slug} className="border-t border-ink/15 last:border-b">
              <TransitionLink
                href={href(`/services#${s.slug}`)}
                onPointerEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                data-cursor="link"
                className="group flex items-center justify-between gap-6 px-[var(--pad)] py-5 transition-opacity duration-500 sm:py-7"
                style={{ opacity: hover == null || hover === i ? 1 : 0.28 }}
              >
                <span className="flex items-baseline gap-5 transition-transform duration-700 ease-[var(--ease)] group-hover:translate-x-6 rtl:group-hover:-translate-x-6 sm:gap-10">
                  <span className="meta w-7 tabular-nums opacity-60">{pad2(i + 1)}</span>
                  <span className="display text-[clamp(2.5rem,8.4vw,9.5rem)] leading-[0.9]" style={{ color: hover === i ? s.theme.accent : undefined, transition: "color .4s" }}>
                    {x(s.title)}
                  </span>
                </span>
                <span className="hidden max-w-[16rem] text-end text-sm leading-snug text-ink/70 md:block">
                  {s.capabilities.slice(0, 3).map((c) => x(c)).join(" · ")}
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/30 transition-all duration-500 group-hover:border-transparent group-hover:bg-ink group-hover:text-paper">
                  <Arrow className="h-3.5 w-3.5" stroke={14} />
                </span>
              </TransitionLink>
            </li>
          ))}
        </ul>

        {fine && (
          <motion.div aria-hidden className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block" style={{ x: sx, y: sy }}>
            <AnimatePresence mode="wait">
              {current && (
                <motion.div
                  key={current.slug}
                  initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                  animate={{ opacity: 1, scale: 1, rotate: -3 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="-translate-x-1/2 -translate-y-[62%] overflow-hidden shadow-[0_40px_70px_-30px_rgba(0,0,0,0.55)]"
                  style={{ width: "min(24vw, 22rem)", background: current.theme.bg }}
                >
                  {current.media[0] ? (
                    <Image src={current.media[0].src} alt="" width={current.media[0].w} height={current.media[0].h} sizes="24vw" className="h-auto w-full" />
                  ) : (
                    <p className="display p-8 text-5xl" style={{ color: current.theme.accent }}>
                      {x(current.short)}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <div className="mt-12 px-[var(--pad)]">
        <ArrowLink href={href("/services")}>{t("common.seeAllServices")}</ArrowLink>
      </div>
    </section>
  );
}
