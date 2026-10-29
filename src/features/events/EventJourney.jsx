
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

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
// Image descriptions are localized for accessibility.
const stageImages = [
  {
    img: M("luini-bakery/event"),
    slug: "luini-bakery",
    alt: {
      en: "Luini Bakery opening event",
      ar: "فعالية افتتاح مخبز لويني",
    },
  },
  {
    img: M("radicon/event-1"),
    slug: "radicon",
    alt: {
      en: "Radicon Switch On event",
      ar: "فعالية سويتش أون لشركة راديكون",
    },
  },
  {
    img: M("fayya/event-1"),
    slug: "fayya",
    alt: {
      en: "Fayya event styling",
      ar: "تنسيق فعالية فايا",
    },
  },
  {
    img: M("gulf-consult/board"),
    slug: "gulf-consult",
    alt: {
      en: "Gulf Consult exhibition stand",
      ar: "جناح معرض شركة الخليج للاستشارات",
    },
  },
  {
    img: M("radicon/event-2"),
    slug: "radicon",
    alt: {
      en: "Radicon Saudi flag installation",
      ar: "تجهيز فعالية العلم السعودي لشركة راديكون",
    },
  },
  {
    img: M("fayya/event-3"),
    slug: "fayya",
    alt: {
      en: "Fayya green-themed event",
      ar: "فعالية فايا بتنسيق أخضر",
    },
  },
  {
    img: M("ucicoat/board"),
    slug: "ucicoat",
    alt: {
      en: "UCICOAT exhibition stand",
      ar: "جناح معرض شركة يوسيكوت",
    },
  },
];

function Stage({
  stage,
  i,
  imageData,
  horizontal,
}) {
  const { x, href, t, isRTL } = useLocale();

  const stageTitleClass = horizontal
    ? isRTL
      ? "text-[clamp(2.6rem,4.5vw,5.2rem)] leading-[1.4]"
      : "text-[clamp(3rem,6vw,7rem)] leading-[0.98]"
    : isRTL
      ? "text-[clamp(2.2rem,7vw,4rem)] leading-[1.45]"
      : "text-[clamp(2.6rem,11vw,5rem)] leading-[1.05]";

  return (
    <article
      className={
        horizontal
          ? "flex w-[54vw] max-w-[46rem] shrink-0 flex-col justify-center"
          : "grid min-w-0 gap-6"
      }
    >
      <p className="meta flex items-center gap-3 text-teal-deep">
        <span className="tabular-nums">
          {pad2(i + 1)}
        </span>

        <span
          aria-hidden="true"
          className="h-px w-8 bg-current"
        />
      </p>

      <h3
        className={`
          display mt-3 max-w-full
          break-words
          ${stageTitleClass}
        `}
      >
        {x(stage)}
      </h3>

      <ul
        className={`
          mt-5 grid gap-2
          text-[0.9375rem] text-ink/75
          ${isRTL ? "leading-[1.8]" : "leading-snug"}
          ${horizontal ? "max-w-md" : ""}
        `}
      >
        {stage.items.map((it) => (
          <li
            key={it.en}
            className="flex items-start gap-3 border-t border-ink/15 pt-2"
          >
            <span
              aria-hidden="true"
              className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-orange"
            />

            <span className="min-w-0">
              {x(it)}
            </span>
          </li>
        ))}
      </ul>

      {!horizontal && imageData && (
        <TransitionLink
          href={href(`/work/${imageData.slug}`)}
          data-cursor="view"
          data-cursor-label={t("cursor.view")}
          className="block"
        >
          <ImageReveal
            img={imageData.img}
            alt={x(imageData.alt)}
            sizes="100vw"
          />
        </TransitionLink>
      )}
    </article>
  );
}

