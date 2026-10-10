
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

import TransitionLink from "@/components/layout/TransitionLink";
import { SectionLabel } from "@/components/ui/Section";
import { useLocale } from "@/components/shared/LocaleProvider";
import { brandJourney } from "@/data/site";
import { M } from "@/data/media";
import { pad2 } from "@/lib/utils";

const oldLogo = M("taj-azal/old");
const newLogo = M("taj-azal/new");

/* ========================================
   ANIMATION
======================================== */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function ArrowIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

/* ========================================
   BEFORE / AFTER SLIDER
======================================== */

function IdentitySlider() {
  const { t, x } = useLocale();

  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-15% 0px",
  });

  const reduce = useReducedMotion();

  // Position represents the visible width of the old identity.
  const pos = useMotionValue(100);
  const [value, setValue] = useState(100);

  useEffect(() => {
    const unsubscribe = pos.on("change", (v) => {
      setValue(Math.round(v));
    });

    return unsubscribe;
  }, [pos]);

  useEffect(() => {
    if (!inView) return;

    const controls = animate(pos, 50, {
      duration: reduce ? 0 : 1.2,
      ease: [0.16, 1, 0.3, 1],
      delay: reduce ? 0 : 0.2,
    });

    return () => controls.stop();
  }, [inView, pos, reduce]);

  const updatePosition = (event) => {
    if (!ref.current) return;

    const bounds = ref.current.getBoundingClientRect();

    if (!bounds.width) return;

    const percentage =
      ((event.clientX - bounds.left) / bounds.width) * 100;

    pos.set(Math.max(0, Math.min(100, percentage)));
  };

  const showBefore = () => {
    animate(pos, 100, {
      duration: reduce ? 0 : 0.45,
    });
  };

  const showAfter = () => {
    animate(pos, 0, {
      duration: reduce ? 0 : 0.45,
    });
  };

  const showComparison = () => {
    animate(pos, 50, {
      duration: reduce ? 0 : 0.45,
    });
  };

  const clipNew = useTransform(
    pos,
    (p) => `inset(0 0 0 ${p}%)`
  );

  const handle = useTransform(pos, (p) => `${p}%`);

  return (
    <div className="overflow-hidden rounded-2xl border border-[#142832]/10 bg-white shadow-[0_18px_60px_-40px_rgba(0,0,0,0.2)]">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#142832]/10 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#FF6A1F]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#142832]/60">
            {x({
              en: "Identity comparison",
              ar: "مقارنة الهوية",
            })}
          </span>
        </div>

        <span className="text-[11px] text-[#142832]/40">
          Taj Azal / Rebranding
        </span>
      </div>

      {/* Comparison canvas */}
      <div
        ref={ref}
        dir="ltr"
        role="slider"
        tabIndex={0}
        aria-label={`${t("brand.old")} / ${t("brand.new")}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={100 - value}
        aria-valuetext={`${100 - value}% ${t("brand.new")}`}
        data-cursor="drag"
        data-cursor-label={t("cursor.drag")}
        className="relative aspect-[16/10] w-full cursor-ew-resize touch-none select-none overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FF6A1F]"
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          updatePosition(event);
        }}
        onPointerMove={(event) => {
          if (event.buttons) updatePosition(event);
        }}
        onKeyDown={(event) => {
          let step = 0;

          if (event.key === "ArrowLeft") step = -5;
          if (event.key === "ArrowRight") step = 5;
          if (event.key === "Home") {
            event.preventDefault();
            pos.set(0);
            return;
          }
          if (event.key === "End") {
            event.preventDefault();
            pos.set(100);
            return;
          }

          if (step !== 0) {
            event.preventDefault();
            pos.set(
              Math.max(0, Math.min(100, pos.get() + step))
            );
          }
        }}
      >
        {/* Old identity */}
        <div className="absolute inset-0 flex items-center justify-center bg-[#EAEAE7]">
          <Image
            src={oldLogo.src}
            alt={t("brand.old")}
            width={oldLogo.w}
            height={oldLogo.h}
            sizes="(min-width:1024px) 45vw, 90vw"
            draggable={false}
            className="h-[55%] w-[65%] object-contain"
          />
        </div>

        {/* New identity */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-[#17244A]"
          style={{ clipPath: clipNew }}
        >
          <Image
            src={newLogo.src}
            alt={t("brand.new")}
            width={newLogo.w}
            height={newLogo.h}
            sizes="(min-width:1024px) 45vw, 90vw"
            draggable={false}
            className="h-[55%] w-[65%] object-contain"
          />
        </motion.div>

        {/* Labels */}
        <span className="absolute left-4 top-4 rounded-full bg-[#142832]/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white">
          {t("brand.old")}
        </span>

        <span className="absolute right-4 top-4 rounded-full bg-[#FF6A1F] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white">
          {t("brand.new")}
        </span>

        {/* Handle */}
        <motion.div
          className="pointer-events-none absolute inset-y-0 z-10 w-[2px] bg-[#FF6A1F]"
          style={{ left: handle }}
        >
          <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-white bg-[#FF6A1F] shadow-lg">
            <span className="flex items-center gap-1 text-white">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  d="m14 6-6 6 6 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  d="m10 6 6 6-6 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </span>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={showBefore}
            className="rounded-full border border-[#142832]/15 px-4 py-2 text-xs font-medium text-[#142832] transition-colors hover:bg-[#142832] hover:text-white"
          >
            {t("brand.old")}
          </button>

          <button
            type="button"
            onClick={showComparison}
            className="rounded-full border border-[#142832]/15 px-4 py-2 text-xs font-medium text-[#142832] transition-colors hover:bg-[#142832] hover:text-white"
          >
            {x({
              en: "Compare",
              ar: "مقارنة",
            })}
          </button>

          <button
            type="button"
            onClick={showAfter}
            className="rounded-full bg-[#142832] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#FF6A1F]"
          >
            {t("brand.new")}
          </button>
        </div>

        <span className="text-[11px] text-[#142832]/45">
          {x({
            en: "Drag to explore",
            ar: "اسحب للمقارنة",
          })}
        </span>
      </div>
    </div>
  );
}

/* ========================================
   JOURNEY CARD
======================================== */

function JourneyCard({ item, index }) {
  const { x } = useLocale();

  return (
    <motion.li
      variants={fadeUp}
      className="group flex items-start gap-4 rounded-xl border border-[#142832]/10 bg-white px-5 py-5 transition-all duration-300 hover:border-[#FF6A1F]/35 hover:shadow-[0_12px_35px_-25px_rgba(0,0,0,0.2)]"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F5F3EF] text-xs font-semibold text-[#FF6A1F]">
        {pad2(index + 1)}
      </span>

      <div className="min-w-0 flex-1">
        <h4 className="text-base font-semibold leading-snug tracking-[-0.02em] text-[#142832] sm:text-[17px]">
          {x(item)}
        </h4>
      </div>

      <ArrowIcon className="mt-2 h-4 w-4 shrink-0 text-[#142832]/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#FF6A1F] rtl:group-hover:-translate-x-1" />
    </motion.li>
  );
}

/* ========================================
   MAIN BRAND SHIFT SECTION
======================================== */

export default function BrandShift() {
  const { t, x, href } = useLocale();

  return (
    <section
      aria-labelledby="brand-title"
      className="relative overflow-hidden bg-[#F5F3EF] py-20 text-[#142832] sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-[#FF6A1F]/[0.045] blur-3xl" />

      <div className="relative mx-auto max-w-[1440px] px-[var(--pad)]">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <SectionLabel index="05">
            {t("brand.kicker")}
          </SectionLabel>
        </motion.div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="lg:col-span-7"
          >
            <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FF6A1F]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF6A1F]" />
              {x({
                en: "Featured transformation",
                ar: "مشروع تطوير هوية مميز",
              })}
            </span>

            <h2
              id="brand-title"
              className="max-w-[17ch] text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-[1.13] tracking-[-0.04em]"
            >
              {x({
                en: "A new identity. A stronger presence.",
                ar: "هوية جديدة. حضور أقوى.",
              })}
            </h2>
          </motion.div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="max-w-md text-sm leading-[1.9] text-[#142832]/65 sm:text-base lg:col-span-4 lg:col-start-9"
          >
            {t("brand.body")}
          </motion.p>
        </div>

        {/* Case study content */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-10">
          {/* Left */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeUp}
          >
            <IdentitySlider />

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs leading-relaxed text-[#142832]/55">
                {t("brand.caption")}
              </p>

              <TransitionLink
                href={href("/work/taj-azal")}
                className="inline-flex items-center gap-2 border-b border-[#142832]/30 pb-1.5 text-sm font-semibold text-[#142832] transition-colors hover:border-[#FF6A1F] hover:text-[#FF6A1F]"
              >
                {t("common.viewCase")}
                <ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />
              </TransitionLink>
            </div>
          </motion.div>

          {/* Right */}
          <div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className="mb-6"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FF6A1F]">
                {t("brand.journey")}
              </p>

              <h3 className="mt-3 text-[clamp(1.4rem,2vw,1.9rem)] font-semibold tracking-[-0.03em]">
                {x({
                  en: "From insight to identity",
                  ar: "من الفكرة إلى الهوية",
                })}
              </h3>

              <p className="mt-3 max-w-md text-sm leading-[1.8] text-[#142832]/60">
                {x({
                  en: "Explore the creative process behind the identity transformation.",
                  ar: "اكتشف مراحل العمل الإبداعي وراء تطوير الهوية.",
                })}
              </p>
            </motion.div>

            <motion.ol
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              transition={{ staggerChildren: 0.09 }}
              className="grid gap-3"
            >
              {brandJourney.map((item, index) => (
                <JourneyCard
                  key={index}
                  item={item}
                  index={index}
                />
              ))}
            </motion.ol>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-[#142832]/15 pt-7">
          <p className="text-sm text-[#142832]/55">
            {x({
              en: "Every transformation starts with a clear vision.",
              ar: "كل تحول ناجح يبدأ برؤية واضحة.",
            })}
          </p>

          <TransitionLink
            href={href("/contact")}
            className="inline-flex items-center gap-3 rounded-full bg-[#142832] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#FF6A1F]"
          >
            {x({
              en: "Transform Your Brand",
              ar: "طوّر علامتك التجارية",
            })}
            <ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
