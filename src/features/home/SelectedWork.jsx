
"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import TransitionLink from "@/components/layout/TransitionLink";
import { ArrowLink } from "@/components/ui/Button";
import { useLocale } from "@/components/shared/LocaleProvider";
import { useDesktop } from "@/hooks/useMediaQuery";
import { pad2, clamp } from "@/lib/utils";

/* PROJECT MEDIA */

function WorldMedia({ project, sizes, eager }) {
  const { x, isRTL } = useLocale();

  const loading = eager ? "eager" : "lazy";
  const projectName = x(project.name);

  if (project.layout === "strips") {
    const strips =
      project.media.find(
        (media) => media.type === "strips"
      )?.imgs || [];

    return (
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-2.5 sm:grid-cols-4 sm:grid-rows-1">
        {strips.map((strip, index) => (
          <div
            key={`${strip.src}-${index}`}
            className="relative overflow-hidden"
          >
            <Image
              src={strip.src}
              alt={
                isRTL
                  ? `صورة ${index + 1} من أعمال مشروع ${projectName}`
                  : `${projectName} project work, image ${index + 1}`
              }
              fill
              sizes="(min-width:1024px) 31vw, (min-width:640px) 25vw, 47vw"
              loading={loading}
              className="rounded-sm object-contain"
            />
          </div>
        ))}
      </div>
    );
  }

  const coverDescription = project.slug === "tawlead"
    ? (isRTL ? "هوية توليد على الشعار والبطاقات وشاشة الهاتف واللوحة الإعلانية" : "Tawlead identity across its logo, cards, phone screen and billboard")
    : (isRTL ? `صورة من أعمال مشروع ${projectName} لدى سيل` : `${projectName} creative project by SAIL`);

  return (
    <Image
      src={project.cover.src}
      alt={coverDescription}
      fill
      sizes={sizes}
      loading={loading}
      className="object-contain"
    />
  );
}

/* PROJECT WORLD */

