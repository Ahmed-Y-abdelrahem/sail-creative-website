"use client";
import Image from "next/image";
import TransitionLink from "@/components/layout/TransitionLink";
import Arrow from "@/components/ui/Arrow";
import { useLocale } from "@/components/shared/LocaleProvider";

/** The next project arrives as a full-screen colour field — the hand-off is part of the story. */
export default function NextProject({ project }) {
  const { x, t, href } = useLocale();
  return (
    <TransitionLink
      href={href(`/work/${project.slug}`)}
      data-cursor="open"
      data-cursor-label={t("cursor.open")}
      className="group relative flex min-h-[90svh] flex-col justify-between overflow-hidden px-[var(--pad)] py-16"
      style={{ background: project.brand.bg, color: project.brand.fg, "--nbg": project.brand.bg }}
    >
      <div className="flex items-center justify-between">
        <p className="meta opacity-70">{t("common.next")}</p>
        <p className="meta opacity-70">{x(project.work)}</p>
      </div>

      <div className="relative">
        <div className="absolute end-0 top-1/2 hidden aspect-[4/3] w-[34vw] -translate-y-1/2 overflow-hidden opacity-90 transition-transform duration-[1200ms] ease-[var(--ease)] group-hover:scale-[1.05] lg:block">
          <Image src={project.cover.src} alt="" fill sizes="34vw" className={`object-cover ${project.layout === "strips" ? "object-top" : ""}`} />
        </div>
        <h2 className="display relative text-[clamp(4rem,17vw,23rem)] leading-[0.8] transition-transform duration-[1000ms] ease-[var(--ease)] group-hover:translate-x-4 rtl:group-hover:-translate-x-4">
          {x(project.name)}
        </h2>
      </div>

      <div className="flex items-center justify-between">
        <p className="max-w-sm text-lg opacity-80">{x(project.client)}</p>
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-current transition-colors duration-500 group-hover:bg-current sm:h-20 sm:w-20" style={{ color: project.brand.accent }}>
          <Arrow className="h-6 w-6 transition-colors duration-500 group-hover:text-[var(--nbg)]" stroke={12} />
        </span>
      </div>
    </TransitionLink>
  );
}
