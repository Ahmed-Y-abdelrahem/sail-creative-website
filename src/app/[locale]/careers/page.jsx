
"use client";

import { useState } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { site } from "@/data/site";

const content = {
  ar: {
    eyebrow: "انضم إلى فريق سيل",
    title: "اصنع مستقبلك معنا.",
    description:
      "كل فكرة عظيمة بتبدأ بشخص شغوف. سواء بتدور على فرصة عمل أو تدريب عملي، يسعدنا نتعرف عليك وعلى مهاراتك.",
    career: "الوظائف",
    internship: "التدريب",
    careerDescription:
      "حابب تطور مسارك المهني وتشارك في مشاريع إبداعية؟ ابعتلنا معلوماتك وأعمالك.",
    internshipDescription:
      "لسه في بداية الطريق؟ شاركنا اهتماماتك ومهاراتك علشان نتعرف عليك.",
    fieldsTitle: "مجالات تقدر تقدم فيها",
    fieldsDescription:
      "المجالات دي للتقديم العام، ومش معناها إن فيه وظيفة شاغرة حاليًا في كل مجال.",
    areas: [
      "التسويق الرقمي والإعلانات",
      "التصميم الجرافيكي والهوية",
      "صناعة المحتوى والسوشيال ميديا",
      "التصوير وإنتاج الفيديو",
      "تنظيم الفعاليات",
      "تطوير المواقع والبرمجيات",
      "إدارة المشاريع وخدمة العملاء",
      "مجال آخر",
    ],
    formTitle: "عرّفنا بنفسك.",
    formDescription:
      "املأ البيانات، وهنجهزلك رسالة تقدر تنسخها وترسلها لفريق سيل عبر واتساب.",
    name: "الاسم بالكامل",
    email: "البريد الإلكتروني",
    phone: "رقم الجوال",
    area: "المجال المهني",
    choose: "اختر المجال",
    portfolio: "رابط السيرة الذاتية أو معرض الأعمال",
    portfolioHint:
      "ممكن تضيف رابط Google Drive أو LinkedIn أو Behance. اتأكد إن الرابط متاح للمشاهدة.",
    about: "احكيلنا عن نفسك",
    aboutPlaceholder:
      "خبراتك، مهاراتك، اهتماماتك، وليه حابب تنضم لسيل...",
    prepare: "تجهيز طلب التقديم",
    preview: "رسالتك جاهزة",
    copy: "نسخ الرسالة",
    copied: "تم نسخ الرسالة",
    copyFailed: "تعذّر النسخ. حدّد الرسالة وانسخها يدويًا.",
    whatsapp: "فتح واتساب الشركة",
    whatsappNote:
      "بعد فتح واتساب، الصق الرسالة واضغط إرسال بنفسك. فتح واتساب لا يعني إن الطلب اتبعت.",
    required: "من فضلك املأ الاسم والإيميل ورقم الجوال والمجال.",
    emailError: "من فضلك اكتب بريدًا إلكترونيًا صحيحًا.",
    note:
      "التقديم العام لا يُعد إعلانًا عن وظيفة متاحة أو ضمانًا للقبول. تواصل الشركة مع المتقدمين حسب احتياجاتها.",
    typeLabel: "نوع التقديم",
    messageHeading: "طلب انضمام جديد إلى SAIL Creative",
    footer: "Your next chapter starts here.",
  },
  en: {
    eyebrow: "JOIN SAIL CREATIVE",
    title: "Build what comes next.",
    description:
      "Great ideas start with passionate people. Whether you're looking for a career opportunity or practical training, we'd love to learn about you.",
    career: "Careers",
    internship: "Internships",
    careerDescription:
      "Looking to grow your career and contribute to creative projects? Share your experience and work with us.",
    internshipDescription:
      "Just starting your journey? Tell us about your interests and skills.",
    fieldsTitle: "Areas of interest",
    fieldsDescription:
      "These are general application areas and do not indicate currently available vacancies.",
    areas: [
      "Digital Marketing & Advertising",
      "Graphic Design & Branding",
      "Content & Social Media",
      "Photography & Video Production",
      "Event Management",
      "Web & Software Development",
      "Project Management & Client Services",
      "Other",
    ],
    formTitle: "Tell us about yourself.",
    formDescription:
      "Complete the details below to prepare a message you can copy and send to SAIL via WhatsApp.",
    name: "Full name",
    email: "Email address",
    phone: "Mobile number",
    area: "Professional field",
    choose: "Choose a field",
    portfolio: "CV or portfolio link",
    portfolioHint:
      "You can share a Google Drive, LinkedIn or Behance link. Make sure it is accessible.",
    about: "Tell us about yourself",
    aboutPlaceholder:
      "Your experience, skills, interests and why you'd like to join SAIL...",
    prepare: "Prepare application",
    preview: "Your message is ready",
    copy: "Copy message",
    copied: "Message copied",
    copyFailed: "Copy failed. Please select and copy the message manually.",
    whatsapp: "Open company WhatsApp",
    whatsappNote:
      "Paste the message into WhatsApp and press Send yourself. Opening WhatsApp does not submit your application.",
    required: "Please enter your name, email, phone number and field.",
    emailError: "Please enter a valid email address.",
    note:
      "General applications do not represent advertised vacancies or guarantee acceptance. Applicants may be contacted based on business needs.",
    typeLabel: "Application type",
    messageHeading: "New application to SAIL Creative",
    footer: "Your next chapter starts here.",
  },
};

