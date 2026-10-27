
"use client";

import { motion, useReducedMotion } from "framer-motion";

import Marquee from "@/components/ui/Marquee";
import ClientLogo from "@/components/shared/ClientLogo";
import { SectionLabel } from "@/components/ui/Section";
import { useLocale } from "@/components/shared/LocaleProvider";
import { partnerRows, partners } from "@/data/partners";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function PartnerTile({ partner }) {
  return (
    <div
      className="
        group
        flex
        shrink-0
        items-center
        justify-center
        rounded-xl
        border
        border-white/[0.08]
        bg-white/[0.035]
        p-2
        transition-all
        duration-300
        hover:border-white/[0.18]
        hover:bg-white/[0.075]
        sm:rounded-2xl
      "
    >
      <ClientLogo
        partner={partner}
        size={88}
        className="
          transition-transform
          duration-300
          group-hover:scale-[1.04]
        "
      />
    </div>
  );
}

export default function PartnersField({
  index = "08",
  compact = false,
}) {
  const { t, x, num } = useLocale();
  const reducedMotion = useReducedMotion();

  const visibleRows = partnerRows.slice(
    0,
    compact ? 2 : 3
  );

  // Render the actual number immediately for SEO.
  const partnerCount = partners.length;

  return (
    <section
      aria-labelledby="partners-title"
      className="
        relative
        isolate
        overflow-hidden
        bg-[#0D1B25]
        py-16
        text-white
        sm:py-20
        lg:py-24
      "
    >
      {/* BACKGROUND */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10
          bg-[radial-gradient(ellipse_at_85%_15%,rgba(255,106,31,0.075),transparent_45%)]
        "
      />

      {/* HEADER */}

      <div className="relative mx-auto max-w-[1440px] px-[var(--pad)]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <SectionLabel index={index}>
            {t("partners.kicker")}
          </SectionLabel>
        </motion.div>

        <div className="mt-7 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="max-w-2xl"
          >
            <h2
              id="partners-title"
              className="
                display
                text-[clamp(2rem,3.8vw,3.8rem)]
                leading-[1.08]
                tracking-[-0.035em]
                text-white
              "
            >
              {t("partners.title")}
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-[1.8] text-white/55 sm:text-[15px]">
              {x({
                en: "Building meaningful partnerships with ambitious brands and businesses across industries.",
                ar: "نبني شراكات قوية مع علامات تجارية وشركات طموحة في مختلف القطاعات.",
              })}
            </p>
          </motion.div>

          {/* CLIENT COUNT */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="
              flex
              w-fit
              shrink-0
              items-center
              gap-4
              rounded-2xl
              border
              border-white/10
              bg-white/[0.045]
              px-5
              py-4
              sm:px-6
            "
          >
            <span
              className="
                display
                text-[clamp(2rem,3vw,3rem)]
                leading-none
                text-[#FF7A35]
              "
            >
              {num(partnerCount)}
            </span>

            <span
              aria-hidden="true"
              className="h-9 w-px bg-white/15"
            />

            <div>
              <p className="text-xs font-medium text-white/80">
                {t("partners.count")}
              </p>

              <p className="mt-1 text-xs text-white/40">
                {x({
                  en: "Our network",
                  ar: "شبكة شركائنا",
                })}
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-9 h-px w-full bg-white/10 sm:mt-11" />
      </div>

      {/* PARTNER LOGOS — LTR ISOLATED */}

      <div
        dir="ltr"
        role="group"
        aria-label={t("partners.label")}
        className="
          relative
          mt-8
          grid
          gap-3
          overflow-hidden
          sm:mt-10
          sm:gap-4
        "
      >
        {/* LEFT FADE */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-y-0
            left-0
            z-10
            w-10
            bg-gradient-to-r
            from-[#0D1B25]
            to-transparent
            sm:w-24
          "
        />

        {/* RIGHT FADE */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-y-0
            right-0
            z-10
            w-10
            bg-gradient-to-l
            from-[#0D1B25]
            to-transparent
            sm:w-24
          "
        />

        {visibleRows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            dir="ltr"
            className="w-full overflow-hidden"
          >
            <Marquee
              reverse={rowIndex % 2 === 1}
              duration={
                reducedMotion
                  ? 999999
                  : 145 + rowIndex * 25
              }
              trackClassName="gap-3 pl-3 sm:gap-4 sm:pl-4"
              className="overflow-hidden"
            >
              {row.map((partner) => (
                <PartnerTile
                  key={partner.id}
                  partner={partner}
                />
              ))}
            </Marquee>
          </div>
        ))}
      </div>

      {/* FOOTER */}

      {!compact && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="
            mx-auto
            mt-10
            flex
            max-w-[1440px]
            flex-wrap
            items-center
            justify-between
            gap-4
            px-[var(--pad)]
            sm:mt-12
          "
        >
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF6A1F]" />

            <p className="text-xs text-white/45">
              {x({
                en: "Trusted relationships. Shared ambitions.",
                ar: "علاقات مبنية على الثقة وطموحات مشتركة.",
              })}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-px w-7 bg-[#FF6A1F]/60" />

            <span className="text-xs font-medium uppercase tracking-[0.15em] text-white/40">
              SAIL Creative Solutions
            </span>
          </div>
        </motion.div>
      )}
    </section>
  );
}
