"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RevealText from "@/components/ui/RevealText";
import { ArrowLink } from "@/components/ui/Button";
import ProjectMeta from "@/components/shared/ProjectMeta";
import ProjectVisual from "@/components/shared/ProjectVisual";
import { useLocale } from "@/components/shared/LocaleProvider";

export default function CaseHero({ project }) {
  const { x, t, href } = useLocale();
  const visualRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: visualRef, offset: ["start end", "start 0.15"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const hasVisual = project.layout !== "strips";

  return (
    <header className="relative overflow-hidden pb-20 pt-32 sm:pb-28" style={{ background: project.brand.bg, color: project.brand.fg }}>
      <div className="px-[var(--pad)]">
        <div className="flex items-center justify-between">
          <span style={{ color: project.brand.accent }}>
            <ArrowLink href={href("/work")} direction="left" className="meta">
              {t("common.back")}
            </ArrowLink>
          </span>
          <p className="meta opacity-70">{x(project.work)}</p>
        </div>

        <h1 className="display mt-14 text-[clamp(4rem,18vw,24rem)] leading-[0.8]">
          <RevealText text={x(project.name)} immediate />
        </h1>

        <ProjectMeta project={project} className="mt-14 max-w-4xl" />
      </div>

      {hasVisual && (
        <motion.div ref={visualRef} style={{ scale }} className="mx-auto mt-16 w-full origin-top px-[var(--pad)] sm:mt-24">
          <ProjectVisual project={project} alt={`${project.name.en} — ${project.work.en}`} sizes="(min-width:1024px) 90vw, 100vw" priority />
        </motion.div>
      )}
    </header>
  );
}
