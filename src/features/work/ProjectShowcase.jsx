
"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

import TransitionLink from "@/components/layout/TransitionLink";
import ImageReveal from "@/components/ui/ImageReveal";
import RevealText from "@/components/ui/RevealText";
import { ArrowLink } from "@/components/ui/Button";
import { useLocale } from "@/components/shared/LocaleProvider";
import { pad2 } from "@/lib/utils";

const Swatches = ({ colors }) => (
  <ul className="flex" aria-hidden="true">
    {colors.map((c) => (
      <li
        key={c}
        className="h-3.5 w-7"
        style={{ background: c }}
      />
    ))}
  </ul>
);

function projectImageAlt(project, isRTL, type, index = 0) {
  const name = isRTL
    ? project.name.ar || project.name.en
    : project.name.en || project.name.ar;

  if (type === "identity") {
    return isRTL
      ? `تصميم الهوية البصرية لمشروع ${name}`
      : `${name} visual identity design`;
  }

  if (type === "campaign") {
    return isRTL
      ? `تصميم من حملة ${name} الإبداعية، الصورة ${index + 1}`
      : `${name} creative campaign visual ${index + 1}`;
  }

  if (type === "photography") {
    return isRTL
      ? `أعمال التصوير لمشروع ${name}، الصورة ${index + 1}`
      : `${name} photography work, image ${index + 1}`;
  }

  return isRTL
    ? `صورة من أعمال مشروع ${name}`
    : `${name} project showcase image`;
}

