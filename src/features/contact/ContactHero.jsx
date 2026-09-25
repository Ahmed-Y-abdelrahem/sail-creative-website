"use client";
import Image from "next/image";
import RevealText from "@/components/ui/RevealText";
import { useLocale } from "@/components/shared/LocaleProvider";
import { site } from "@/data/site";

export default function ContactHero({ children }) {
  const { t } = useLocale();
  const links = [
    ["footer.instagram", site.social.instagram],
    ["footer.linkedin", site.social.linkedin],
    ["footer.whatsapp", site.social.whatsapp],
  ];
  return (
    <section className="tex-night grain relative overflow-hidden px-[var(--pad)] pb-28 pt-40">
      <Image src="/brand/sail-boat.png" alt="" width={160} height={179} className="absolute end-[7%] top-32 hidden h-24 w-auto sm:block" priority />
      <h1 className="display text-[clamp(3.4rem,12.4vw,16rem)] leading-[0.86]">
        <RevealText text={t("cta.title")} immediate stagger={0.09} />
      </h1>
      <p className="mt-10 max-w-xl text-lg leading-relaxed text-white/75">{t("contact.sub")}</p>

      <div className="mt-20">{children}</div>

      <div className="mt-28 flex flex-wrap items-end justify-between gap-8 border-t border-white/15 pt-8">
        <div>
          <p className="meta opacity-60">{t("contact.direct")}</p>
          <a href={site.website} className="link-line mt-3 inline-block text-2xl" dir="ltr">
            {site.websiteLabel}
          </a>
        </div>
        <ul className="flex flex-wrap gap-x-8 gap-y-2">
          {links.map(([k, url]) => (
            <li key={k}>
              <a href={url} target="_blank" rel="noopener noreferrer" className="link-line text-lg">
                {t(k)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
