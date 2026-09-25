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

const rowA = ["le-gout/top", "shavery/top", "88-port/top", "bistro-catering/top", "carte-restaurant/top"].map(M);
const rowB = ["bistro-catering/bottom", "carte-restaurant/bottom", "le-gout/bottom", "shavery/bottom", "88-port/bottom"].map(M);

/** Timecode that ticks at 24 fps while the section is on screen — written straight to the DOM. */
function Timecode() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0, start = 0, running = false;
    const fmt = (n) => String(n).padStart(2, "0");
    const tick = (now) => {
      if (!start) start = now;
      const f = Math.floor(((now - start) / 1000) * 24);
      el.textContent = `${fmt(Math.floor(f / 86400) % 100)}:${fmt(Math.floor(f / 1440) % 60)}:${fmt(Math.floor(f / 24) % 60)}:${fmt(f % 24)}`;
      if (running) raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      running = e.isIntersecting;
      if (running) raf = requestAnimationFrame(tick);
      else cancelAnimationFrame(raf);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <span ref={ref} dir="ltr" className="meta tabular-nums text-orange">
      00:00:00:00
    </span>
  );
}

export default function MediaReel() {
  const { t, x, href } = useLocale();
  return (
    <section className="relative overflow-hidden bg-[#070b10] py-28 text-paper sm:py-36" aria-labelledby="media-title">
      <div className="px-[var(--pad)]">
        <div className="flex items-center justify-between">
          <SectionLabel index="06">{t("media.kicker")}</SectionLabel>
          <Timecode />
        </div>
        <h2 id="media-title" className="display mt-10 text-[clamp(3rem,9.6vw,12rem)] leading-[0.86]">
          <RevealText lines={t("media.title").split(". ").map((s, i, a) => (i < a.length - 1 ? `${s}.` : s))} stagger={0.1} />
        </h2>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/70">{t("media.sub")}</p>
      </div>

      <div className="mt-16 grid gap-3">
        <FilmStrip images={rowA} duration={95} cursorLabel="•" />
        <FilmStrip images={rowB} reverse duration={110} cursorLabel="•" />
      </div>

      <div className="mt-16 grid gap-10 px-[var(--pad)] md:grid-cols-3">
        {mediaPhases.map((ph, i) => (
          <div key={ph.id} className="border-t border-white/20 pt-5 md:border-s md:border-t-0 md:ps-6 md:pt-0 md:first:border-s-0 md:first:ps-0">
            <p className="meta flex justify-between opacity-70">
              <span>{pad2(i + 1)}</span>
              <span>{x(ph.tag)}</span>
            </p>
            <h3 className="display display-wide mt-3 text-3xl">{x(ph.title)}</h3>
            <ul className="mt-4 grid gap-1.5 text-[0.9375rem] text-white/70">
              {ph.items.map((it) => (
                <li key={it.en}>{x(it)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-14 px-[var(--pad)]">
        <ArrowLink href={href("/work?category=media")}>{t("common.seeAllWork")}</ArrowLink>
      </div>
    </section>
  );
}
