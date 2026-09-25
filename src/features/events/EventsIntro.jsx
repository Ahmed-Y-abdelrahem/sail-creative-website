"use client";
import RevealText from "@/components/ui/RevealText";
import Arrow from "@/components/ui/Arrow";
import { SectionLabel } from "@/components/ui/Section";
import { useLocale } from "@/components/shared/LocaleProvider";
import { eventIntro, eventSpecialties } from "@/data/site";

export function EventsHero() {
  const { t, x } = useLocale();
  return (
    <section className="tex-night grain relative flex min-h-[92svh] flex-col justify-end px-[var(--pad)] pb-16 pt-40">
      <h1 className="display text-[clamp(3.6rem,13vw,17rem)] leading-[0.84]">
        <RevealText text={t("events.page.title")} immediate stagger={0.08} />
      </h1>
      <p className="mt-12 max-w-3xl text-[clamp(1.1rem,1.6vw,1.5rem)] leading-relaxed text-white/80">{x(eventIntro)}</p>
    </section>
  );
}

export function EventSpecialties() {
  const { t, x } = useLocale();
  return (
    <section className="surface-paper px-[var(--pad)] py-28 sm:py-36" aria-labelledby="specialised-title">
      <SectionLabel>{t("events.specialised")}</SectionLabel>
      <h2 id="specialised-title" className="sr-only">
        {t("events.specialised")}
      </h2>
      <ul className="mt-12">
        {eventSpecialties.map((s) => (
          <li key={s.en} className="group flex items-center justify-between gap-6 border-t border-ink/15 py-5 last:border-b sm:py-7">
            <span className="display display-wide text-[clamp(1.5rem,3.6vw,3.8rem)] leading-[1.05] transition-transform duration-700 ease-[var(--ease)] group-hover:translate-x-4 rtl:group-hover:-translate-x-4">
              {x(s)}
            </span>
            <Arrow className="h-5 w-5 shrink-0 text-orange opacity-0 transition-opacity duration-500 group-hover:opacity-100" stroke={12} />
          </li>
        ))}
      </ul>
    </section>
  );
}
