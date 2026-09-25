"use client";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import RevealText from "@/components/ui/RevealText";
import Arrow from "@/components/ui/Arrow";
import { useLocale } from "@/components/shared/LocaleProvider";
import { services } from "@/data/services";
import { site } from "@/data/site";

const Field = ({ id, label, children }) => (
  <div>
    <label htmlFor={id} className="meta block opacity-60">
      {label}
    </label>
    {children}
  </div>
);

const inputCls =
  "mt-2 w-full border-b border-white/30 bg-transparent py-3 text-xl outline-none transition-colors duration-300 placeholder:text-white/25 focus:border-orange";

/**
 * A brief that writes itself: pick what you need, add a few words, and it opens in WhatsApp
 * (or copies to the clipboard). No backend, nothing stored.
 */
export default function BriefBuilder() {
  const { t, x, isRTL } = useLocale();
  const [needs, setNeeds] = useState([]);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [msg, setMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const toggle = (slug) => setNeeds((n) => (n.includes(slug) ? n.filter((s) => s !== slug) : [...n, slug]));

  const text = useMemo(() => {
    const lines = [t("contact.greeting")];
    if (name) lines.push(`${t("contact.fieldName")}: ${name}`);
    if (brand) lines.push(`${t("contact.fieldBrand")}: ${brand}`);
    if (needs.length) lines.push(`${t("contact.fieldNeeds")}: ${needs.map((s) => x(services.find((v) => v.slug === s).title)).join(" / ")}`);
    if (msg) lines.push(`${t("contact.fieldMsg")}: ${msg}`);
    return lines.join("\n");
  }, [needs, name, brand, msg, t, x]);

  const wa = `${site.social.whatsapp}&text=${encodeURIComponent(text)}`;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {}
  };

  return (
    <div className="grid gap-16 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <fieldset>
          <legend className="meta opacity-60">{t("contact.pick")}</legend>
          <div className="mt-5 flex flex-wrap gap-x-3 gap-y-3">
            {services.map((s) => {
              const on = needs.includes(s.slug);
              return (
                <button
                  key={s.slug}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(s.slug)}
                  data-cursor="link"
                  className={`group relative overflow-hidden border px-5 py-3 text-lg transition-colors duration-300 ${on ? "border-orange bg-orange text-night" : "border-white/30 hover:border-white"}`}
                >
                  {x(s.title)}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          <Field id="brief-name" label={t("contact.name")}>
            <input id="brief-name" className={inputCls} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          </Field>
          <Field id="brief-brand" label={t("contact.brand")}>
            <input id="brief-brand" className={inputCls} value={brand} onChange={(e) => setBrand(e.target.value)} autoComplete="organization" />
          </Field>
        </div>
        <div className="mt-10">
          <Field id="brief-msg" label={t("contact.msg")}>
            <textarea id="brief-msg" rows={3} className={`${inputCls} resize-none`} value={msg} onChange={(e) => setMsg(e.target.value)} />
          </Field>
        </div>
      </div>

      <div className="lg:col-span-5">
        <p className="meta opacity-60">{t("contact.preview")}</p>
        <pre className="mt-4 min-h-[9rem] whitespace-pre-wrap border-s-2 border-orange ps-5 font-[inherit] text-lg leading-relaxed text-white/85" dir={isRTL ? "rtl" : "ltr"} aria-live="polite">
          {text}
        </pre>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Button href={wa} external>
            {t("contact.send")}
          </Button>
          <button type="button" onClick={copy} data-cursor="link" className="link-line meta">
            {copied ? t("contact.copied") : t("contact.copy")}
          </button>
        </div>
      </div>
    </div>
  );
}
