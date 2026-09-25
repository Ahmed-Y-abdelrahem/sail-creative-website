"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import HeroField from "./HeroField";
import RevealText from "@/components/ui/RevealText";
import Arrow from "@/components/ui/Arrow";
import { Button, Magnetic } from "@/components/ui/Button";
import TransitionLink from "@/components/layout/TransitionLink";
import { useLocale } from "@/components/shared/LocaleProvider";
import { useIntro } from "@/components/shared/IntroProvider";
import { useFinePointer } from "@/hooks/useMediaQuery";
import { M } from "@/data/media";
import { ease } from "@/lib/motion";

// Real portfolio fragments that drift with the pointer. depth = parallax strength.
const fragments = [
  { slug: "tawlead", img: M("tawlead/phones"), alt: "Tawlead app and billboard", className: "end-[6%] top-[16%] w-[15vw] min-w-[9rem] max-w-[17rem]", depth: 1, delay: 1.5 },
  { slug: "manafesh", img: M("frag/manafesh-bag"), alt: "Manafesh shopping bag", className: "end-[26%] top-[46%] w-[11vw] min-w-[7rem] max-w-[13rem] hidden md:block", depth: 1.8, delay: 1.65 },
  { slug: "shavery", img: M("frag/shavery-logo"), alt: "Shavery & Co. logo", className: "end-[4%] top-[57%] w-[17vw] min-w-[9rem] max-w-[19rem]", depth: 0.6, delay: 1.8 },
  { slug: "tricycle", img: M("tricycle/col2"), alt: "Tricycle social posts", className: "end-[30%] top-[12%] w-[9vw] min-w-[6rem] max-w-[11rem] hidden lg:block", depth: 2.2, delay: 1.95 },
  { slug: "fayya", img: M("frag/fayya-envelopes"), alt: "Fayya stationery", className: "end-[18%] top-[70%] w-[13vw] min-w-[8rem] max-w-[15rem] hidden lg:block", depth: 1.3, delay: 2.1 },
];

function Fragment({ f, px, py, ready }) {
  const { href, t } = useLocale();
  const x = useTransform(px, [-0.5, 0.5], [-28 * f.depth, 28 * f.depth]);
  const y = useTransform(py, [-0.5, 0.5], [-20 * f.depth, 20 * f.depth]);
  return (
    <motion.div className={`absolute ${f.className}`} style={{ x, y }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.86, y: 30 }}
        animate={ready ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease, delay: f.delay - 1.25 }}
      >
        <TransitionLink
          href={href(`/work/${f.slug}`)}
          data-cursor="view"
          data-cursor-label={t("cursor.view")}
          className="block overflow-hidden shadow-[0_30px_60px_-24px_rgba(0,0,0,0.7)]"
          tabIndex={-1}
          aria-label={f.alt}
        >
          <Image src={f.img.src} alt={f.alt} width={f.img.w} height={f.img.h} sizes="17vw" className="h-auto w-full" />
        </TransitionLink>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const { t, href } = useLocale();
  const { ready } = useIntro();
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const wrapRef = useRef(null);
  const arrowRef = useRef(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const angle = useMotionValue(0);
  const spring = useSpring(angle, { stiffness: 90, damping: 14, mass: 0.6 });

  useEffect(() => {
    if (!fine || reduce) return;
    const move = (e) => {
      const r = wrapRef.current?.getBoundingClientRect();
      if (!r || r.bottom < 0) return;
      px.set((e.clientX - r.left) / r.width - 0.5);
      py.set((e.clientY - r.top) / r.height - 0.5);
      const a = arrowRef.current?.getBoundingClientRect();
      if (!a) return;
      const cx = a.left + a.width / 2;
      const cy = a.top + a.height / 2;
      const target = (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI + 45; // svg points up-right (-45°)
      const cur = angle.get();
      let d = ((target - cur + 540) % 360) - 180;
      angle.set(cur + d);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [fine, reduce, px, py, angle]);

  return (
    <section ref={wrapRef} className="tex-night grain relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden">
      <HeroField className="absolute inset-0 -z-10" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_20%_110%,rgba(18,165,148,0.28),transparent_55%),radial-gradient(ellipse_at_90%_-10%,rgba(255,106,31,0.14),transparent_45%)]" />

      {fine &&
        fragments.map((f) => <Fragment key={f.slug} f={f} px={px} py={py} ready={ready} />)}
      {!fine && (
        <div className="pointer-events-none absolute end-[-6%] top-[18%] w-[38vw] opacity-80" aria-hidden>
          <Image src={fragments[0].img.src} alt="" width={fragments[0].img.w} height={fragments[0].img.h} sizes="40vw" className="h-auto w-full" />
        </div>
      )}

      <div className="relative z-10 flex items-start justify-between px-[var(--pad)] pt-28 sm:pt-32">
        <motion.p
          className="meta max-w-[14rem] leading-relaxed opacity-80"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 0.8 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {t("hero.kicker")}
          <br />
          <span className="opacity-70">{t("hero.location")}</span>
        </motion.p>
      </div>

      <div className="relative z-10 px-[var(--pad)]">
        <h1 className="display leading-[0.84] text-[clamp(4.4rem,13.4vw,17rem)]">
          <RevealText as="span" text={t("hero.line1")} immediate active={ready} className="block" />
          <span className="flex items-start gap-[0.06em]">
            <RevealText as="span" text={t("hero.line2")} immediate active={ready} delay={0.12} className="outline-text block" />
            <motion.span
              ref={arrowRef}
              className="pointer-events-none mt-[0.06em] hidden h-[0.5em] w-[0.5em] shrink-0 text-orange sm:block"
              style={{ rotate: fine && !reduce ? spring : 0 }}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={ready ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, ease, delay: 0.7 }}
              aria-hidden
            >
              <Arrow className="h-full w-full" stroke={14} />
            </motion.span>
          </span>
        </h1>
      </div>

      <div className="relative z-10 flex flex-wrap items-end justify-between gap-8 px-[var(--pad)] pb-10 pt-14">
        <motion.p
          className="max-w-md text-[1.0625rem] leading-relaxed text-white/80"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease, delay: 0.9 }}
        >
          {t("hero.sub")}
        </motion.p>

        <motion.div
          className="flex items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease, delay: 1.05 }}
        >
          <Magnetic>
            <Button href={href("/work")}>{t("hero.cta")}</Button>
          </Magnetic>
          <div className="hidden items-center gap-4 sm:flex">
            <span className="meta opacity-70">{t("hero.since")}</span>
            <span className="relative block h-12 w-px overflow-hidden bg-white/20" aria-hidden>
              <motion.span
                className="absolute inset-x-0 top-0 h-1/2 bg-orange"
                animate={reduce ? {} : { y: ["-100%", "200%"] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
