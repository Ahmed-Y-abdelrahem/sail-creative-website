"use client";
import Image from "next/image";
import TransitionLink from "@/components/layout/TransitionLink";
import { useLocale } from "./LocaleProvider";

/** Image + caption, no container. Used for related work. */
export default function ProjectPreview({ project, ratio = "4/3", sizes = "(min-width:1024px) 30vw, 90vw", className = "" }) {
  const { x, href, t } = useLocale();
  return (
    <TransitionLink
      href={href(`/work/${project.slug}`)}
      data-cursor="view"
      data-cursor-label={t("cursor.view")}
      className={`group block ${className}`}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: ratio, background: project.brand.bg }}>
        <Image
          src={project.cover.src}
          alt=""
          fill
          sizes={sizes}
          className={`object-cover transition-transform duration-[1200ms] ease-[var(--ease)] group-hover:scale-[1.06] ${
            project.layout === "strips" ? "object-top" : ""
          }`}
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="display-wide display text-2xl transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
          {x(project.name)}
        </h3>
        <span className="meta opacity-60">{x(project.work)}</span>
      </div>
    </TransitionLink>
  );
}
