
"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/components/shared/LocaleProvider";
import { SectionLabel } from "@/components/ui/Section";

const content = {
  ar: {
    eyebrow: "من نحن",
    title: "نربط الإبداع بالتكنولوجيا.",
    description:
      "سيل شركة سعودية متخصصة في تقديم حلول متكاملة تجمع بين تطوير البرمجيات، والتسويق الرقمي، والإنتاج الإعلامي، وبناء الهويات التجارية. نساعد الشركات على تطوير حضورها الرقمي، والوصول إلى جمهورها، وتحويل أفكارها إلى حلول وتجارب مؤثرة.",
    statement:
      "من الفكرة إلى التنفيذ، نعمل كشريك إبداعي وتقني يساعد علامتك التجارية على النمو.",
    services: [
      {
        number: "01",
        title: "البرمجة والتطوير",
        english: "Software Development",
        description:
          "تطوير المواقع الإلكترونية، وتطبيقات الويب، والأنظمة البرمجية المصممة لخدمة أهداف الأعمال.",
      },
      {
        number: "02",
        title: "التسويق الرقمي",
        english: "Digital Marketing",
        description:
          "استراتيجيات التسويق، وإدارة الحملات الإعلانية، وتحسين الظهور في محركات البحث، وتحليل الأداء.",
      },
      {
        number: "03",
        title: "الإنتاج الإعلامي",
        english: "Media Production",
        description:
          "إنتاج الفيديو، والتصوير الاحترافي، والمحتوى الإبداعي الذي يعبّر عن العلامات التجارية.",
      },
      {
        number: "04",
        title: "الهوية والحلول الإبداعية",
        english: "Branding & Creative",
        description:
          "تصميم الهويات البصرية، وتطوير الرسائل الإبداعية، وصناعة تجارب متناسقة للعلامات التجارية.",
      },
    ],
    footer: "استراتيجية واضحة. تنفيذ متكامل. أثر مستدام.",
  },

  en: {
    eyebrow: "Who We Are",
    title: "Where creativity meets technology.",
    description:
      "SAIL is a Saudi creative and technology company delivering integrated solutions across software development, digital marketing, media production, and brand identity. We help businesses strengthen their digital presence, connect with their audiences, and transform ideas into meaningful experiences.",
    statement:
      "From strategy to execution, we bring creative thinking and technical expertise together to help brands grow.",
    services: [
      {
        number: "01",
        title: "Software Development",
        english: "Technology & Engineering",
        description:
          "Websites, web applications, and tailored software solutions built around real business needs.",
      },
      {
        number: "02",
        title: "Digital Marketing",
        english: "Performance & Growth",
        description:
          "Marketing strategies, paid campaigns, search optimization, and data-driven performance.",
      },
      {
        number: "03",
        title: "Media Production",
        english: "Content & Storytelling",
        description:
          "Video production, professional photography, and compelling branded content.",
      },
      {
        number: "04",
        title: "Branding & Creative",
        english: "Identity & Design",
        description:
          "Visual identities, creative direction, and consistent brand experiences.",
      },
    ],
    footer: "Clear strategy. Integrated execution. Lasting impact.",
  },
};

const reveal = {
  initial: {
    opacity: 0,
    y: 22,
  },
  whileInView: {
    opacity: 1,
    y: 0,
  },
  viewport: {
    once: true,
    amount: 0.15,
  },
  transition: {
    duration: 0.65,
    ease: [0.16, 1, 0.3, 1],
  },
};

