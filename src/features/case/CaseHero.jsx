
"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

import RevealText from "@/components/ui/RevealText";
import { ArrowLink } from "@/components/ui/Button";
import ProjectMeta from "@/components/shared/ProjectMeta";
import ProjectVisual from "@/components/shared/ProjectVisual";
import { useLocale } from "@/components/shared/LocaleProvider";

export default function CaseHero({ project }) {
  const { x, t, href, isRTL } = useLocale();

  const visualRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ["start end", "start 0.15"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [0.8, 1]
  );

  const hasVisual = project.layout !== "strips";

  const projectName = x(project.name);
  const projectWork = x(project.work);

  const visualAlt = isRTL
    ? `صورة من أعمال مشروع ${projectName} — ${projectWork}`
    : `${projectName} — ${projectWork} project showcase`;

  return (
    <header
      className="relative overflow-hidden pb-20 pt-32 sm:pb-28"
      style={{
        background: project.brand.bg,
        color: project.brand.fg,
      }}
    >
      <div className="px-[var(--pad)]">
        <div className="flex items-center justify-between gap-4">
          <span
            className="shrink-0"
            style={{
              color: project.brand.accent,
            }}
          >
            <ArrowLink
              href={href("/work")}
              direction="left"
              className="meta"
            >
              {t("common.back")}
            </ArrowLink>
          </span>

          <p className="meta min-w-0 text-end opacity-70">
            {projectWork}
          </p>
        </div>

        <h1 className="display mt-14 max-w-full break-words text-[clamp(3rem,14vw,24rem)] leading-[0.9] sm:text-[clamp(4rem,18vw,24rem)] sm:leading-[0.8]">
          <RevealText
            text={projectName}
            immediate
          />
        </h1>

        <ProjectMeta
          project={project}
          className="mt-14 max-w-4xl"
        />
      </div>

      {hasVisual && (
        <motion.div
          ref={visualRef}
          style={{
            scale: reduceMotion ? 1 : scale,
          }}
          className="mx-auto mt-16 w-full origin-top px-[var(--pad)] sm:mt-24"
        >
          <ProjectVisual
            project={project}
            alt={visualAlt}
            sizes="(min-width:1024px) 90vw, 100vw"
            priority
          />
        </motion.div>
      )}
    </header>
  );
}
