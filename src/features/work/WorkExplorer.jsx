
"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

import ProjectShowcase from "./ProjectShowcase";
import DevelopmentShowcase from "./DevelopmentShowcase";

import RevealText from "@/components/ui/RevealText";
import { useLocale } from "@/components/shared/LocaleProvider";

import { categories } from "@/data/site";
import { work as developmentProjects } from "@/data/developmentWork";

import { caseStudySectors } from "@/data/caseStudies";

const DEVELOPMENT = "development";
const serviceFilters = ["all", ...categories, DEVELOPMENT];

function FilterBar({
  active,
  onChange,
  counts,
  dock = false,
}) {
  const { t, num, isRTL } = useLocale();

  const label = (category) => {
    if (category === DEVELOPMENT) {
      return isRTL ? "البرمجة" : "Development";
    }

    return t(`filter.${category}`);
  };

  return (
    <div
      role="group"
      aria-label={t("work.page.title")}
      className={
        dock
          ? "flex w-max items-center gap-1 px-2 py-2"
          : "flex flex-wrap items-center gap-x-7 gap-y-4"
      }
    >
      {serviceFilters.map((category) => (
        <button
          key={category}
          type="button"
          aria-pressed={active === category}
          onClick={() => onChange(category)}
          data-cursor="link"
          className={`relative inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-sm transition-opacity duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6A1F] ${
            dock
              ? "meta px-3 py-2"
              : isRTL
                ? "text-[clamp(1.1rem,2vw,1.8rem)] font-semibold leading-[1.7]"
                : "display display-wide text-[clamp(1.35rem,2.6vw,2.4rem)]"
          } ${
            active === category
              ? "opacity-100"
              : "opacity-75 hover:opacity-100"
          }`}
        >
          {label(category)}

          <sup className="meta tabular-nums text-[#FF6A1F]">
            {num(counts[category] || 0)}
          </sup>

          {active === category && (
            <motion.span
              layoutId={
                dock ? "dock-underline" : "bar-underline"
              }
              className="absolute inset-x-0 -bottom-1 h-px bg-[#FF6A1F]"
            />
          )}
        </button>
      ))}
    </div>
  );
}

