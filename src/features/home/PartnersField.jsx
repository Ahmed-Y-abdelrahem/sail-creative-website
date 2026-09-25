"use client";
import { useRef } from "react";
import Marquee from "@/components/ui/Marquee";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import RevealText from "@/components/ui/RevealText";
import ClientLogo from "@/components/shared/ClientLogo";
import { SectionLabel } from "@/components/ui/Section";
import { useLocale } from "@/components/shared/LocaleProvider";
import { partnerRows, partners } from "@/data/partners";

/**
 * Three slow rails of real client tiles. A spotlight follows the pointer — tiles outside it recede —
 * and each tile turns to full colour on hover. Rails pause when hovered.
 */
export default function PartnersField({ index = "08", compact = false }) {
  const { t } = useLocale();
  const box = useRef(null);
  const onMove = (e) => {
    const el = box.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    el.style.setProperty("--spot", "1");
  };

  return (
    <section className="tex-night grain relative overflow-hidden py-28 sm:py-36" aria-labelledby="partners-title">
      <div className="px-[var(--pad)]">
        <SectionLabel index={index}>{t("partners.kicker")}</SectionLabel>
        <div className="mt-10 grid items-end gap-8 lg:grid-cols-12">
          <h2 id="partners-title" className="display text-[clamp(3rem,10vw,12rem)] leading-[0.86] lg:col-span-8">
            <RevealText text={t("partners.title")} />
          </h2>
          <div className="lg:col-span-4 lg:pb-3">
            <p className="display text-[clamp(4rem,9vw,9rem)] leading-none text-orange">
              <AnimatedCounter value={partners.length} />
            </p>
            <p className="meta mt-2 opacity-70">{t("partners.count")}</p>
          </div>
        </div>
      </div>

      <div
        ref={box}
        onPointerMove={onMove}
        onPointerLeave={() => box.current?.style.setProperty("--spot", "0")}
        role="group"
        aria-label={t("partners.label")}
        className="relative mt-16 grid gap-5 py-4"
        style={{ "--mx": "50%", "--my": "50%", "--spot": "0" }}
      >
        {partnerRows.slice(0, compact ? 2 : 3).map((row, r) => (
          <Marquee key={r} reverse={r % 2 === 1} duration={130 + r * 25} trackClassName="gap-5 ps-5" className="mask-fade-x">
            {row.map((p) => (
              <ClientLogo key={p.id} partner={p} size={112} className="me-5" />
            ))}
          </Marquee>
        ))}
        {/* Spotlight veil: darkens everything except a soft circle around the pointer. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: "var(--spot)",
            background: "radial-gradient(circle 300px at var(--mx) var(--my), transparent 0%, rgba(12,21,32,0.72) 100%)",
          }}
        />
      </div>
    </section>
  );
}
