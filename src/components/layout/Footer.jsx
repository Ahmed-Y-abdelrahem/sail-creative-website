import Image from "next/image";
import TransitionLink from "./TransitionLink";
import Marquee from "@/components/ui/Marquee";
import Arrow from "@/components/ui/Arrow";
import { Button } from "@/components/ui/Button";
import BackToTop from "@/components/shared/BackToTop";
import { Container } from "@/components/ui/Section";
import { nav, site } from "@/data/site";
import { t } from "@/data/dictionary";
import { localePath, numerals } from "@/lib/i18n";

export default function Footer({ locale }) {
  const L = (k) => t(locale, k);
  const p = (path) => localePath(locale, path);
  const year = numerals(new Date().getFullYear(), locale);

  return (
    <footer className="tex-night grain relative overflow-hidden text-paper">
      <Marquee duration={70} className="border-y border-white/10 py-6" reverse>
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="display fs-xl outline-text mx-8 inline-flex items-center gap-8 whitespace-nowrap text-white/70">
            {L("cta.sub")}
            <Arrow className="h-[0.7em] w-[0.7em] text-orange" stroke={10} />
          </span>
        ))}
      </Marquee>

      <Container className="grid gap-16 py-24 lg:grid-cols-12 lg:py-32">
        <div className="lg:col-span-8">
          <TransitionLink href={p("/contact")} data-cursor="open" data-cursor-label={L("nav.talk")} className="group block">
            <h2 className="display fs-huge">
              <span className="block">{L("cta.title")}</span>
            </h2>
          </TransitionLink>
        </div>
        <div className="flex flex-col justify-between gap-10 lg:col-span-4">
          <p className="max-w-sm text-lg leading-relaxed text-white/75">{L("cta.body")}</p>
          <div>
            <Button href={p("/contact")}>{L("cta.button")}</Button>
          </div>
        </div>
      </Container>

      <Container className="grid gap-12 border-t border-white/10 py-14 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Image src="/brand/sail-boat.png" alt="" width={160} height={179} className="mb-6 h-16 w-auto opacity-90" />
          <p className="meta opacity-60">{L("hero.location")}</p>
          <a href={site.website} className="link-line mt-2 inline-block text-lg" dir="ltr">
            {site.websiteLabel}
          </a>
        </div>
        <nav aria-label="Footer" className="lg:col-span-4">
          <p className="meta mb-5 opacity-50">{L("footer.explore")}</p>
          <ul className="grid gap-3">
            {nav.map((n) => (
              <li key={n.key}>
                <TransitionLink href={p(n.href)} className="link-line text-lg">
                  {L(`nav.${n.key}`)}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="lg:col-span-4">
          <p className="meta mb-5 opacity-50">{L("footer.social")}</p>
          <ul className="grid gap-3">
            {[
              ["instagram", site.social.instagram],
              ["linkedin", site.social.linkedin],
              ["whatsapp", site.social.whatsapp],
            ].map(([k, url]) => (
              <li key={k}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="link-line text-lg">
                  {L(`footer.${k}`)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div aria-hidden className="pointer-events-none relative -mb-[4vw] select-none px-[var(--pad)]">
        <Image
          src="/brand/sail-wordmark.png"
          alt=""
          width={927}
          height={296}
          sizes="100vw"
          className="mx-auto h-auto w-full opacity-[0.07]"
        />
      </div>

      <Container className="relative flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-6">
        <p className="meta opacity-60">
          © {year} SAIL Creative. {L("footer.rights")}
        </p>
        <BackToTop label={L("common.top")} />
      </Container>
    </footer>
  );
}