function World({
  project,
  i,
  n,
  progress,
  desktop,
  active,
  near,
  reducedMotion,
}) {
  const { x, href, t } = useLocale();

  const local = useTransform(
    progress,
    (p) => p * (n - 1) - i + 0.5
  );

  const reveal = useTransform(local, (l) =>
    i === 0
      ? 0
      : clamp(1 - (l + 0.3) / 0.3, 0, 1) * 100
  );

  const clip = useTransform(
    reveal,
    (r) => `inset(${r}% 0 0 0)`
  );

  const open = useTransform(local, (l) =>
    clamp((l - 0.05) / 0.7, 0, 1)
  );

  const windowClip = useTransform(open, (o) => {
    if (!desktop || reducedMotion) {
      return "inset(0% 0% 0% 0%)";
    }

    const top = 22 * (1 - o);
    const bottom = 20 * (1 - o);
    const start = 44 * (1 - o);
    const end = 5 * (1 - o);

    return `inset(${top}% ${end}% ${bottom}% ${start}%)`;
  });

  const imgScale = useTransform(
    open,
    [0, 1],
    reducedMotion ? [1, 1] : [1.25, 1]
  );

  const nameY = useTransform(
    local,
    [-0.3, 0.5, 1],
    reducedMotion
      ? ["0%", "0%", "0%"]
      : ["14%", "0%", "-6%"]
  );

  const scrimOpacity = useTransform(
    open,
    [0, 1],
    [0, 0.14]
  );

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        clipPath: clip,
        background: project.brand.bg,
        color: project.brand.fg,
      }}
      aria-hidden={!active}
      inert={!active}
    >
      <div className="absolute inset-0 grid grid-rows-[auto_minmax(0,1fr)_auto] gap-4">
        {/* PROJECT NUMBER AND CATEGORY */}

        <div className="relative z-20 flex items-start justify-between px-[var(--pad)] pt-24 sm:pt-28">
          <p
            dir="ltr"
            className="meta tabular-nums"
          >
            {pad2(i + 1)} / {pad2(n)}
          </p>

          <p className="meta max-w-[16rem] text-end opacity-80">
            {x(project.work)}
          </p>
        </div>

        {/* PROJECT MEDIA */}

        <div className="relative z-10 mx-[var(--pad)] min-h-0">
          <TransitionLink
            href={href(`/work/${project.slug}`)}
            tabIndex={active ? 0 : -1}
            data-cursor="view"
            data-cursor-label={t("cursor.view")}
            aria-label={`${t("common.viewCase")}: ${x(
              project.name
            )}`}
            className="absolute inset-0 block"
          >
            <motion.div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: windowClip }}
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  scale:
                    desktop && !reducedMotion
                      ? imgScale
                      : 1,
                }}
              >
                <WorldMedia
                  project={project}
                  sizes="(min-width:1024px) 125vw, 94vw"
                  eager={near}
                />
              </motion.div>

              <motion.div
                className="absolute inset-0"
                style={{
                  opacity: desktop
                    ? scrimOpacity
                    : 0,
                  background: `linear-gradient(90deg, ${project.brand.bg}, transparent 70%)`,
                }}
              />
            </motion.div>
          </TransitionLink>
        </div>

        {/* PROJECT TITLE AND SCOPE */}

        <div className="pointer-events-none relative z-20 flex items-end px-[var(--pad)] pb-12 lg:pb-16">
          <motion.div
            style={{ y: nameY }}
            className="w-full min-w-0"
          >
            <h3
              className="
                display
                max-w-full
                break-words
                leading-[0.9]
                project-heading
              "
            >
              {x(project.name)}
            </h3>

            <div className="pointer-events-auto mt-6 flex flex-wrap items-center gap-x-10 gap-y-4">
              <ul className="meta flex flex-wrap gap-x-5 gap-y-1 text-[0.875rem] opacity-80">
                {project.scope
                  .slice(0, 3)
                  .map((scope) => (
                    <li key={scope.en}>
                      {x(scope)}
                    </li>
                  ))}
              </ul>

              <span
                style={{
                  color: project.brand.accent,
                }}
                className="inline-flex min-h-[44px] items-center"
              >
                <ArrowLink
                  href={href(`/work/${project.slug}`)}
                  className="
                    meta inline-flex
                    min-h-[44px]
                    items-center
                  "
                >
                  {t("common.viewCase")}
                </ArrowLink>
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* SELECTED WORK SECTION */

export default function SelectedWork({ projects }) {
  const { t } = useLocale();
  const desktop = useDesktop();
  const reducedMotion = useReducedMotion();

  const n = projects.length;
  const sectionRef = useRef(null);

  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(
    scrollYProgress,
    "change",
    (progress) => {
      if (n === 0) return;

      setActive(
        clamp(
          Math.round(progress * (n - 1)),
          0,
          n - 1
        )
      );
    }
  );

  if (n === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      aria-label={t("work.title")}
      className="relative"
      style={{
        height: `${100 + (n - 1) * 45}svh`,
      }}
    >
      <div className="sticky top-0 h-svh overflow-hidden bg-night">
        {projects.map((project, index) => (
          <World
            key={project.slug}
            project={project}
            i={index}
            n={n}
            progress={scrollYProgress}
            desktop={desktop}
            active={active === index}
            near={
              Math.abs(active - index) <= 1
            }
            reducedMotion={reducedMotion}
          />
        ))}

        {/* SECTION PROGRESS INDICATOR */}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex items-center justify-between gap-6 px-[var(--pad)] pb-5 mix-blend-difference text-white">
          <p className="meta">
            02 — {t("work.title")}
          </p>

          <div
            className="relative h-px w-[min(40vw,18rem)] bg-white/30"
            aria-hidden="true"
          >
            <motion.span
              className="absolute inset-y-0 start-0 w-full origin-left bg-white rtl:origin-right"
              style={{
                scaleX: scrollYProgress,
              }}
            />
          </div>

          <p className="meta hidden sm:block">
            {t("work.hint")}
          </p>
        </div>
      </div>
    </section>
  );
}