const initialForm = {
  name: "",
  email: "",
  phone: "",
  area: "",
  portfolio: "",
  about: "",
};

function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-white/85">
        {label}
      </span>
      {children}
      {hint && (
        <span className="mt-2 block text-xs leading-6 text-white/55">
          {hint}
        </span>
      )}
    </label>
  );
}

const inputClass =
  "min-h-12 w-full rounded-xl border border-white/15 bg-white/[0.045] px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#FF6A1F] focus:ring-2 focus:ring-[#FF6A1F]/20";

export default function CareersPage() {
  const { isRTL } = useLocale();
  const c = isRTL ? content.ar : content.en;

  const [type, setType] = useState("career");
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setMessage("");
    setError("");
    setCopyStatus("");
  };

  const prepareApplication = (event) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.area
    ) {
      setError(c.required);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError(c.emailError);
      return;
    }

    const selectedArea = c.areas[Number(form.area)];

    const lines = [
      c.messageHeading,
      "",
      `${c.typeLabel}: ${
        type === "career" ? c.career : c.internship
      }`,
      `${c.name}: ${form.name.trim()}`,
      `${c.email}: ${form.email.trim()}`,
      `${c.phone}: ${form.phone.trim()}`,
      `${c.area}: ${selectedArea}`,
    ];

    if (form.portfolio.trim()) {
      lines.push(`${c.portfolio}: ${form.portfolio.trim()}`);
    }

    if (form.about.trim()) {
      lines.push(`${c.about}: ${form.about.trim()}`);
    }

    setMessage(lines.join("\n"));
    setError("");
    setCopyStatus("");
  };

  const copyApplication = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopyStatus("success");
    } catch {
      setCopyStatus("error");
    }
  };

  return (
    <main
      dir={isRTL ? "rtl" : "ltr"}
      className="min-h-screen bg-[#101C2A] text-white"
    >
      {/* HERO */}
      <section className="relative overflow-hidden px-[var(--pad)] pb-20 pt-36 sm:pt-44">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 80% 20%, rgba(255,106,31,.11), transparent 42%), radial-gradient(ellipse at 10% 85%, rgba(0,133,132,.18), transparent 48%)",
          }}
        />

        <div className="relative mx-auto max-w-[1440px]">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#FF6A1F]" />
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FF985F]">
              {c.eyebrow}
            </span>
          </div>

          <h1 className="display max-w-4xl text-[clamp(2.8rem,7vw,7rem)] leading-[1.08] tracking-[-0.04em]">
            {c.title}
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-[2] text-white/65 sm:text-lg">
            {c.description}
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {[
              {
                id: "career",
                title: c.career,
                description: c.careerDescription,
                number: "01",
              },
              {
                id: "internship",
                title: c.internship,
                description: c.internshipDescription,
                number: "02",
              },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setType(item.id);
                  setMessage("");
                  setCopyStatus("");
                }}
                aria-pressed={type === item.id}
                className={`min-h-[150px] rounded-2xl border p-6 text-start transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6A1F] ${
                  type === item.id
                    ? "border-[#FF6A1F] bg-[#FF6A1F]/10"
                    : "border-white/15 bg-white/[0.035] hover:border-white/40"
                }`}
              >
                <span className="text-xs text-[#FF985F]">
                  {item.number}
                </span>
                <h2 className="mt-4 text-2xl font-semibold">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-white/60">
                  {item.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* AREAS */}
      <section className="border-y border-white/10 bg-[#0D1B25] px-[var(--pad)] py-20">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="display text-[clamp(2rem,4vw,3.8rem)]">
            {c.fieldsTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-8 text-white/60">
            {c.fieldsDescription}
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {c.areas.map((area, index) => (
              <div
                key={index}
                className="flex min-h-[125px] flex-col justify-between rounded-xl border border-white/10 bg-white/[0.035] p-5"
              >
                <span className="text-xs text-[#FF874A]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-sm font-medium leading-6">
                  {area}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION */}
      <section
        id="apply"
        className="scroll-mt-24 px-[var(--pad)] py-20 sm:py-28"
      >
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FF985F]">
              SAIL / APPLY
            </span>

            <h2 className="display mt-5 text-[clamp(2rem,4vw,4rem)] leading-[1.15]">
              {c.formTitle}
            </h2>

            <p className="mt-5 max-w-md text-sm leading-8 text-white/65">
              {c.formDescription}
            </p>

            <p className="mt-8 max-w-md border-s-2 border-[#FF6A1F] ps-4 text-xs leading-7 text-white/55">
              {c.note}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#172837] p-5 sm:p-8">
            <form onSubmit={prepareApplication} className="space-y-5">
              <fieldset>
                <legend className="mb-3 text-sm font-medium">
                  {c.typeLabel}
                </legend>
                <div className="flex flex-wrap gap-3">
                  {[
                    ["career", c.career],
                    ["internship", c.internship],
                  ].map(([value, label]) => (
                    <label
                      key={value}
                      className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm ${
                        type === value
                          ? "border-[#FF6A1F] bg-[#FF6A1F]/10"
                          : "border-white/20"
                      }`}
                    >
                      <input
                        type="radio"
                        name="application-type"
                        value={value}
                        checked={type === value}
                        onChange={() => {
                          setType(value);
                          setMessage("");
                        }}
                        className="accent-[#FF6A1F]"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={c.name}>
                  <input
                    className={inputClass}
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                  />
                </Field>

                <Field label={c.email}>
                  <input
                    className={inputClass}
                    required
                    type="email"
                    autoComplete="email"
                    dir="ltr"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                  />
                </Field>

                <Field label={c.phone}>
                  <input
                    className={inputClass}
                    required
                    type="tel"
                    autoComplete="tel"
                    dir="ltr"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                  />
                </Field>

                <Field label={c.area}>
                  <select
                    className={inputClass}
                    required
                    value={form.area}
                    onChange={(e) => update("area", e.target.value)}
                  >
                    <option value="" className="bg-[#172837]">
                      {c.choose}
                    </option>
                    {c.areas.map((area, index) => (
                      <option
                        key={index}
                        value={String(index)}
                        className="bg-[#172837]"
                      >
                        {area}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field
                label={c.portfolio}
                hint={c.portfolioHint}
              >
                <input
                  className={inputClass}
                  type="url"
                  placeholder="https://"
                  dir="ltr"
                  value={form.portfolio}
                  onChange={(e) => update("portfolio", e.target.value)}
                />
              </Field>

              <Field label={c.about}>
                <textarea
                  className={`${inputClass} min-h-[145px] resize-y`}
                  rows={5}
                  placeholder={c.aboutPlaceholder}
                  value={form.about}
                  onChange={(e) => update("about", e.target.value)}
                />
              </Field>

              {error && (
                <p role="alert" className="text-sm text-[#FFB28C]">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="flex min-h-12 w-full items-center justify-center rounded-xl bg-[#FF6A1F] px-6 py-3 text-sm font-semibold text-[#101C2A] transition-colors hover:bg-[#FF874A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {c.prepare}
              </button>
            </form>

            {message && (
              <div className="mt-8 border-t border-white/10 pt-7">
                <h3 className="text-lg font-semibold">
                  {c.preview}
                </h3>

                <pre
                  dir={isRTL ? "rtl" : "ltr"}
                  className="mt-4 whitespace-pre-wrap break-words rounded-xl border border-white/10 bg-[#101C2A] p-4 font-[inherit] text-sm leading-8 text-white/80"
                >
                  {message}
                </pre>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={copyApplication}
                    className="min-h-12 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold hover:border-[#FF6A1F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6A1F]"
                  >
                    {copyStatus === "success"
                      ? c.copied
                      : c.copy}
                  </button>

                  <a
                    href={site.social.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-12 items-center justify-center rounded-xl bg-[#FF6A1F] px-5 py-3 text-center text-sm font-semibold text-[#101C2A] hover:bg-[#FF874A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {c.whatsapp}
                  </a>
                </div>

                <p
                  role="status"
                  aria-live="polite"
                  className="mt-3 text-xs text-white/70"
                >
                  {copyStatus === "error" ? c.copyFailed : ""}
                </p>

                <p className="mt-4 text-xs leading-7 text-white/60">
                  {c.whatsappNote}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="border-t border-white/10 px-[var(--pad)] py-10 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-white/45">
          {c.footer}
        </p>
      </div>
    </main>
  );
}
