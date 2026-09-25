"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import TransitionLink from "@/components/layout/TransitionLink";
import { ArrowLink } from "@/components/ui/Button";
import ImageReveal from "@/components/ui/ImageReveal";
import RevealText from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/Section";
import { useLocale } from "@/components/shared/LocaleProvider";
import { eventJourney } from "@/data/site";
import { M } from "@/data/media";
import { pad2 } from "@/lib/utils";

// One real event image per stage of the journey.
const stageImages = [
  { img: M("luini-bakery/event"), slug: "luini-bakery", alt: "Luini Bakery opening" },
  { img: M("radicon/event-1"), slug: "radicon", alt: "Radicon Switch On event" },
  { img: M("fayya/event-1"), slug: "fayya", alt: "Fayya event styling" },
  { img: M("gulf-consult/board"), slug: "gulf-consult", alt: "Gulf Consult stand" },
  { img: M("radicon/event-2"), slug: "radicon", alt: "Radicon installation" },
  { img: M("fayya/event-3"), slug: "fayya", alt: "Fayya green event" },
  { img: M("ucicoat/board"), slug: "ucicoat", alt: "UCICOAT stand" },
];

function Stage({ stage, i, imageData, horizontal }) {
  const { x, href, t } = useLocale();
  return (
    <article className={horizontal ? "flex w-[64vw] max-w-[54rem] shrink-0 flex-col justify-center" : "grid gap-6"}>
      <p className="meta flex items-center gap-3 text-teal-deep">
        <span className="tabular-nums">{pad2(i + 1)}</span>
        <span aria-hidden className="h-px w-8 bg-current" />
      </p>
      <h3 className={`display mt-3 ${horizontal ? "text-[clamp(4rem,9.5vw,11rem)]" : "text-[clamp(3.2rem,15vw,6rem)]"} leading-[0.86]`}>{x(stage)}</h3>
      <ul className={`mt-6 grid gap-2 text-[0.9375rem] leading-snug text-ink/75 ${horizontal ? "max-w-md" : ""}`}>
        {stage.items.map((it) => (
          <li key={it.en} className="flex gap-3 border-t border-ink/15 pt-2">
            <span aria-hidden className="mt-[0.5em] h-1 w-1 shrink-0 rounded-full bg-orange" />
            {x(it)}
          </li>
        ))}
      </ul>
      {!horizontal && (
        <TransitionLink href={href(`/work/${imageData.slug}`)} data-cursor="view" data-cursor-label={t("cursor.view")} className="block">
          <ImageReveal img={imageData.img} alt={imageData.alt} sizes="100vw" />
        </TransitionLink>
      )}
    </article>
  );
}

export default function EventJourney({ index = "07", showLink = true, showHeading = true }) {
  const { t, x, href, isRTL } = useLocale();
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const range = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const sign = isRTL ? 1 : -1;
  const xMove = useTransform([scrollYProgress, range], ([p, r]) => p * r * sign);
  const fill = useTransform(scrollYProgress, [0.02, 0.98], [0, 1]);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) range.set(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [range]);

  const n = eventJourney.length;

  return (
    <section className="surface-light tex-day relative" aria-labelledby="events-title">
      {/* Desktop: scroll drives a horizontal journey. Native scroll stays untouched. */}
      <div ref={sectionRef} className="relative hidden lg:block" style={{ height: `${n * 62 + 100}svh` }}>
        <div className="sticky top-0 flex h-svh flex-col justify-between overflow-hidden pb-10 pt-24">
          {showHeading && (
            <div className="flex items-end justify-between gap-10 px-[var(--pad)]">
              <div>
                <SectionLabel index={index}>{t("events.kicker")}</SectionLabel>
                <h2 id="events-title" className="display mt-5 text-[clamp(2.6rem,6.4vw,7.5rem)] leading-[0.88]">
                  <RevealText text={t("events.title")} />
                </h2>
              </div>
              <div className="max-w-sm pb-2">
                <p className="text-[1.0625rem] leading-relaxed text-ink/75">{t("events.sub")}</p>
                {showLink && (
                  <div className="mt-5">
                    <ArrowLink href={href("/events")}>{t("common.seeEvents")}</ArrowLink>
                  </div>
                )}
              </div>
            </div>
          )}

          <motion.div ref={trackRef} style={{ x: xMove }} className="flex w-max items-center gap-[5vw] px-[var(--pad)]" data-cursor="drag" data-cursor-label={t("cursor.drag")}>
            {eventJourney.map((s, i) => (
              <div key={s.id} className="flex items-center gap-[5vw]">
                <Stage stage={s} i={i} horizontal />
                <TransitionLink
                  href={href(`/work/${stageImages[i].slug}`)}
                  data-cursor="view"
                  data-cursor-label={t("cursor.view")}
                  tabIndex={-1}
                  className="block w-[40vw] shrink-0 overflow-hidden shadow-[0_40px_70px_-40px_rgba(16,27,40,0.6)]"
                >
                  <Image src={stageImages[i].img.src} alt={stageImages[i].alt} width={stageImages[i].img.w} height={stageImages[i].img.h} sizes="40vw" className="h-auto w-full" />
                </TransitionLink>
              </div>
            ))}
          </motion.div>

          {/* journey line */}
          <div className="px-[calc(var(--pad)+2rem)]">
            <div className="relative h-px bg-ink/20">
              <motion.span className="absolute inset-0 origin-left bg-orange rtl:origin-right" style={{ scaleX: fill }} />
              <div className="absolute inset-x-0 -top-1 flex justify-between">
                {eventJourney.map((s) => (
                  <span key={s.id} className="relative">
                    <span className="block h-2 w-2 rounded-full bg-ink" />
                    <span className="meta absolute top-4 -translate-x-[35%] whitespace-nowrap opacity-70 rtl:translate-x-[35%]">{x(s)}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="h-6" />
          </div>
        </div>
      </div>

      {/* Tablet & mobile: the same journey, vertical. */}
      <div className="px-[var(--pad)] py-24 lg:hidden">
        {showHeading && (
          <>
            <SectionLabel index={index}>{t("events.kicker")}</SectionLabel>
            <h2 className="display mt-6 text-[clamp(2.8rem,13vw,6rem)] leading-[0.88]">{t("events.title")}</h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/75">{t("events.sub")}</p>
            {showLink && (
              <div className="mt-6">
                <ArrowLink href={href("/events")}>{t("common.seeEvents")}</ArrowLink>
              </div>
            )}
          </>
        )}
        <div className="mt-14 grid gap-20">
          {eventJourney.map((s, i) => (
            <Stage key={s.id} stage={s} i={i} imageData={stageImages[i]} horizontal={false} />
          ))}
        </div>
      </div>
    </section>
  );
}
