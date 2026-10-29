
"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { useLocale } from "@/components/shared/LocaleProvider";
import { services } from "@/data/services";
import { site } from "@/data/site";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 rtl:-scale-x-100"
      aria-hidden="true"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
    </svg>
  );
}

function FormField({
  id,
  label,
  placeholder,
  value,
  onChange,
  multiline = false,
  autoComplete,
}) {
  const inputClass = `
    w-full rounded-xl border border-white/[0.12]
    bg-white/[0.035] px-4 py-3.5
    text-sm leading-relaxed text-white outline-none
    transition-all duration-300
    placeholder:text-white/40
    focus:border-[#FF6A1F]/70
    focus:bg-white/[0.055]
    focus:ring-2 focus:ring-[#FF6A1F]/10
  `;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2.5 block text-xs font-medium text-white/75"
      >
        {label}
      </label>

      {multiline ? (
        <textarea
          id={id}
          rows={4}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={`${inputClass} min-h-[120px] resize-y`}
        />
      ) : (
        <input
          id={id}
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={inputClass}
        />
      )}
    </div>
  );
}

function ServiceOption({ service, selected, onToggle }) {
  const { x } = useLocale();

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      data-cursor="link"
      className={`
        group flex min-h-[62px] w-full items-center
        justify-between gap-3 rounded-xl border
        px-4 py-3 text-start transition-all duration-300
        focus-visible:outline focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-[#FF6A1F]
        ${
          selected
            ? "border-[#FF6A1F] bg-[#FF6A1F]/10"
            : "border-white/[0.10] bg-white/[0.035] hover:border-white/25 hover:bg-white/[0.06]"
        }
      `}
    >
      <span
        className={`text-[13px] font-medium leading-snug transition-colors ${
          selected ? "text-white" : "text-white/75"
        }`}
      >
        {x(service.title)}
      </span>

      <span
        aria-hidden="true"
        className={`
          flex h-6 w-6 shrink-0 items-center
          justify-center rounded-md border transition-all
          ${
            selected
              ? "border-[#FF6A1F] bg-[#FF6A1F] text-[#111D2B]"
              : "border-white/20 text-transparent"
          }
        `}
      >
        <CheckIcon />
      </span>
    </button>
  );
}

