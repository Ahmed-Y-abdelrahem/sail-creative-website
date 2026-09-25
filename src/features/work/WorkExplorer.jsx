"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import ProjectShowcase from "./ProjectShowcase";
import RevealText from "@/components/ui/RevealText";
import { useLocale } from "@/components/shared/LocaleProvider";
import { categories } from "@/data/site";
import { pad2 } from "@/lib/utils";

function FilterBar({ active, onChange, counts, dock = false }) {
  const { t, num } = useLocale();
  const items = ["all", ...categories];
  return (
    <div role="group" aria-label={t("work.page.title")} className={dock ? "flex w-max gap-1 px-2 py-2" : "flex flex-wrap gap-x-8 gap-y-3"}>
      {items.map((c) => (
        <button
          key={c}
          type="button"
          aria-pressed={active === c}
          onClick={() => onChange(c)}
          data-cursor="link"
          className={`relative flex items-baseline gap-2 ${dock ? "meta px-3 py-2" : "display display-wide text-[clamp(1.4rem,3vw,2.6rem)]"} transition-opacity duration-300 ${
            active === c ? "opacity-100" : "opacity-40 hover:opacity-80"
          }`}
        >
          {t(`filter.${c}`)}
          <sup className="meta tabular-nums text-orange">{num(counts[c])}</sup>
          {active === c && (
            <motion.span layoutId={dock ? "dock-underline" : "bar-underline"} className="absolute inset-x-0 -bottom-1 h-px bg-orange" />
          )}
        </button>
      ))}
    </div>
  );
}

export default function WorkExplorer({ projects, initial = "all" }) {
  const { t, num } = useLocale();
  const params = useSearchParams();
  const fromUrl = params.get("category");
  const [active, setActive] = useState(categories.includes(fromUrl) ? fromUrl : initial);
  const [dock, setDock] = useState(false);
  const top = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setDock(!e.isIntersecting && e.boundingClientRect.top < 0), { threshold: 0 });
    if (top.current) io.observe(top.current);
    return () => io.disconnect();
  }, []);

  const counts = { all: projects.length };
  categories.forEach((c) => (counts[c] = projects.filter((p) => p.categories.includes(c)).length));
  const list = active === "all" ? projects : projects.filter((p) => p.categories.includes(active));

  const change = (c) => {
    setActive(c);
    const url = new URL(window.location.href);
    if (c === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", c);
    window.history.replaceState(null, "", url);
  };

  return (
    <>
      <section className="tex-night grain relative flex min-h-[78svh] flex-col justify-end px-[var(--pad)] pb-14 pt-40">
        <h1 className="display text-[clamp(5rem,26vw,34rem)] leading-[0.78]">
          <RevealText text={t("work.page.title")} immediate />
        </h1>
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end">
          <p className="max-w-md text-lg leading-relaxed text-white/75 lg:col-span-4">{t("work.page.sub")}</p>
          <div ref={top} className="lg:col-span-8">
            <FilterBar active={active} onChange={change} counts={counts} />
          </div>
        </div>
      </section>

      <div aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {list.length === 0 ? (
              <p className="px-[var(--pad)] py-40 text-center">{t("work.empty")}</p>
            ) : (
              list.map((p, i) => <ProjectShowcase key={p.slug} project={p} index={i} total={list.length} />)
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {dock && (
          <motion.div
            className="no-scrollbar fixed bottom-4 left-1/2 z-[70] max-w-[calc(100vw-1.5rem)] -translate-x-1/2 overflow-x-auto border border-white/25 bg-night text-paper shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <FilterBar active={active} onChange={change} counts={counts} dock />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
