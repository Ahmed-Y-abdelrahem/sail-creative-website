
"use client";

import RevealText from "@/components/ui/RevealText";
import Arrow from "@/components/ui/Arrow";
import { SectionLabel } from "@/components/ui/Section";
import { useLocale } from "@/components/shared/LocaleProvider";
import { eventIntro, eventSpecialties } from "@/data/site";

export function EventsHero() {
  const { t, x, isRTL } = useLocale();

  return (
    <section
      className="
        relative isolate
        flex min-h-[100svh]
        flex-col justify-center
        overflow-hidden
        px-[var(--pad)]
        pb-12 pt-32
        text-[#F5F4F0]
        sm:pb-16 sm:pt-36
        lg:pt-32
      "
      style={{
        background:
          "radial-gradient(ellipse at 0% 45%, rgba(10,90,96,0.38), transparent 48%), radial-gradient(ellipse at 100% 55%, rgba(8,116,119,0.32), transparent 48%), linear-gradient(135deg, #142535 0%, #101B29 60%, #0B1724 100%)",
      }}
    >
      <div className="relative z-10 flex w-full flex-col justify-center">
        <h1
          className={`
            display
            w-full max-w-full
            break-words
            ${
              isRTL
                ? "text-[clamp(2.8rem,6.2vw,6.5rem)] leading-[1.35] tracking-normal"
                : "text-[clamp(3.6rem,10vw,11rem)] leading-[0.95] tracking-[-0.035em]"
            }
          `}
        >
          {isRTL ? (
            <span className="block">
              {t("events.page.title")}
            </span>
          ) : (
            <RevealText
              text={t("events.page.title")}
              immediate
              stagger={0.08}
            />
          )}
        </h1>

        <p
          className={`
            max-w-3xl
            text-white/80
            ${
              isRTL
                ? "mt-6 text-[clamp(1rem,1.35vw,1.25rem)] leading-[1.9] sm:mt-8"
                : "mt-8 text-[clamp(1rem,1.5vw,1.4rem)] leading-[1.7] sm:mt-10"
            }
          `}
        >
          {x(eventIntro)}
        </p>
      </div>
    </section>
  );
}

export function EventSpecialties() {
  const { t, x, isRTL } = useLocale();

  return (
    <section
      className="surface-paper px-[var(--pad)] py-20 sm:py-28"
      aria-labelledby="specialised-title"
    >
      <SectionLabel>
        {t("events.specialised")}
      </SectionLabel>

      <h2
        id="specialised-title"
        className="sr-only"
      >
        {t("events.specialised")}
      </h2>

      <ul className="mt-10 sm:mt-12">
        {eventSpecialties.map((specialty) => (
          <li
            key={specialty.en}
            className="
              group flex items-center
              justify-between gap-6
              border-t border-ink/15
              py-5 last:border-b
              sm:py-7
            "
          >
            <span
              className={`
                display display-wide
                min-w-0 break-words
                transition-transform
                duration-700
                ease-[var(--ease)]
                group-hover:translate-x-4
                rtl:group-hover:-translate-x-4
                ${
                  isRTL
                    ? "text-[clamp(1.4rem,2.6vw,2.8rem)] leading-[1.5]"
                    : "text-[clamp(1.5rem,3.6vw,3.8rem)] leading-[1.1]"
                }
              `}
            >
              {x(specialty)}
            </span>

            <Arrow
              className="
                h-5 w-5 shrink-0
                text-orange
                opacity-0
                transition-opacity
                duration-500
                group-hover:opacity-100
              "
              stroke={12}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