export default function EventJourney({
  index = "07",
  showLink = true,
  showHeading = true,
}) {
  const { t, x, href, isRTL } = useLocale();

  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const reduceMotion = useReducedMotion();
  const range = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const sign = isRTL ? 1 : -1;

  const xMove = useTransform(
    [scrollYProgress, range],
    ([p, r]) => reduceMotion ? 0 : p * r * sign
  );

  const fill = useTransform(
    scrollYProgress,
    [0.02, 0.98],
    [0, 1]
  );

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        range.set(
          Math.max(
            0,
            trackRef.current.scrollWidth -
              window.innerWidth
          )
        );
      }
    };

    measure();

    const ro = new ResizeObserver(measure);

    if (trackRef.current) {
      ro.observe(trackRef.current);
    }

    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [range]);

  const n = eventJourney.length;

  return (
    <section
      className="surface-light tex-day relative"
      aria-label={
        isRTL
          ? "مراحل إدارة الفعاليات"
          : "Event Management Journey"
      }
    >
      {/* DESKTOP HORIZONTAL JOURNEY */}
      <div
        ref={sectionRef}
        className="relative hidden lg:block"
        style={{
          height: `${n * 62 + 100}svh`,
        }}
      >
        <div
          className="
            sticky top-0
            flex h-svh flex-col
            justify-between
            overflow-hidden
            pb-10 pt-24
          "
        >
          {showHeading && (
            <div className="flex items-end justify-between gap-10 px-[var(--pad)]">
              <div className="min-w-0 flex-1">
                <SectionLabel index={index}>
                  {t("events.kicker")}
                </SectionLabel>

                <h2
                  id="events-title"
                  className={`
                    display mt-5 max-w-full
                    ${
                      isRTL
                        ? "text-[clamp(2.3rem,4.3vw,4.8rem)] leading-[1.4]"
                        : "text-[clamp(2.5rem,5.2vw,6rem)] leading-[1.02]"
                    }
                  `}
                >
                  {isRTL ? (
                    t("events.title")
                  ) : (
                    <RevealText
                      text={t("events.title")}
                    />
                  )}
                </h2>
              </div>

              <div className="max-w-sm shrink-0 pb-2">
                <p
                  className={`
                    text-[1.0625rem] text-ink/75
                    ${
                      isRTL
                        ? "leading-[1.8]"
                        : "leading-relaxed"
                    }
                  `}
                >
                  {t("events.sub")}
                </p>

                {showLink && (
                  <div className="mt-5">
                    <ArrowLink href={href("/events")}>
                      {t("common.seeEvents")}
                    </ArrowLink>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* HORIZONTAL TRACK */}
          <motion.div
            ref={trackRef}
            style={{ x: xMove }}
            className="flex w-max items-center gap-[5vw] px-[var(--pad)]"
            data-cursor="drag"
            data-cursor-label={t("cursor.drag")}
          >
            {eventJourney.map((s, i) => (
              <div
                key={s.id}
                className="flex items-center gap-[5vw]"
              >
                <Stage
                  stage={s}
                  i={i}
                  horizontal
                />

                <TransitionLink
                  href={href(
                    `/work/${stageImages[i].slug}`
                  )}
                  data-cursor="view"
                  data-cursor-label={t("cursor.view")}
                  tabIndex={-1}
                  className="
                    block w-[40vw]
                    shrink-0 overflow-hidden
                    shadow-[0_40px_70px_-40px_rgba(16,27,40,0.6)]
                  "
                >
                  <Image
                    src={stageImages[i].img.src}
                    alt={x(stageImages[i].alt)}
                    width={stageImages[i].img.w}
                    height={stageImages[i].img.h}
                    sizes="40vw"
                    className="h-auto w-full"
                  />
                </TransitionLink>
              </div>
            ))}
          </motion.div>

          {/* JOURNEY PROGRESS LINE */}
          <div className="px-[calc(var(--pad)+2rem)]">
            <div className="relative h-px bg-ink/20">
              <motion.span
                className="absolute inset-0 origin-left bg-orange rtl:origin-right"
                style={{
                  scaleX: fill,
                }}
              />

              <div className="absolute inset-x-0 -top-1 flex justify-between">
                {eventJourney.map((s) => (
                  <span
                    key={s.id}
                    className="relative"
                  >
                    <span className="block h-2 w-2 rounded-full bg-ink" />

                    <span
                      className="
                        meta absolute top-4
                        -translate-x-[35%]
                        whitespace-nowrap
                        opacity-70
                        rtl:translate-x-[35%]
                      "
                    >
                      {x(s)}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            <div className="h-6" />
          </div>
        </div>
      </div>

      {/* TABLET AND MOBILE */}
      <div className="px-[var(--pad)] py-20 lg:hidden">
        {showHeading && (
          <>
            <SectionLabel index={index}>
              {t("events.kicker")}
            </SectionLabel>

            <h2
              className={`
                display mt-6 max-w-full
                ${
                  isRTL
                    ? "text-[clamp(2.2rem,7vw,4.2rem)] leading-[1.4]"
                    : "text-[clamp(2.5rem,10vw,5rem)] leading-[1.05]"
                }
              `}
            >
              {t("events.title")}
            </h2>

            <p
              className={`
                mt-6 max-w-md text-lg text-ink/75
                ${
                  isRTL
                    ? "leading-[1.9]"
                    : "leading-relaxed"
                }
              `}
            >
              {t("events.sub")}
            </p>

            {showLink && (
              <div className="mt-6">
                <ArrowLink href={href("/events")}>
                  {t("common.seeEvents")}
                </ArrowLink>
              </div>
            )}
          </>
        )}

        <div className="mt-14 grid gap-16">
          {eventJourney.map((s, i) => (
            <Stage
              key={s.id}
              stage={s}
              i={i}
              imageData={stageImages[i]}
              horizontal={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
