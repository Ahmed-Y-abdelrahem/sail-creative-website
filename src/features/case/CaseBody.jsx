"use client";
import RevealText from "@/components/ui/RevealText";
import ProjectPreview from "@/components/shared/ProjectPreview";
import { blocks } from "./CaseMedia";
import { useLocale } from "@/components/shared/LocaleProvider";

export default function CaseBody({ project, related }) {
  const { x, t } = useLocale();
  const name = x(project.name);
  // The hero already shows the first board / film / pano.
  const rest = project.media.filter((m, i) => !(i === 0 && project.layout !== "strips" && ["board", "film", "pano"].includes(m.type)));
  const showPalette = project.categories.includes("branding");

  return (
    <div style={{ background: project.brand.bg, color: project.brand.fg }}>
      <section className="grid gap-14 px-[var(--pad)] py-24 sm:py-32 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 className="meta opacity-60">{t("common.scope")}</h2>
            <ul className="mt-5 grid gap-0 text-[1.0625rem]">
              {project.scope.map((s) => (
                <li key={s.en} className="flex items-baseline gap-3 border-t border-current/20 py-2.5">
                  <span aria-hidden className="h-1.5 w-1.5 shrink-0 translate-y-[-0.1em]" style={{ background: project.brand.accent }} />
                  {x(s)}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="lg:col-span-8">
          <h2 className="meta opacity-60">{t("common.overview")}</h2>
          <p className="display display-wide mt-6 text-[clamp(1.5rem,2.9vw,3rem)] leading-[1.12]" style={{ fontStretch: "90%" }}>
            <RevealText text={x(project.overview)} stagger={0.012} />
          </p>
        </div>
      </section>

      {showPalette && (
        <section className="px-[var(--pad)] pb-24" aria-label={t("common.palette")}>
          <p className="meta mb-4 opacity-60">{t("common.palette")}</p>
          <ul className="flex h-24 overflow-hidden sm:h-32" dir="ltr">
            {project.swatches.map((c) => (
              <li key={c} className="group relative flex-1 transition-[flex] duration-700 ease-[var(--ease)] hover:flex-[2.4]" style={{ background: c }}>
                <span className="meta absolute bottom-2 start-2 opacity-0 mix-blend-difference transition-opacity duration-300 group-hover:opacity-100" style={{ color: "#fff" }}>
                  {c}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="grid gap-24 pb-32 sm:gap-36">
        {rest.map((block, i) => {
          const B = blocks[block.type];
          return <B key={i} block={block} name={name} />;
        })}
      </div>

      {related.length > 0 && (
        <section className="border-t border-current/20 px-[var(--pad)] py-24">
          <h2 className="meta mb-10 opacity-60">{t("common.related")}</h2>
          <div className="grid gap-10 md:grid-cols-3">
            {related.map((p) => (
              <ProjectPreview key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
