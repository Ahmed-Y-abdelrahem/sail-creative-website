
"use client";

import { useEffect, useRef } from "react";
import FilmStrip from "@/components/shared/FilmStrip";
import RevealText from "@/components/ui/RevealText";
import { ArrowLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/Section";
import { useLocale } from "@/components/shared/LocaleProvider";
import { mediaPhases } from "@/data/site";
import { M } from "@/data/media";
import { pad2 } from "@/lib/utils";

const rowA = [
  "le-gout/top",
  "shavery/top",
  "88-port/top",
  "bistro-catering/top",
  "carte-restaurant/top",
].map(M);

const rowB = [
  "bistro-catering/bottom",
  "carte-restaurant/bottom",
  "le-gout/bottom",
  "shavery/bottom",
  "88-port/bottom",
].map(M);

function Timecode() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let start = 0;
    let running = false;

    const fmt = (n) =>
      String(n).padStart(2, "0");

    const tick = (now) => {
      if (!start) start = now;

      const f = Math.floor(
        ((now - start) / 1000) * 24
      );

      el.textContent =
        `${fmt(Math.floor(f / 86400) % 100)}:` +
        `${fmt(Math.floor(f / 1440) % 60)}:` +
        `${fmt(Math.floor(f / 24) % 60)}:` +
        `${fmt(f % 24)}`;

      if (running) {
        raf = requestAnimationFrame(tick);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;

        if (running) {
          raf = requestAnimationFrame(tick);
        } else {
          cancelAnimationFrame(raf);
        }
      }
    );

    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <span
      ref={ref}
      dir="ltr"
      className="meta tabular-nums text-[#FF6A1F]"
    >
      00:00:00:00
    </span>
  );
}

export default function MediaReel() {
  const { t, x, href } = useLocale();

  return (
    <section
      className="relative overflow-hidden bg-[#070b10] py-16 text-paper sm:py-20 lg:py-24"
      aria-labelledby="media-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_15%,rgba(255,106,31,0.055),transparent_55%)]"
      />

      <div className="relative px-[var(--pad)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionLabel index="06">
            {t("media.kicker")}
          </SectionLabel>

          <Timecode />
        </div>

        <h2
          id="media-title"
          className="display mt-7 max-w-[1050px] text-[clamp(2.3rem,5vw,5.5rem)] leading-[1.02] tracking-[-0.035em]"
        >
          <RevealText
            lines={t("media.title")
              .split(". ")
              .map((s, i, a) =>
                i < a.length - 1
                  ? `${s}.`
                  : s
              )}
            stagger={0.08}
          />
        </h2>

        <p className="mt-5 max-w-xl text-sm leading-[1.9] text-white/65 sm:text-base">
          {t("media.sub")}
        </p>
      </div>

      <div
        dir="ltr"
        className="relative mt-10 grid gap-3 overflow-hidden sm:mt-12"
      >
        <div
          dir="ltr"
          className="w-full overflow-hidden"
        >
          <FilmStrip
            images={rowA}
            duration={95}
            cursorLabel="•"
          />
        </div>

        <div
          dir="ltr"
          className="w-full overflow-hidden"
        >
          <FilmStrip
            images={rowB}
            reverse
            duration={110}
            cursorLabel="•"
          />
        </div>
      </div>

      <div className="relative mt-12 grid gap-8 px-[var(--pad)] md:grid-cols-3 lg:mt-14">
        {mediaPhases.map((ph, i) => (
          <div
            key={ph.id}
            className="border-t border-white/15 pt-5 md:border-s md:border-t-0 md:ps-6 md:pt-0 md:first:border-s-0 md:first:ps-0"
          >
            <p className="meta flex items-center justify-between gap-4 text-white/50">
              <span className="tabular-nums">
                {pad2(i + 1)}
              </span>

              <span>{x(ph.tag)}</span>
            </p>

            <h3 className="display display-wide mt-3 text-[clamp(1.4rem,2vw,2rem)] leading-[1.15]">
              {x(ph.title)}
            </h3>

            <ul className="mt-4 grid gap-2 text-[13px] leading-relaxed text-white/65 sm:text-sm">
              {ph.items.map((item) => (
                <li
                  key={item.en}
                  className="flex items-start gap-2"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-[#FF6A1F]"
                  />

                  <span>{x(item)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="relative mt-10 px-[var(--pad)] lg:mt-12">
        <span className="inline-flex min-h-[44px] items-center">
          <ArrowLink
            href={href("/work?category=media")}
            className="inline-flex min-h-[44px] items-center"
          >
            {t("common.seeAllWork")}
          </ArrowLink>
        </span>
      </div>
    </section>
  );
}