function WorkHero({
  sectors, sector, onSectorChange, projectCount, resultCount,
  active,
  onChange,
  counts,
  topRef,
}) {
  const { t, isRTL, num } = useLocale();

  const heroTitle = isRTL
    ? "من الفكرة إلى التأثير."
    : "Ideas into Impact.";

  return (
    <section
      className="relative isolate flex flex-col justify-end overflow-hidden px-[var(--pad)] pb-10 pt-28 text-[#F5F4F0] sm:pb-14 sm:pt-36"
      style={{
        background:
          "radial-gradient(ellipse at 0% 45%, rgba(10,90,96,0.38), transparent 48%), radial-gradient(ellipse at 100% 55%, rgba(8,116,119,0.32), transparent 48%), linear-gradient(135deg, #142535 0%, #101B29 60%, #0B1724 100%)",
      }}
    >
      <div className="relative z-10 flex flex-1 flex-col justify-center py-6">
        <p className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6A1F]" />
          <span dir="ltr">SAIL CREATIVE SOLUTIONS</span>
        </p>

        <h1
          className={`relative max-w-full ${
            isRTL
              ? "font-bold page-heading leading-[1.35]"
              : "display page-heading leading-[0.98] tracking-[-0.045em]"
          }`}
        >
          {isRTL ? (
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="block"
            >
              {heroTitle}
            </motion.span>
          ) : (
            <RevealText
              text={heroTitle}
              immediate
            />
          )}
        </h1>

        <div className="mt-8 grid gap-5 lg:grid-cols-12 lg:items-end">
          <p
            className={`max-w-md text-white/75 lg:col-span-4 ${
              isRTL
                ? "text-lg leading-[1.9]"
                : "text-lg leading-relaxed"
            }`}
          >
            {isRTL
              ? `${num(projectCount)} مشروعًا · تصفّح حسب الخدمة أو القطاع`
              : `${num(projectCount)} projects · Browse by service or sector`}
          </p>

          <div
            ref={topRef}
            className="min-w-0 lg:col-span-8"
          >
            <FilterBar
              active={active}
              onChange={onChange}
              counts={counts}
            />
            <label className="mt-4 flex flex-wrap items-center gap-3">
              <span>{isRTL ? "القطاع" : "Sector"}</span>
              <select className="min-h-11 max-w-full rounded border border-white/50 bg-night px-3"
                value={sector}
                onChange={(event) => onSectorChange(event.target.value)}
              >
                <option value="">{isRTL ? "كل القطاعات" : "All sectors"}</option>
                {sectors.map(({ id, title }) => (
                  <option key={id} value={id}>{isRTL ? title.ar : title.en}</option>
                ))}
              </select>
            </label>
            <p role="status" className="mt-3 text-sm text-white/75">
              {isRTL
                ? `عرض ${num(resultCount)} من ${num(projectCount)} مشروعًا`
                : `Showing ${num(resultCount)} of ${num(projectCount)} projects`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function WorkExplorer({
  projects,
  initial = "all",
}) {
  const { t } = useLocale();

  const params = useSearchParams();
  const fromUrl = params.get("category");

  const active = serviceFilters.includes(fromUrl)
    ? fromUrl
    : serviceFilters.includes(initial) ? initial : "all";
  const selectedSector = active === "all"
    ? caseStudySectors.find(({ id }) => id === params.get("sector"))
    : undefined;
  const sector = selectedSector?.id ?? "";
  const sectorProjects = selectedSector
    ? projects.filter(({ slug }) => selectedSector.slugs.includes(slug))
    : projects;

  const [dock, setDock] = useState(false);
  const top = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setDock(
          !entry.isIntersecting &&
            entry.boundingClientRect.top < 0
        );
      },
      { threshold: 0 }
    );

    const element = top.current;

    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const counts = {
    all: projects.length + developmentProjects.length,
    [DEVELOPMENT]: developmentProjects.length,
  };

  for (const category of categories) {
    counts[category] = projects.filter((project) =>
      project.categories.includes(category)
    ).length;
  }

  const creativeProjects = active === "all"
    ? sectorProjects
    : sectorProjects.filter((project) => project.categories.includes(active));
  const visibleDevelopment = !sector && (active === "all" || active === DEVELOPMENT)
    ? developmentProjects
    : [];
  const resultCount = creativeProjects.length + visibleDevelopment.length;

  const changeFilters = (category, nextSector) => {
    const url = new URL(window.location.href);
    if (category === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", category);
    if (nextSector) url.searchParams.set("sector", nextSector);
    else url.searchParams.delete("sector");
    window.history.replaceState(null, "", url);
  };

  const change = (category) => changeFilters(category, "");
  const changeSector = (value) => changeFilters("all", value);

  return (
    <>
      <WorkHero
        sectors={caseStudySectors}
        sector={sector}
        onSectorChange={changeSector}
        projectCount={counts.all}
        resultCount={resultCount}
        active={sector ? null : active}
        onChange={change}
        counts={counts}
        topRef={top}
      />

      <div>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${active}:${sector}`}
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {resultCount === 0 ? (
              <p className="px-[var(--pad)] py-40 text-center">
                {t("work.empty")}
              </p>
            ) : (
              <>
                {creativeProjects.map((project, index) => (
                  <ProjectShowcase
                    key={project.slug}
                    project={project}
                    index={index}
                    total={resultCount}
                  />
                ))}

                {visibleDevelopment.length > 0 && (
                  <DevelopmentShowcase
                    projects={visibleDevelopment}
                    startIndex={creativeProjects.length}
                    total={resultCount}
                  />
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {dock && (
          <motion.div
            className="no-scrollbar fixed bottom-4 left-1/2 z-[70] max-w-[calc(100vw-1.5rem)] -translate-x-1/2 overflow-x-auto border border-white/25 bg-[#101B29] text-[#F5F4F0] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <FilterBar
              active={sector ? null : active}
              onChange={change}
              counts={counts}
              dock
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
