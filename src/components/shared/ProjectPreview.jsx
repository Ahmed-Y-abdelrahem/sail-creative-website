
"use client";

import Image from "next/image";
import TransitionLink from "@/components/layout/TransitionLink";
import { useLocale } from "./LocaleProvider";

/**
 * Image + caption, no container.
 * Used for related work.
 */
export default function ProjectPreview({
  project,
  ratio = "4/3",
  sizes = "(min-width:1024px) 30vw, 90vw",
  className = "",
}) {
  const { x, href, t, isRTL } = useLocale();

  const projectName = x(project.name);
  const projectWork = x(project.work);

  const imageAlt = isRTL
    ? `صورة من أعمال مشروع ${projectName}`
    : `${projectName} project showcase image`;

  return (
    <TransitionLink
      href={href(`/work/${project.slug}`)}
      data-cursor="view"
      data-cursor-label={t("cursor.view")}
      className={`group block min-h-[44px] rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF6A1F] ${className}`}
    >
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: ratio,
          background: project.brand.bg,
        }}
      >
        <Image
          src={project.cover.src}
          alt={imageAlt}
          fill
          sizes={sizes}
          className={`object-cover transition-transform duration-[1200ms] ease-[var(--ease)] group-hover:scale-[1.06] motion-reduce:transform-none motion-reduce:transition-none ${
            project.layout === "strips"
              ? "object-top"
              : ""
          }`}
        />
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="display-wide display min-w-0 text-2xl transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 motion-reduce:transform-none motion-reduce:transition-none">
          {projectName}
        </h3>

        <span className="meta shrink-0 text-end opacity-60">
          {projectWork}
        </span>
      </div>
    </TransitionLink>
  );
}
