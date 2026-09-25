"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TransitionLink from "@/components/layout/TransitionLink";
import Marquee from "@/components/ui/Marquee";
import Arrow from "@/components/ui/Arrow";
import RevealText from "@/components/ui/RevealText";
import { Button } from "@/components/ui/Button";
import { visuals } from "./ServiceVisuals";
import { useLocale } from "@/components/shared/LocaleProvider";
import { capabilityLine } from "@/data/site";
import { projectBySlug } from "@/data/projects";
import { ease } from "@/lib/motion";
import { pad2 } from "@/lib/utils";

const from = { left: { x: -90, y: 0 }, right: { x: 90, y: 0 }, up: { x: 0, y: 80 } };

function Chapter({ service, index }) {
  const { x, t, href, isRTL } = useLocale();
  const { theme } = service;
  const Visual = visuals[service.slug];
  const isMedia = service.slug === "media-production";
  const dir = from[service.direction];
  const sign = isRTL ? -1 : 1;
  const enter = { initial: { opacity: 0, x: dir.x * sign, y: dir.y }, whileInView: { opacity: 1, x: 0, y: 0 }, viewport: { once: true, margin: "-12% 0px" }, transition: { duration: 1.2, ease } };

  return (
    <section
      id={service.slug}
      data-chapter={index}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden px-[var(--pad)] py-28"
      style={{ background: theme.bg, color: theme.fg }}
    >
      {/* Oversized word bleeding off the edge */}
      <span
        aria-hidden
        className={`display pointer-events-none absolute select-none whitespace-nowrap text-[clamp(8rem,27vw,36rem)] leading-none opacity-[0.07] ${
          index % 2 ? "-start-[6%] bottom-[-8%]" : "-end-[8%] top-[2%]"
        }`}
      >
        {x(service.short)}
      </span>

      <div className={`relative grid items-center gap-14 lg:grid-cols-12 ${isMedia ? "lg:gap-y-10" : ""}`}>
        <motion.div {...enter} className={`lg:col-span-6 ${index % 2 ? "lg:order-2 lg:col-start-7" : ""}`}>
          <p className="meta flex items-center gap-4" style={{ color: theme.accent }}>
            <span className="tabular-nums">{pad2(index + 1)}</span>
            <span aria-hidden className="h-px w-10 bg-current" />
            <Arrow className="h-3 w-3" stroke={16} />
          </p>
          <h2 className="display mt-6 text-[clamp(3.4rem,9vw,11rem)] leading-[0.86]">{x(service.title)}</h2>
          <p className="mt-8 max-w-xl text-[clamp(1.2rem,2vw,1.7rem)] leading-snug opacity-90">{x(service.statement)}</p>

          <h3 className="meta mt-12 opacity-60">{t("services.capabilities")}</h3>
          <ul className={`mt-4 grid gap-x-10 ${service.capabilities.length > 5 ? "sm:grid-cols-2" : ""}`}>
            {service.capabilities.map((c) => (
              <li key={c.en} className="flex gap-3 border-t border-current/20 py-2.5 text-[0.9688rem] leading-snug">
                <span aria-hidden className="mt-[0.55em] h-1.5 w-1.5 shrink-0" style={{ background: theme.accent }} />
                {x(c)}
              </li>
            ))}
          </ul>

          {service.projects.length > 0 && (
            <>
              <h3 className="meta mt-12 opacity-60">{t("services.related")}</h3>
              <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-1">
                {service.projects.map((slug) => (
                  <li key={slug}>
                    <TransitionLink
                      href={href(`/work/${slug}`)}
                      data-cursor="link"
                      className="link-line display display-wide inline-flex items-center gap-2 text-2xl"
                    >
                      {x(projectBySlug[slug].name)}
                      <Arrow className="h-3 w-3" stroke={16} />
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </>
          )}
        </motion.div>

        {Visual && !isMedia && (
          <div className={`lg:col-span-5 ${index % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}>
            <Visual />
          </div>
        )}
        {!Visual && (
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="display display-wide text-[clamp(2rem,4vw,4.2rem)] leading-[1.02]" style={{ color: theme.accent }}>
              {x(service.short)}
              <span className="block opacity-30">→</span>
            </p>
          </div>
        )}
      </div>

      {isMedia && (
        <div className="relative mt-16">
          <Visual />
        </div>
      )}
      {!Visual && (
        <div className="relative mt-16">
          <Button href={href("/contact")}>{t("nav.talk")}</Button>
        </div>
      )}
    </section>
  );
}

/** Fixed chapter index — tells you which weather you're in. */
function ChapterIndex({ services }) {
  const { x } = useLocale();
  const [active, setActive] = useState(0);
  useEffect(() => {
    const els = document.querySelectorAll("[data-chapter]");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number(e.target.getAttribute("data-chapter")))),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <nav aria-label="Services" className="fixed end-5 top-1/2 z-[60] hidden -translate-y-1/2 mix-blend-difference text-white xl:block">
      <ul className="grid gap-3">
        {services.map((s, i) => (
          <li key={s.slug}>
            <a href={`#${s.slug}`} data-cursor="link" className="group flex items-center justify-end gap-3">
              <span className={`meta transition-all duration-500 ${active === i ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`}>
                {x(s.short)}
              </span>
              <span className={`block h-px transition-all duration-500 ${active === i ? "w-10 bg-white" : "w-5 bg-white/50 group-hover:w-8"}`} />
              <span className="meta w-5 tabular-nums">{pad2(i + 1)}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function ServiceChapters({ services }) {
  const { t, x } = useLocale();
  return (
    <>
      <section className="tex-night grain relative flex min-h-[92svh] flex-col justify-end overflow-hidden px-[var(--pad)] pb-0 pt-40">
        <h1 className="display text-[clamp(3.6rem,12.4vw,16rem)] leading-[0.84]">
          <RevealText text={t("services.page.title")} immediate stagger={0.08} />
        </h1>
        <p className="mt-8 max-w-md text-lg leading-relaxed text-white/75">{t("services.page.sub")}</p>
        <Marquee duration={60} className="-mx-[var(--pad)] mt-16 border-t border-white/15 py-5">
          {[...capabilityLine, ...capabilityLine].map((c, i) => (
            <span key={i} className="display outline-text mx-6 inline-flex items-center gap-6 whitespace-nowrap text-[clamp(1.8rem,4vw,4.5rem)] text-white/60">
              {x(c)}
              <Arrow className="h-[0.6em] w-[0.6em] text-orange" stroke={12} />
            </span>
          ))}
        </Marquee>
      </section>

      <ChapterIndex services={services} />
      {services.map((s, i) => (
        <Chapter key={s.slug} service={s} index={i} />
      ))}
    </>
  );
}
