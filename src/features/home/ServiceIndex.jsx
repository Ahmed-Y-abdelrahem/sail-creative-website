"use client";

import TransitionLink from "@/components/layout/TransitionLink";
import RevealText from "@/components/ui/RevealText";
import { ArrowLink } from "@/components/ui/Button";
import { useLocale } from "@/components/shared/LocaleProvider";

export default function ServiceIndex({ services }) {
  const { t, x, href } = useLocale();

  return (
    <section className="surface-light tex-day px-[var(--pad)] py-16 lg:py-24"
      aria-labelledby="services-title">
      <h2 id="services-title" className="display section-heading leading-tight">
        <RevealText text={t("services.title")} />
      </h2>
      <ul className="my-8 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <li key={service.slug} className="border-t border-current/20">
            <TransitionLink href={href(`/services/${service.slug}`)}
              className="inline-flex min-h-11 items-center py-3 font-semibold hover:underline">
              {x(service.title)}
            </TransitionLink>
          </li>
        ))}
      </ul>
      <ArrowLink href={href("/services")} className="inline-flex min-h-11 items-center">
        {t("nav.services")}
      </ArrowLink>
    </section>
  );
}
