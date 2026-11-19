
"use client";

import RevealText from "@/components/ui/RevealText";
import ProjectPreview from "@/components/shared/ProjectPreview";
import { blocks } from "./CaseMedia";
import { useLocale } from "@/components/shared/LocaleProvider";

export default function CaseBody({
  project,
  related = [],
}) {
  const { x, t, isRTL, locale } = useLocale();

  const name = x(project.name);

  const hasContent = (value) => {
    if (!value) return false;

    const translated =
      typeof value === "string" ? value : value[locale];

    return (
      typeof translated === "string" &&
      translated.trim().length > 0
    );
  };

  const sections = [
    {
      key: "clientOverview",
      title: isRTL ? "نبذة عن العميل" : "About the Client",
      content: project.clientOverview,
    },
    {
      key: "challenge",
      title: isRTL ? "التحدي أو المطلوب" : "The Challenge",
      content: project.challenge,
    },
    {
      key: "solution",
      title: isRTL ? "ما قدمته سيل" : "What SAIL Delivered",
      content: project.solution,
    },
    {
      key: "result",
      title: isRTL ? "النتيجة" : "The Result",
      content: project.result,
    },
  ];

  const availableSections = sections.filter((section) =>
    hasContent(section.content)
  );

  const hasOverview = Boolean(x(project.overview).trim());

  // The hero already displays the first board, film, or pano.
  const rest = (project.media || []).filter(
    (media, index) =>
      !(
        index === 0 &&
        project.layout !== "strips" &&
        ["board", "film", "pano"].includes(media.type)
      )
  );

  const showPalette =
    project.categories?.includes("branding") &&
    project.swatches?.length > 0;

  const hasTestimonial =
    project.testimonialApproved === true &&
    hasContent(project.testimonial) &&
    hasContent(project.testimonialAuthor) &&
    hasContent(project.testimonialRole);

  return (
    <div
      style={{
        background: project.brand.bg,
        color: project.brand.fg,
      }}
    >
      <section className="grid gap-14 px-[var(--pad)] py-24 sm:py-32 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 className="meta opacity-60">
              {t("common.scope")}
            </h2>

            <ul className="mt-5 grid gap-0 text-[1.0625rem]">
              {(project.scope || []).map((scope, index) => (
                <li
                  key={scope.en || index}
                  className="flex items-baseline gap-3 border-t border-current/20 py-2.5"
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 translate-y-[-0.1em]"
                    style={{
                      background: project.brand.accent,
                    }}
                  />

                  {x(scope)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-8">
          {availableSections.length > 0 ? (
            <div className="space-y-14 sm:space-y-20">
              {availableSections.map((section) => (
                <section key={section.key}>
                  <h2 className="meta opacity-60">
                    {section.title}
                  </h2>

                  <div className="mt-6 max-w-3xl text-[clamp(1.125rem,1.5vw,1.5rem)] leading-[1.8]">
                    {x(section.content)}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            hasOverview && (
              <section>
                <h2 className="meta opacity-60">
                  {t("common.overview")}
                </h2>

                <p
                  className="display display-wide mt-6 text-[clamp(1.5rem,2.9vw,3rem)] leading-[1.3]"
                  style={{
                    fontStretch: "90%",
                  }}
                >
                  <RevealText
                    text={x(project.overview)}
                    stagger={0.012}
                  />
                </p>
              </section>
            )
          )}
        </div>
      </section>

      {showPalette && (
        <section
          className="px-[var(--pad)] pb-24"
          aria-label={t("common.palette")}
        >
          <p className="meta mb-4 opacity-60">
            {t("common.palette")}
          </p>

          <ul
            className="flex h-24 overflow-hidden sm:h-32"
            dir="ltr"
          >
            {project.swatches.map((color, index) => (
              <li
                key={`${color}-${index}`}
                className="group relative flex-1 transition-[flex] duration-700 ease-[var(--ease)] hover:flex-[2.4] motion-reduce:transition-none"
                style={{
                  background: color,
                }}
              >
                <span
                  className="meta absolute bottom-2 start-2 opacity-0 mix-blend-difference transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    color: "#fff",
                  }}
                >
                  {color}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {rest.length > 0 && (
        <div className="grid gap-24 pb-32 sm:gap-36">
          {rest.map((block, index) => {
            const BlockComponent = blocks[block.type];

            if (!BlockComponent) {
              return null;
            }

            return (
              <BlockComponent
                key={`${block.type}-${index}`}
                block={block}
                name={name}
              />
            );
          })}
        </div>
      )}

      {hasTestimonial && (
        <section className="border-t border-current/20 px-[var(--pad)] py-20 sm:py-28">
          <div className="mx-auto max-w-4xl">
            <h2 className="meta mb-8 opacity-60">
              {isRTL ? "رأي العميل" : "Client Testimonial"}
            </h2>

            <blockquote className="text-[clamp(1.375rem,2.5vw,2.5rem)] leading-[1.6]">
              {x(project.testimonial)}
            </blockquote>

            {hasContent(project.testimonialAuthor) && (
              <p className="meta mt-8 opacity-70">
                {x(project.testimonialAuthor)} · {x(project.testimonialRole)}
              </p>
            )}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="border-t border-current/20 px-[var(--pad)] py-24">
          <h2 className="meta mb-10 opacity-60">
            {t("common.related")}
          </h2>

          <div className="grid gap-10 md:grid-cols-3">
            {related.map((relatedProject) => (
              <ProjectPreview
                key={relatedProject.slug}
                project={relatedProject}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