export default function OriginSection() {
  const { locale, isRTL } = useLocale();

  const data = isRTL || locale === "ar"
    ? content.ar
    : content.en;

  return (
    <section
      id="who-we-are"
      aria-labelledby="origin-title"
      className="
        surface-light
        relative
        isolate
        overflow-hidden
        px-[var(--pad)]
        py-20
        sm:py-24
        lg:py-28
      "
    >
      {/* SOFT BACKGROUND ACCENTS */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -end-24
          top-0
          -z-10
          h-80
          w-80
          rounded-full
          bg-[#0A8A86]/[0.045]
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -start-24
          bottom-0
          -z-10
          h-72
          w-72
          rounded-full
          bg-[#FF6A1F]/[0.035]
          blur-3xl
        "
      />

      <div className="mx-auto max-w-[1440px]">
        {/* SECTION LABEL */}

        <SectionLabel index="01">
          {data.eyebrow}
        </SectionLabel>

        {/* INTRO */}

        <div
          className="
            mt-10
            grid
            gap-8
            lg:mt-14
            lg:grid-cols-12
            lg:items-start
            lg:gap-10
          "
        >
          <motion.div
            {...reveal}
            className="lg:col-span-6"
          >
            <h2
              id="origin-title"
              className={`
                display
                max-w-[700px]
                text-ink
                ${
                  isRTL
                    ? "text-[clamp(2rem,3.6vw,3.8rem)] leading-[1.45] tracking-normal"
                    : "text-[clamp(2.5rem,5vw,5.5rem)] leading-[1.07] tracking-[-0.04em]"
                }
              `}
            >
              {data.title}
            </h2>

            <div
              className="
                mt-6
                h-1
                w-14
                rounded-full
                bg-[#FF6A1F]
              "
            />
          </motion.div>

          <motion.div
            {...reveal}
            className="
              lg:col-span-5
              lg:col-start-8
              lg:pt-2
            "
          >
            <p
              className="
                max-w-[600px]
                text-[0.95rem]
                leading-[2]
                text-ink/75
                sm:text-[1.05rem]
              "
            >
              {data.description}
            </p>

            <p
              className="
                mt-6
                max-w-[540px]
                border-s-2
                border-[#FF6A1F]
                ps-4
                text-sm
                font-semibold
                leading-[1.9]
                text-ink/85
              "
            >
              {data.statement}
            </p>
          </motion.div>
        </div>

        {/* SERVICES HEADER */}

        <div
          className="
            mt-16
            flex
            flex-wrap
            items-center
            justify-between
            gap-4
            border-t
            border-ink/15
            pt-7
            sm:mt-20
          "
        >
          <p
            className="
              text-[0.7rem]
              font-semibold
              uppercase
              tracking-[0.12em]
              text-ink/50
            "
          >
            {isRTL
              ? "مجالات خبرتنا"
              : "Our Expertise"}
          </p>

          <span
            className="
              text-[0.7rem]
              font-medium
              text-ink/40
            "
          >
            01 — 04
          </span>
        </div>

        {/* SERVICE CARDS */}

        <div
          className="
            mt-6
            grid
            gap-3
            sm:grid-cols-2
            lg:grid-cols-4
            lg:gap-4
          "
        >
          {data.services.map((service, index) => (
            <motion.article
              key={service.number}
              initial={{
                opacity: 0,
                y: 28,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.65,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                group
                relative
                flex
                min-h-[260px]
                flex-col
                overflow-hidden
                rounded-xl
                border
                border-ink/10
                bg-white/60
                p-5
                transition-all
                duration-500
                hover:-translate-y-1
                hover:border-[#0A8A86]/30
                hover:bg-white
                hover:shadow-[0_20px_45px_-30px_rgba(16,27,41,0.3)]
                sm:p-6
              "
            >
              {/* TOP LINE */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >
                <span
                  className="
                    meta
                    text-xs
                    tabular-nums
                    text-[#FF6A1F]
                  "
                >
                  {service.number}
                </span>

                <span
                  className="
                    h-2
                    w-2
                    rounded-full
                    bg-[#0A8A86]/35
                    transition-colors
                    duration-300
                    group-hover:bg-[#FF6A1F]
                  "
                />
              </div>

              {/* SERVICE TITLE */}

              <div className="mt-10">
                <h3
                  className={`
                    display
                    text-ink
                    ${
                      isRTL
                        ? "text-[clamp(1.25rem,1.8vw,1.65rem)] leading-[1.55]"
                        : "text-[clamp(1.45rem,2vw,2rem)] leading-[1.15] tracking-[-0.025em]"
                    }
                  `}
                >
                  {service.title}
                </h3>

                <p
                  className="
                    mt-2
                    text-[0.65rem]
                    font-medium
                    uppercase
                    tracking-[0.08em]
                    text-[#0A8A86]
                  "
                  dir="ltr"
                >
                  {service.english}
                </p>
              </div>

              {/* DESCRIPTION */}

              <p
                className="
                  mt-5
                  text-[0.82rem]
                  leading-[1.85]
                  text-ink/60
                "
              >
                {service.description}
              </p>

              {/* BOTTOM ACCENT */}

              <div
                className="
                  mt-auto
                  pt-7
                "
              >
                <div
                  className="
                    h-px
                    w-full
                    bg-ink/10
                    transition-colors
                    duration-500
                    group-hover:bg-[#FF6A1F]/50
                  "
                />
              </div>
            </motion.article>
          ))}
        </div>

        {/* BOTTOM STATEMENT */}

        <div
          className="
            mt-10
            flex
            flex-wrap
            items-center
            gap-3
            border-t
            border-ink/10
            pt-6
          "
        >
          <span
            className="
              h-2
              w-2
              shrink-0
              rounded-full
              bg-[#FF6A1F]
            "
          />

          <p
            className="
              text-xs
              font-medium
              leading-[1.8]
              text-ink/60
              sm:text-sm
            "
          >
            {data.footer}
          </p>
        </div>
      </div>
    </section>
  );
}
