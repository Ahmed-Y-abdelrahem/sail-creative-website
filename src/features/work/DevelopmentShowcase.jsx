
"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

import { useLocale } from "@/components/shared/LocaleProvider";

export default function DevelopmentShowcase({
  projects = [],
}) {
  const { isRTL } = useLocale();
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="development-projects"
      aria-labelledby="development-title"
      className="relative overflow-hidden px-[var(--pad)] py-20 text-[#F5F4F0] sm:py-28"
      style={{
        background:
          "linear-gradient(145deg, #101B29 0%, #102D36 52%, #0A5A60 100%)",
      }}
    >
      <div className="relative z-10 mb-14 flex flex-wrap items-end justify-between gap-8">
        <div>
          <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#FF6A1F]">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-current"
            />

            {isRTL
              ? "أعمالنا الرقمية"
              : "DIGITAL PORTFOLIO"}
          </p>

          <h2
            id="development-title"
            className={`display max-w-4xl ${
              isRTL
                ? "text-[clamp(2.6rem,5.5vw,5.5rem)] leading-[1.35]"
                : "text-[clamp(3rem,7vw,7rem)] leading-[0.98]"
            }`}
          >
            {isRTL
              ? "مشاريع البرمجة والتطوير"
              : "Built for the digital world."}
          </h2>
        </div>

        <p className="max-w-md text-base leading-relaxed text-white/65 sm:text-lg">
          {isRTL
            ? "مواقع ومنصات رقمية صممناها وطورناها لتقديم تجارب استخدام عملية واحترافية."
            : "Websites and digital platforms designed and developed for meaningful, seamless experiences."}
        </p>
      </div>

      <div className="relative z-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <motion.article
            key={project.slug}
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 45 }
            }
            whileInView={
              reduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 1, y: 0 }
            }
            viewport={{
              once: true,
              margin: "-60px",
            }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: 0.7,
                    delay:
                      Math.min(index % 3, 2) * 0.1,
                  }
            }
            className="group min-w-0 overflow-hidden border border-white/15 bg-[#101B29]/55"
          >
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF6A1F]"
              aria-label={
                isRTL
                  ? `زيارة موقع ${project.title} في نافذة جديدة`
                  : `Visit ${project.title} website (opens in a new tab)`
              }
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#192B38]">
                <Image
                  src={project.image}
                  alt={
                    isRTL
                      ? `معاينة الموقع الإلكتروني لمشروع ${project.title}`
                      : `Website preview for ${project.title}`
                  }
                  fill
                  sizes="(min-width:1280px) 33vw, (min-width:768px) 50vw, 100vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.045] motion-reduce:transform-none"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#101B29]/35 to-transparent"
                />

                <span
                  aria-hidden="true"
                  className="absolute bottom-4 end-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#FF6A1F] text-lg text-[#101B29] transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transform-none"
                >
                  ↗
                </span>
              </div>

              <div className="p-6 sm:p-7">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6CD4CB]">
                    {isRTL
                      ? project.categoryAr
                      : project.category}
                  </span>

                  <span className="text-xs tabular-nums text-white/45">
                    {project.year}
                  </span>
                </div>

                <h3 className="display text-[clamp(1.8rem,2.7vw,2.8rem)] leading-tight text-[#F5F4F0]">
                  {project.title}
                </h3>

                <p className="mt-4 min-h-[4.5rem] text-sm leading-[1.8] text-white/65">
                  {isRTL
                    ? project.summaryAr
                    : project.summary}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="border border-white/15 px-3 py-1.5 text-xs text-white/65"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex min-h-[44px] items-center justify-between border-t border-white/15 pt-5">
                  <span className="text-xs font-semibold uppercase tracking-[0.1em] text-white/85">
                    {isRTL
                      ? "زيارة الموقع"
                      : "VIEW LIVE WEBSITE"}
                  </span>

                  <span
                    aria-hidden="true"
                    className="text-xl text-[#FF6A1F]"
                  >
                    ↗
                  </span>
                </div>
              </div>
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
