"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import RevealText from "@/components/ui/RevealText";
import { ArrowLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/Section";
import { useLocale } from "@/components/shared/LocaleProvider";
import { brandJourney } from "@/data/site";
import { M } from "@/data/media";
import { pad2 } from "@/lib/utils";

const oldLogo = M("taj-azal/old");
const newLogo = M("taj-azal/new");

/** Before / after identity reveal. Drag, tap, or use the arrow keys. */
function IdentitySlider() {
  const { t } = useLocale();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduce = useReducedMotion();
  const pos = useMotionValue(100); // % of the width still showing the OLD logo
  const [value, setValue] = useState(100);

  useEffect(() => {
    const unsub = pos.on("change", (v) => setValue(Math.round(v)));
    return unsub;
  }, [pos]);
  useEffect(() => {
    if (inView) animate(pos, 50, { duration: reduce ? 0 : 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 });
  }, [inView, pos, reduce]);

  const setFromEvent = (e) => {
    const r = ref.current.getBoundingClientRect();
    const p = ((e.clientX - r.left) / r.width) * 100;
    pos.set(Math.min(100, Math.max(0, p)));
  };
  const clipNew = useTransform(pos, (p) => `inset(0 0 0 ${p}%)`);
  const handle = useTransform(pos, (p) => `${p}%`);

  return (
    <div
      ref={ref}
      dir="ltr"
      role="slider"
      tabIndex={0}
      aria-label={`${t("brand.old")} / ${t("brand.new")}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={100 - value}
      data-cursor="drag"
      data-cursor-label={t("cursor.drag")}
      className="relative aspect-[16/10] w-full touch-none select-none overflow-hidden"
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        setFromEvent(e);
      }}
      onPointerMove={(e) => e.buttons && setFromEvent(e)}
      onKeyDown={(e) => {
        const step = e.key === "ArrowLeft" ? -6 : e.key === "ArrowRight" ? 6 : 0;
        if (step) pos.set(Math.min(100, Math.max(0, pos.get() + step)));
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center bg-[#eeeeec]">
        <Image src={oldLogo.src} alt={t("brand.old")} width={oldLogo.w} height={oldLogo.h} sizes="(min-width:1024px) 40vw, 90vw" className="h-[70%] w-auto object-contain" />
      </div>
      <motion.div className="absolute inset-0 flex items-center justify-center bg-[#17244a]" style={{ clipPath: clipNew }}>
        <Image src={newLogo.src} alt={t("brand.new")} width={newLogo.w} height={newLogo.h} sizes="(min-width:1024px) 40vw, 90vw" className="h-[70%] w-auto object-contain" />
      </motion.div>
      <span className="meta absolute left-4 top-4 rounded-full bg-ink/85 px-3 py-1 text-paper">{t("brand.old")}</span>
      <span className="meta absolute right-4 top-4 rounded-full bg-orange px-3 py-1 text-night">{t("brand.new")}</span>
      <motion.div className="absolute inset-y-0 w-px bg-orange" style={{ left: handle }}>
        <span className="absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange bg-night">
          <span className="absolute inset-0 flex items-center justify-center gap-1 text-orange" aria-hidden>
            <i className="block h-2 w-2 -rotate-45 border-b border-l border-current" />
            <i className="block h-2 w-2 rotate-45 border-r border-t border-current" />
          </span>
        </span>
      </motion.div>
    </div>
  );
}

export default function BrandShift() {
  const { t, x, href } = useLocale();
  const lineRef = useRef(null);
  const lineIn = useInView(lineRef, { once: true, margin: "-25% 0px" });

  return (
    <section className="surface-paper relative overflow-hidden py-28 sm:py-40" aria-labelledby="brand-title">
      <div className="px-[var(--pad)]">
        <SectionLabel index="05">{t("brand.kicker")}</SectionLabel>

        <div className="mt-12 grid items-end gap-14 lg:grid-cols-12">
          <h2 id="brand-title" className="display text-[clamp(3.4rem,11.5vw,14rem)] leading-[0.84] lg:col-span-8">
            <RevealText lines={t("brand.title").split(" ")} stagger={0.12} />
          </h2>
          <p className="max-w-xs text-lg leading-relaxed text-ink/75 lg:col-span-3 lg:col-start-10 lg:pb-6">{t("brand.body")}</p>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6 lg:col-start-1">
            <IdentitySlider />
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <p className="meta opacity-70">{t("brand.caption")}</p>
              <ArrowLink href={href("/work/taj-azal")}>{t("common.viewCase")}</ArrowLink>
            </div>
          </div>

          <div ref={lineRef} className="lg:col-span-5 lg:col-start-8">
            <p className="meta mb-8 opacity-60">{t("brand.journey")}</p>
            <ol className="relative">
              <span aria-hidden className="absolute bottom-3 start-[0.4rem] top-3 w-px bg-ink/15" />
              <motion.span
                aria-hidden
                className="absolute start-[0.4rem] top-3 w-px origin-top bg-orange"
                style={{ height: "calc(100% - 1.5rem)" }}
                initial={{ scaleY: 0 }}
                animate={lineIn ? { scaleY: 1 } : {}}
                transition={{ duration: 2.2, ease: [0.65, 0, 0.35, 1] }}
              />
              {brandJourney.map((s, i) => (
                <motion.li
                  key={s.en}
                  className="relative flex items-baseline gap-6 py-3 ps-8"
                  initial={{ opacity: 0.2 }}
                  animate={lineIn ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.25 + i * 0.28 }}
                >
                  <span aria-hidden className="absolute start-0 top-[1.15rem] h-[0.9rem] w-[0.9rem] rounded-full border border-ink bg-paper" />
                  <span className="meta w-6 tabular-nums opacity-50">{pad2(i + 1)}</span>
                  <span className="display display-wide text-2xl sm:text-3xl">{x(s)}</span>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