function Footer({ project }) {
  const { x, href, t } = useLocale();

  return (
    <div className="mt-8 flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
      <div className="max-w-xl">
        <p className="meta opacity-70">
          {x(project.client)}
        </p>

        <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[0.9375rem] opacity-90">
          {project.scope.slice(0, 4).map((s) => (
            <li key={s.en}>{x(s)}</li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-8">
        {project.categories.includes("branding") && (
          <Swatches
            colors={project.swatches.slice(0, 6)}
          />
        )}

        <span style={{ color: project.brand.accent }}>
          <ArrowLink
            href={href(`/work/${project.slug}`)}
            className="meta"
          >
            {t("common.viewCase")}
          </ArrowLink>
        </span>
      </div>
    </div>
  );
}

function Head({ project, index, total }) {
  const { x } = useLocale();

  return (
    <div className="flex items-start justify-between gap-6">
      <p
        dir="ltr"
        className="meta tabular-nums opacity-80"
      >
        {pad2(index + 1)} / {pad2(total)}
      </p>

      <p className="meta max-w-[15rem] text-end opacity-80">
        {x(project.work)}
      </p>
    </div>
  );
}

const Name = ({ project, className = "" }) => {
  const { x, isRTL } = useLocale();

  return (
    <h2
      className={`display relative z-10 max-w-full ${
        isRTL
          ? "text-[clamp(2.5rem,5.5vw,6rem)] leading-[1.4]"
          : "text-[clamp(2.8rem,8vw,10rem)] leading-[1.02] tracking-[-0.035em]"
      } ${className}`}
    >
      {isRTL ? (
        x(project.name)
      ) : (
        <RevealText text={x(project.name)} />
      )}
    </h2>
  );
};

function Link({ project, children, className = "" }) {
  const { href, t, x } = useLocale();

  return (
    <TransitionLink
      href={href(`/work/${project.slug}`)}
      data-cursor="view"
      data-cursor-label={t("cursor.view")}
      aria-label={x(project.name)}
      className={`group block ${className}`}
    >
      {children}
    </TransitionLink>
  );
}

/**
 * Identity boards.
 */
function BoardRow({ project, index, total, flip }) {
  const { isRTL } = useLocale();

  return (
    <div>
      <Head
        project={project}
        index={index}
        total={total}
      />

      <div className="mt-10">
        <Name
          project={project}
          className={flip ? "text-end" : ""}
        />

        <Link
          project={project}
          className={`-mt-[0.5em] sm:-mt-[0.7em] ${
            flip
              ? "ms-auto sm:w-[78%]"
              : "sm:w-[78%]"
          }`}
        >
          <ImageReveal
            img={project.cover}
            alt={projectImageAlt(
              project,
              isRTL,
              "identity"
            )}
            sizes="(min-width:1024px) 70vw, 100vw"
            from={flip ? "right" : "left"}
            imgClassName="transition-transform duration-[1400ms] ease-[var(--ease)] group-hover:scale-[1.03]"
          />
        </Link>
      </div>

      <Footer project={project} />
    </div>
  );
}

/**
 * Phone-format campaign strips.
 */
function StripsRow({ project, index, total, flip }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  const { isRTL } = useLocale();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const strips =
    project.media.find((m) => m.type === "strips").imgs;

  const speeds = [-30, 40, -60, 20];

  return (
    <div ref={ref}>
      <Head
        project={project}
        index={index}
        total={total}
      />

      <div className="mt-10 grid items-end gap-10 lg:grid-cols-12">
        <div
          className={`lg:col-span-7 ${
            flip ? "lg:order-2" : ""
          }`}
        >
          <Link project={project}>
            <div
              className="grid grid-cols-4 gap-[1.6%] overflow-hidden mask-fade-b"
              style={{
                height: "clamp(22rem, 46vw, 40rem)",
              }}
            >
              {strips.map((s, i) => (
                <StripCol
                  key={s.src}
                  s={s}
                  speed={speeds[i] || 0}
                  progress={scrollYProgress}
                  reduceMotion={reduceMotion}
                  alt={projectImageAlt(
                    project,
                    isRTL,
                    "campaign",
                    i
                  )}
                />
              ))}
            </div>
          </Link>
        </div>

        <div
          className={`lg:col-span-5 ${
            flip ? "lg:order-1" : ""
          }`}
        >
          <Name project={project} />
        </div>
      </div>

      <Footer project={project} />
    </div>
  );
}

function StripCol({
  s,
  speed,
  progress,
  reduceMotion,
  alt,
}) {
  const y = useTransform(
    progress,
    [0, 1],
    [speed, -speed]
  );

  return (
    <motion.div
      style={{
        y: reduceMotion ? 0 : y,
      }}
      className="relative"
    >
      <Image
        src={s.src}
        alt={alt}
        width={s.w}
        height={s.h}
        sizes="(min-width:1024px) 12vw, 22vw"
        className="h-auto w-full"
      />
    </motion.div>
  );
}

/**
 * Photography film rows.
 */
function FilmRow({ project, index, total }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  const { isRTL } = useLocale();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const a = useTransform(
    scrollYProgress,
    [0, 1],
    ["-6%", "6%"]
  );

  const b = useTransform(
    scrollYProgress,
    [0, 1],
    ["6%", "-6%"]
  );

  const rows =
    project.media.find((m) => m.type === "film").rows;

  return (
    <div ref={ref}>
      <div className="px-[var(--pad)]">
        <Head
          project={project}
          index={index}
          total={total}
        />
      </div>

      <Link
        project={project}
        className="my-10 -mx-0 overflow-hidden bg-black py-3"
      >
        <div
          aria-hidden="true"
          className="sprockets h-4"
        />

        {[a, b].map((x, i) => (
          <motion.div
            key={i}
            style={{
              x: reduceMotion ? "0%" : x,
              width: "112%",
              marginInlineStart: "-6%",
            }}
            className="my-1"
          >
            <Image
              src={rows[i].src}
              alt={projectImageAlt(
                project,
                isRTL,
                "photography",
                i
              )}
              width={rows[i].w}
              height={rows[i].h}
              sizes="112vw"
              className="h-auto w-full"
            />
          </motion.div>
        ))}

        <div
          aria-hidden="true"
          className="sprockets h-4"
        />
      </Link>

      <div className="px-[var(--pad)]">
        <Name project={project} />
        <Footer project={project} />
      </div>
    </div>
  );
}

/**
 * Events and panoramic projects.
 */
function PanoRow({ project, index, total, flip }) {
  const { isRTL } = useLocale();

  return (
    <div>
      <Head
        project={project}
        index={index}
        total={total}
      />

      <div
        className="mt-6 flex items-center gap-4"
        aria-hidden="true"
      >
        <span className="h-2 w-2 rounded-full bg-current" />
        <span className="h-px flex-1 bg-current opacity-30" />
      </div>

      <div className="mt-10 grid items-end gap-x-10 gap-y-8 lg:grid-cols-12">
        <div
          className={`lg:col-span-5 ${
            flip ? "lg:order-2" : ""
          }`}
        >
          <Name
            project={project}
            className="text-[clamp(3.2rem,8.4vw,10rem)]"
          />
        </div>

        <div
          className={`lg:col-span-7 ${
            flip ? "lg:order-1" : ""
          }`}
        >
          <Link project={project}>
            <ImageReveal
              img={project.cover}
              alt={projectImageAlt(
                project,
                isRTL,
                "showcase"
              )}
              sizes="(min-width:1024px) 58vw, 100vw"
              from="up"
              imgClassName="transition-transform duration-[1400ms] ease-[var(--ease)] group-hover:scale-[1.03]"
            />
          </Link>
        </div>
      </div>

      <Footer project={project} />
    </div>
  );
}

export default function ProjectShowcase({
  project,
  index,
  total,
}) {
  const flip = index % 2 === 1;

  const P =
    {
      board: BoardRow,
      strips: StripsRow,
      film: FilmRow,
      pano: PanoRow,
    }[project.layout] || BoardRow;

  return (
    <article
      id={project.slug}
      className={`relative overflow-hidden py-20 sm:py-28 ${
        project.layout === "film"
          ? ""
          : "px-[var(--pad)]"
      }`}
      style={{
        background: project.brand.bg,
        color: project.brand.fg,
      }}
    >
      <P
        project={project}
        index={index}
        total={total}
        flip={flip}
      />
    </article>
  );
}