export default function BriefBuilder() {
  const { t, x, isRTL } = useLocale();
  const reduceMotion = useReducedMotion();

  const [needs, setNeeds] = useState([]);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [msg, setMsg] = useState("");
  const [copyStatus, setCopyStatus] = useState("idle");

  const animationProps = reduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.2 },
        variants: fadeUp,
      };

  const toggle = (slug) => {
    setNeeds((current) =>
      current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug]
    );
  };

  const text = useMemo(() => {
    const lines = [t("contact.greeting")];

    if (name.trim()) {
      lines.push(
        `${t("contact.fieldName")}: ${name.trim()}`
      );
    }

    if (brand.trim()) {
      lines.push(
        `${t("contact.fieldBrand")}: ${brand.trim()}`
      );
    }

    if (needs.length) {
      const selectedServices = services
        .filter((service) => needs.includes(service.slug))
        .map((service) => x(service.title));

      lines.push(
        `${t("contact.fieldNeeds")}: ${selectedServices.join(" / ")}`
      );
    }

    if (msg.trim()) {
      lines.push(
        `${t("contact.fieldMsg")}: ${msg.trim()}`
      );
    }

    return lines.join("\n");
  }, [needs, name, brand, msg, t, x]);

  const whatsappUrl = useMemo(() => {
    const base = site.social.whatsapp;
    const separator = base.includes("?") ? "&" : "?";

    return `${base}${separator}text=${encodeURIComponent(text)}`;
  }, [text]);

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("success");
    } catch {
      setCopyStatus("error");
    }
  };

  const selectedCount = needs.length;

  return (
    <div className="relative">
      {/* HEADER */}

      <motion.div
        {...animationProps}
        className="mb-8"
      >
        <div className="mb-3 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-[#FF6A1F]"
          />

          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#FF8B53]">
            {x({
              en: "Project Brief",
              ar: "تفاصيل مشروعك",
            })}
          </span>
        </div>

        <h2 className="text-[clamp(1.6rem,2.8vw,2.5rem)] font-semibold leading-tight tracking-[-0.035em] text-white">
          {x({
            en: "Tell us what you have in mind.",
            ar: "احكيلنا عن فكرة مشروعك.",
          })}
        </h2>

        <p className="mt-3 max-w-xl text-sm leading-[1.8] text-white/65">
          {x({
            en: "Choose the services you need, share a few details and start the conversation.",
            ar: "اختار الخدمات اللي محتاجها، واكتب تفاصيل بسيطة، وابدأ التواصل مع فريقنا.",
          })}
        </p>
      </motion.div>

      {/* MAIN GRID */}

      <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-8">
        {/* FORM */}

        <motion.div
          {...animationProps}
          className="rounded-2xl border border-white/[0.10] bg-white/[0.035] p-5 sm:p-7"
        >
          {/* SERVICES */}

          <fieldset>
            <legend className="text-sm font-semibold text-white">
              {t("contact.pick")}
            </legend>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs leading-relaxed text-white/60">
                {x({
                  en: "You can select more than one service.",
                  ar: "تقدر تختار أكتر من خدمة.",
                })}
              </p>

              <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/70">
                {selectedCount}{" "}
                {x({
                  en: "selected",
                  ar: "تم اختيارها",
                })}
              </span>
            </div>

            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {services.map((service) => (
                <ServiceOption
                  key={service.slug}
                  service={service}
                  selected={needs.includes(service.slug)}
                  onToggle={() => toggle(service.slug)}
                />
              ))}
            </div>
          </fieldset>

          {/* DIVIDER */}

          <div className="my-8 h-px bg-white/10" />

          {/* CONTACT DETAILS */}

          <div className="mb-5">
            <h3 className="text-sm font-semibold text-white">
              {x({
                en: "A little about you",
                ar: "خلينا نتعرف عليك",
              })}
            </h3>

            <p className="mt-2 text-xs text-white/60">
              {x({
                en: "Just the essentials to get started.",
                ar: "بيانات بسيطة علشان نبدأ.",
              })}
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              id="brief-name"
              label={t("contact.name")}
              placeholder={x({
                en: "Your full name",
                ar: "اسمك بالكامل",
              })}
              value={name}
              onChange={setName}
              autoComplete="name"
            />

            <FormField
              id="brief-brand"
              label={t("contact.brand")}
              placeholder={x({
                en: "Company or brand name",
                ar: "اسم الشركة أو العلامة التجارية",
              })}
              value={brand}
              onChange={setBrand}
              autoComplete="organization"
            />
          </div>

          <div className="mt-5">
            <FormField
              id="brief-msg"
              label={t("contact.msg")}
              placeholder={x({
                en: "Tell us about your goals, challenges or project idea...",
                ar: "احكيلنا عن أهدافك أو التحديات اللي بتواجهك أو فكرة المشروع...",
              })}
              value={msg}
              onChange={setMsg}
              multiline
            />
          </div>
        </motion.div>

        {/* LIVE PREVIEW */}

        <motion.div
          {...animationProps}
          className="lg:sticky lg:top-24"
        >
          <div className="overflow-hidden rounded-2xl border border-white/[0.12] bg-[#172837]">
            {/* PREVIEW HEADER */}

            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-[#FF6A1F]"
                />

                <span className="text-xs font-semibold text-white/85">
                  {t("contact.preview")}
                </span>
              </div>

              <span className="text-xs uppercase tracking-[0.12em] text-white/60">
                {x({
                  en: "Live Preview",
                  ar: "معاينة مباشرة",
                })}
              </span>
            </div>

            {/* MESSAGE */}

            <div className="p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF6A1F]/15 text-sm font-bold text-[#FF8B53]"
                >
                  S
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    SAIL Creative
                  </p>

                  <p className="mt-0.5 text-xs text-white/60">
                    {x({
                      en: "New project inquiry",
                      ar: "استفسار عن مشروع جديد",
                    })}
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-white/[0.045] p-4">
                <pre
                  dir={isRTL ? "rtl" : "ltr"}
                  className="min-h-[130px] whitespace-pre-wrap break-words font-[inherit] text-[13px] leading-[1.9] text-white/80"
                >
                  {text}
                </pre>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-white/60">
                {x({
                  en: "Your message updates automatically as you complete the brief.",
                  ar: "الرسالة بتتحدث تلقائيًا مع كل معلومة بتضيفها.",
                })}
              </p>

              {/* SEND BUTTON */}

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="group mt-7 flex min-h-11 w-full items-center justify-center gap-3 rounded-xl bg-[#FF6A1F] px-5 py-4 text-sm font-semibold text-[#111D2B] transition-all duration-300 hover:bg-[#FF874A] hover:shadow-[0_10px_30px_rgba(255,106,31,0.15)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {t("contact.send")}

                <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                  <ArrowIcon />
                </span>
              </a>

              {/* COPY BUTTON */}

              <button
                type="button"
                onClick={copyMessage}
                data-cursor="link"
                className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.12] px-5 py-3.5 text-xs font-medium text-white/80 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.05] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6A1F]"
              >
                {copyStatus === "success" ? (
                  <CheckIcon />
                ) : (
                  <CopyIcon />
                )}

                {copyStatus === "success"
                  ? t("contact.copied")
                  : t("contact.copy")}
              </button>

              <p
                role="status"
                aria-live="polite"
                className={`mt-3 text-center text-xs ${
                  copyStatus === "error"
                    ? "text-[#FFB28C]"
                    : "text-white/70"
                }`}
              >
                {copyStatus === "error"
                  ? x({
                      en: "Copy failed. Please select and copy the message manually.",
                      ar: "تعذّر نسخ الرسالة. من فضلك حدّد النص وانسخه يدويًا.",
                    })
                  : copyStatus === "success"
                    ? t("contact.copied")
                    : ""}
              </p>
            </div>
          </div>

          {/* PRIVACY NOTE */}

          <p className="mt-4 px-2 text-center text-xs leading-relaxed text-white/60">
            {x({
              en: "No account required on this website. Your brief opens in WhatsApp, where you can review and send it.",
              ar: "مش محتاج تعمل حساب على الموقع. تفاصيل مشروعك هتتفتح في واتساب علشان تراجعها وتبعتها.",
            })}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
