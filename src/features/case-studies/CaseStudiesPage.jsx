
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import TransitionLink from "@/components/layout/TransitionLink";
import { useLocale } from "@/components/shared/LocaleProvider";
import { caseStudies } from "@/data/caseStudies";

const gradient =
  "radial-gradient(ellipse at 0% 45%, rgba(10,90,96,0.42), transparent 50%), radial-gradient(ellipse at 100% 65%, rgba(8,116,119,0.28), transparent 48%), linear-gradient(135deg, #142535 0%, #101B29 65%, #0B1724 100%)";

export default function CaseStudiesPage() {
  const { isRTL, x, href } = useLocale();

  const uniqueProjects = new Set(
    caseStudies.flatMap((sector) =>
      sector.projects.map((project) => project.slug)
    )
  ).size;

  return (
    <main className="overflow-hidden">
      {/* HERO */}
      <section
        className="relative flex min-h-[100svh] flex-col justify-center px-[var(--pad)] pb-12 pt-32 text-white sm:pb-14 sm:pt-36 lg:pb-16"
        style={{ background: gradient }}
      >
        <div className="mx-auto flex w-full max-w-[1600px] flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60 sm:mb-8"
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#FF6A1F]" />
            <span dir="ltr">SAIL CREATIVE SOLUTIONS</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={
              isRTL
                ? "max-w-[1100px] font-bold text-[clamp(2.5rem,5.5vw,5.8rem)] leading-[1.35] tracking-normal"
                : "display max-w-[1450px] text-[clamp(3.2rem,7.5vw,8rem)] leading-[1.02] tracking-[-0.045em]"
            }
          >
            {isRTL
              ? "قصص من أعمالنا."
              : "Work that tells a story."}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
            }}
            className={`mt-7 max-w-2xl text-white/75 sm:mt-9 ${
              isRTL
                ? "text-base leading-[1.9] sm:text-lg"
                : "text-base leading-[1.8] sm:text-lg"
            }`}
          >
            {isRTL
              ? "من المطاعم والتكنولوجيا إلى العقارات والفعاليات، اكتشف كيف ساعدنا علامات تجارية من قطاعات مختلفة في بناء حضورها وتقديم تجارب مميزة."
              : "From hospitality and technology to real estate and events, explore the brands we've worked with across different industries."}
          </motion.p>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.25,
            }}
            className="mt-10 flex flex-wrap gap-10 border-t border-white/20 pt-6 sm:mt-12 sm:gap-14 sm:pt-7"
          >
            <div>
              <span className="block text-3xl font-bold tabular-nums text-white sm:text-4xl">
                {String(caseStudies.length).padStart(2, "0")}
              </span>

              <span className="mt-2 block text-sm text-white/60">
                {isRTL ? "قطاعات" : "Industries"}
              </span>
            </div>

            <div>
              <span className="block text-3xl font-bold tabular-nums text-white sm:text-4xl">
                {uniqueProjects}
              </span>

              <span className="mt-2 block text-sm text-white/60">
                {isRTL ? "مشروع مختلف" : "Unique projects"}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTORS */}
      <div className="bg-[#F5F2ED] text-[#101B29]">
        {caseStudies.map((sector, index) => (
          <section
            key={sector.id}
            id={sector.id}
            className="border-b border-[#101B29]/10 px-[var(--pad)] py-20 sm:py-28"
          >
            <div className="mx-auto max-w-[1600px]">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{ duration: 0.65 }}
              >
                <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-[#0A5A60]">
                  <span className="tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="h-px w-10 bg-current" />

                  <span>
                    {isRTL ? "القطاع" : "INDUSTRY"}
                  </span>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-14">
                  <h2
                    className={
                      isRTL
                        ? "text-[clamp(2.2rem,4.5vw,5rem)] font-bold leading-[1.45]"
                        : "display text-[clamp(3rem,6vw,7rem)] leading-[1.05] tracking-[-0.035em]"
                    }
                  >
                    {x(sector.title)}
                  </h2>

                  <p
                    className={`max-w-lg text-[#101B29]/65 ${
                      isRTL
                        ? "text-base leading-[2]"
                        : "text-lg leading-relaxed"
                    }`}
                  >
                    {x(sector.description)}
                  </p>
                </div>
              </motion.div>

              <div className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                {sector.projects.map(
                  (project, projectIndex) => (
                    <motion.article
                      key={project.slug}
                      initial={{
                        opacity: 0,
                        y: 30,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.1,
                      }}
                      transition={{
                        duration: 0.55,
                        delay: projectIndex * 0.08,
                      }}
                      className="group min-w-0"
                    >
                      <TransitionLink
                        href={href(`/work/${project.slug}`)}
                        className="block"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-[#E6E0D8]">
                          {project.cover?.src && (
                            <Image
                              src={project.cover.src}
                              alt={x(project.name)}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          )}

                          <span className="absolute bottom-4 end-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#FF6A1F] text-xl text-[#101B29] transition-transform duration-300 group-hover:-translate-y-1">
                            ↗
                          </span>
                        </div>

                        <div className="border-b border-[#101B29]/15 py-5">
                          <div className="flex items-start justify-between gap-4">
                            <h3
                              className={
                                isRTL
                                  ? "text-[1.5rem] font-bold leading-[1.5]"
                                  : "display text-[clamp(1.6rem,2vw,2.3rem)] leading-[1.2]"
                              }
                            >
                              {x(project.name)}
                            </h3>

                            <span className="shrink-0 text-xs text-[#0A5A60]">
                              {String(
                                projectIndex + 1
                              ).padStart(2, "0")}
                            </span>
                          </div>

                          <p className="mt-2 text-sm font-medium text-[#0A5A60]">
                            {x(project.work)}
                          </p>

                          <p
                            className={`mt-4 text-sm text-[#101B29]/65 ${
                              isRTL
                                ? "leading-[1.9]"
                                : "leading-[1.8]"
                            }`}
                          >
                            {x(project.overview)}
                          </p>

                          <div className="mt-5 flex flex-wrap gap-2">
                            {project.scope
                              .slice(0, 3)
                              .map((item, itemIndex) => (
                                <span
                                  key={`${project.slug}-${itemIndex}`}
                                  className="rounded-full border border-[#101B29]/15 px-3 py-1.5 text-xs text-[#101B29]/70"
                                >
                                  {x(item)}
                                </span>
                              ))}
                          </div>

                          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#101B29]">
                            {isRTL
                              ? "عرض دراسة الحالة"
                              : "View case study"}

                            <span className="text-[#FF6A1F]">
                              ↗
                            </span>
                          </span>
                        </div>
                      </TransitionLink>
                    </motion.article>
                  )
                )}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* FINAL CTA */}
      <section
        className="px-[var(--pad)] py-24 text-white sm:py-32"
        style={{ background: gradient }}
      >
        <div className="mx-auto max-w-[1600px]">
          <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-[#FF6A1F]">
            {isRTL
              ? "مشروعك القادم"
              : "YOUR NEXT PROJECT"}
          </p>

          <h2
            className={
              isRTL
                ? "max-w-4xl text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[1.5]"
                : "display max-w-5xl text-[clamp(3rem,7vw,8rem)] leading-[1.05]"
            }
          >
            {isRTL
              ? "خلّي قصتك الجاية معانا."
              : "Let's create what's next."}
          </h2>

          <TransitionLink
            href={href("/contact")}
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#FF6A1F] px-7 py-4 font-semibold text-[#101B29] transition-transform hover:-translate-y-1"
          >
            {isRTL
              ? "تواصل معنا"
              : "Let's talk"}

            <span>↗</span>
          </TransitionLink>
        </div>
      </section>
    </main>
  );
}
