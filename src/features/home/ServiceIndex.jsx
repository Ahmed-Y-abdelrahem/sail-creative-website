
"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

import TransitionLink from "@/components/layout/TransitionLink";
import Arrow from "@/components/ui/Arrow";
import { ArrowLink } from "@/components/ui/Button";
import RevealText from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/Section";
import { useLocale } from "@/components/shared/LocaleProvider";
import { useFinePointer } from "@/hooks/useMediaQuery";
import { pad2 } from "@/lib/utils";

export default function ServiceIndex({ services = [] }) {
  const { t, x, href, isRTL } = useLocale();
  const fine = useFinePointer();

  const [hover, setHover] = useState(null);
  const box = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, {
    stiffness: 180,
    damping: 24,
    mass: 0.5,
  });

  const sy = useSpring(my, {
    stiffness: 180,
    damping: 24,
    mass: 0.5,
  });

  const onMove = (e) => {
    if (!box.current) return;

    const r = box.current.getBoundingClientRect();

    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  const current = hover !== null ? services[hover] : null;

  const strategyLabel = isRTL
    ? "الاستراتيجية · الإبداع · التقنية · النمو"
    : "Strategy · Creative · Technology · Growth";

  const creativeLabel = isRTL
    ? "الإبداع · التسويق الرقمي · البرمجيات"
    : "Creative · Digital · Software";

  return (
    <section
      className="
        surface-light
        tex-day
        relative
        overflow-hidden
        py-16
        sm:py-20
        lg:py-24
      "
      aria-labelledby="services-title"
    >
      {/* HEADER */}

      <div className="px-[var(--pad)]">
        <SectionLabel index="03">
          {t("services.title")}
        </SectionLabel>

        <div
          className="
            mt-7
            grid
            gap-6
            lg:mt-9
            lg:grid-cols-12
            lg:items-end
          "
        >
          <div className="lg:col-span-7">
            <h2
              id="services-title"
              className={`
                display
                max-w-[48rem]
                ${
                  isRTL
                    ? "text-[clamp(1.8rem,3.2vw,3.4rem)] leading-[1.35] tracking-normal"
                    : "text-[clamp(2.8rem,5vw,5.8rem)] leading-[0.95] tracking-[-0.035em]"
                }
              `}
            >
              {isRTL ? (
                <span className="block py-1">
                  {t("services.title")}
                </span>
              ) : (
                <RevealText text={t("services.title")} />
              )}
            </h2>
          </div>

          <div
            className="
              lg:col-span-4
              lg:col-start-9
              lg:pb-1
            "
          >
            <p
              className="
                max-w-md
                text-[0.9rem]
                leading-[1.8]
                text-ink/65
                sm:text-base
              "
            >
              {t("services.sub")}
            </p>

            <div
              className="
                mt-4
                flex
                items-center
                gap-3
                text-xs
                font-medium
                uppercase
                tracking-[0.12em]
                text-ink/45
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-1.5
                  w-1.5
                  shrink-0
                  rounded-full
                  bg-orange
                "
              />

              <span>{strategyLabel}</span>
            </div>
          </div>
        </div>
      </div>

      {/* SERVICES LIST */}

      <div
        ref={box}
        onPointerMove={fine ? onMove : undefined}
        onPointerLeave={() => setHover(null)}
        className="
          relative
          mt-10
          border-t
          border-ink/15
          sm:mt-12
          lg:mt-14
        "
      >
        <ul>
          {services.map((s, i) => {
            const isHovered = hover === i;
            const isDimmed =
              hover !== null && hover !== i;

            return (
              <li
                key={s.slug}
                className="
                  relative
                  border-b
                  border-ink/15
                "
              >
                <TransitionLink
                  href={href(`/services#${s.slug}`)}
                  onPointerEnter={() => setHover(i)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  data-cursor="link"
                  className="
                    group
                    relative
                    grid
                    grid-cols-[minmax(0,1fr)_auto]
                    items-center
                    gap-4
                    px-[var(--pad)]
                    py-5
                    transition-all
                    duration-500
                    sm:gap-5
                    sm:py-6
                    md:grid-cols-[minmax(0,1fr)_minmax(12rem,20rem)_auto]
                    md:gap-7
                    lg:py-6
                  "
                  style={{
                    opacity: isDimmed ? 0.38 : 1,
                  }}
                >
                  {/* HOVER BACKGROUND */}

                  <span
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-ink/[0.025]
                      opacity-0
                      transition-opacity
                      duration-500
                      group-hover:opacity-100
                    "
                  />

                  {/* NUMBER AND TITLE */}

                  <span
                    className="
                      relative
                      z-10
                      flex
                      min-w-0
                      items-center
                      gap-3
                      transition-transform
                      duration-500
                      ease-[var(--ease)]
                      group-hover:translate-x-2
                      rtl:group-hover:-translate-x-2
                      sm:gap-5
                      lg:gap-7
                    "
                  >
                    <span
                      className="
                        meta
                        w-6
                        shrink-0
                        tabular-nums
                        text-xs
                        text-ink/45
                      "
                    >
                      {pad2(i + 1)}
                    </span>

                    <span
                      className={`
                        display
                        block
                        min-w-0
                        max-w-full
                        whitespace-normal
                        break-normal
                        ${
                          isRTL
                            ? "text-[clamp(1.2rem,2vw,2.15rem)] leading-[1.45] tracking-normal"
                            : "text-[clamp(1.9rem,3.5vw,4.25rem)] leading-[0.98] tracking-[-0.025em]"
                        }
                      `}
                      style={{
                        color: isHovered
                          ? s.theme?.accent
                          : undefined,
                        transition: "color 0.4s ease",
                      }}
                    >
                      {x(s.title)}
                    </span>
                  </span>

                  {/* CAPABILITIES */}

                  <span
                    className="
                      relative
                      z-10
                      hidden
                      max-w-[20rem]
                      text-end
                      text-[0.8rem]
                      leading-[1.75]
                      text-ink/60
                      md:block
                      lg:text-[0.84rem]
                    "
                  >
                    {s.capabilities
                      ?.slice(0, 4)
                      .map((c) => x(c))
                      .join(" · ")}
                  </span>

                  {/* ARROW */}

                  <span
                    aria-hidden="true"
                    className="
                      relative
                      z-10
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-ink/25
                      transition-all
                      duration-500
                      group-hover:border-ink
                      group-hover:bg-ink
                      group-hover:text-paper
                      sm:h-10
                      sm:w-10
                    "
                  >
                    <Arrow
                      className="
                        h-3
                        w-3
                        transition-transform
                        duration-500
                        group-hover:translate-x-[2px]
                        group-hover:-translate-y-[2px]
                        rtl:-scale-x-100
                      "
                      stroke={14}
                    />
                  </span>
                </TransitionLink>

                {/* MOBILE CAPABILITIES */}

                <div
                  className="
                    px-[var(--pad)]
                    pb-5
                    ps-[calc(var(--pad)+2.5rem)]
                    md:hidden
                  "
                >
                  <p
                    className="
                      max-w-[19rem]
                      text-xs
                      leading-[1.8]
                      text-ink/60
                    "
                  >
                    {s.capabilities
                      ?.slice(0, 3)
                      .map((c) => x(c))
                      .join(" · ")}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        {/* DESKTOP HOVER IMAGE */}

        {fine && (
          <motion.div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-0
              top-0
              z-20
              hidden
              lg:block
            "
            style={{
              x: sx,
              y: sy,
            }}
          >
            <AnimatePresence mode="wait">
              {current && (
                <motion.div
                  key={current.slug}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    rotate: -2,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: -2,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.92,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="
                    -translate-x-1/2
                    -translate-y-[60%]
                    overflow-hidden
                    shadow-[0_30px_60px_-25px_rgba(0,0,0,0.5)]
                  "
                  style={{
                    width: "min(18vw, 16rem)",
                    background:
                      current.theme?.bg || "#111827",
                  }}
                >
                  {current.media?.[0] ? (
                    <Image
                      src={current.media[0].src}
                      alt=""
                      width={current.media[0].w}
                      height={current.media[0].h}
                      sizes="18vw"
                      className="
                        h-auto
                        w-full
                        object-cover
                      "
                    />
                  ) : (
                    <div
                      className="
                        flex
                        aspect-[4/3]
                        items-center
                        justify-center
                        p-6
                      "
                    >
                      <p
                        className={`
                          display
                          text-center
                          ${
                            isRTL
                              ? "text-xl leading-[1.5]"
                              : "text-3xl leading-none"
                          }
                        `}
                        style={{
                          color:
                            current.theme?.accent ||
                            "#ff6a1f",
                        }}
                      >
                        {x(current.short)}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* BOTTOM CTA */}

      <div
        className="
          mt-9
          flex
          flex-wrap
          items-center
          justify-between
          gap-6
          px-[var(--pad)]
          sm:mt-11
        "
      >
        <ArrowLink href={href("/services")}>
          {t("common.seeAllServices")}
        </ArrowLink>

        <span
          className="
            hidden
            text-xs
            uppercase
            tracking-[0.16em]
            text-ink/35
            sm:block
          "
        >
          {creativeLabel}
        </span>
      </div>
    </section>
  );
}
