"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import FilmStrip from "@/components/shared/FilmStrip";
import { M } from "@/data/media";
import { eventJourney } from "@/data/site";
import { useLocale } from "@/components/shared/LocaleProvider";
import { ease } from "@/lib/motion";

const enter = (i = 0, from = "up") => ({
  initial: { opacity: 0, y: from === "up" ? 60 : 0, x: from === "left" ? -60 : from === "right" ? 60 : 0 },
  whileInView: { opacity: 1, y: 0, x: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { duration: 1.1, ease, delay: i * 0.12 },
});

const Pic = ({ img, alt = "", sizes = "30vw", className = "" }) => (
  <Image src={img.src} alt={alt} width={img.w} height={img.h} sizes={sizes} className={`h-auto w-full ${className}`} />
);

/** Identity boards layered like a moodboard on a table. */
export function BrandingVisual() {
  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-[38rem]">
      <motion.div {...enter(0, "left")} className="absolute start-0 top-[6%] w-[58%] rotate-[-3deg] shadow-[0_40px_70px_-30px_rgba(0,0,0,0.7)]">
        <Pic img={M("tawlead/logo")} alt="Tawlead logo" />
      </motion.div>
      <motion.div {...enter(1, "up")} className="absolute end-[2%] top-0 w-[38%] rotate-[4deg] shadow-[0_40px_70px_-30px_rgba(0,0,0,0.7)]">
        <Pic img={M("frag/manafesh-bag")} alt="Manafesh shopping bag" />
      </motion.div>
      <motion.div {...enter(2, "right")} className="absolute bottom-0 end-[8%] w-[52%] rotate-[-2deg] shadow-[0_40px_70px_-30px_rgba(0,0,0,0.7)]">
        <Pic img={M("frag/we-one-box")} alt="We One eyewear box" />
      </motion.div>
    </div>
  );
}

const Phone = ({ img, alt, className = "", style }) => (
  <motion.div
    {...enter(0, "up")}
    className={`overflow-hidden rounded-[1.6rem] border-[6px] border-ink bg-ink shadow-[0_40px_60px_-30px_rgba(16,27,40,0.5)] ${className}`}
    style={style}
  >
    <div className="relative aspect-[9/17] overflow-hidden rounded-[1.1rem]">
      <Image src={img.src} alt={alt} fill sizes="20vw" className="object-cover object-top" />
    </div>
  </motion.div>
);

/** Vertical formats in phone frames, staggered like a feed in motion. */
export function MarketingVisual() {
  return (
    <div className="mx-auto grid w-full max-w-[34rem] grid-cols-3 items-start gap-4">
      <Phone img={M("namar-door/col1")} alt="Namar Door posts" className="mt-10" />
      <Phone img={M("gerflor/col3")} alt="Gerflor posts" />
      <Phone img={M("enigma/col2")} alt="Enigma posts" className="mt-20" />
    </div>
  );
}

/** Two film rows sliding against each other. */
export function MediaVisual() {
  return (
    <div className="-mx-[var(--pad)] grid gap-2">
      <FilmStrip images={[M("le-gout/top"), M("shavery/top")]} duration={90} cursorLabel="•" />
      <FilmStrip images={[M("88-port/bottom"), M("bistro-catering/bottom")]} duration={110} reverse cursorLabel="•" />
    </div>
  );
}

/** Stacked event frames with the journey underneath. */
export function EventsVisual() {
  const { x } = useLocale();
  return (
    <div className="mx-auto w-full max-w-[40rem]">
      <div className="relative aspect-[16/11]">
        <motion.div {...enter(0, "left")} className="absolute start-0 top-0 w-[78%] shadow-[0_40px_70px_-30px_rgba(0,0,0,0.7)]">
          <Pic img={M("fayya/event-1")} alt="Fayya event" sizes="34vw" />
        </motion.div>
        <motion.div {...enter(1, "right")} className="absolute bottom-0 end-0 w-[68%] shadow-[0_40px_70px_-30px_rgba(0,0,0,0.7)]">
          <Pic img={M("radicon/event-1")} alt="Radicon event" sizes="34vw" />
        </motion.div>
      </div>
      <ol className="mt-8 flex flex-wrap gap-x-4 gap-y-1">
        {eventJourney.map((s, i) => (
          <li key={s.id} className="meta flex items-center gap-4 opacity-80">
            {x(s)}
            {i < eventJourney.length - 1 && <span aria-hidden className="h-px w-4 bg-current opacity-50" />}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Interface frames: a browser window and a phone sharing the same product. */
export function DigitalVisual() {
  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-[38rem]">
      <motion.div {...enter(0, "left")} className="absolute start-0 top-[8%] w-[86%] overflow-hidden rounded-lg border border-ink/20 bg-white shadow-[0_40px_70px_-30px_rgba(16,27,40,0.5)]">
        <div className="flex items-center gap-1.5 border-b border-ink/10 bg-[#f1f3f5] px-3 py-2" aria-hidden>
          <i className="block h-2 w-2 rounded-full bg-ink/20" />
          <i className="block h-2 w-2 rounded-full bg-ink/20" />
          <i className="block h-2 w-2 rounded-full bg-ink/20" />
        </div>
        <Pic img={M("tawlead/billboard")} alt="Tawlead website" sizes="34vw" />
      </motion.div>
      <motion.div {...enter(1, "right")} className="absolute bottom-0 end-0 w-[34%] overflow-hidden rounded-[1.6rem] border-[6px] border-ink bg-ink shadow-[0_40px_70px_-30px_rgba(16,27,40,0.6)]">
        <div className="relative aspect-[9/17] overflow-hidden rounded-[1.1rem]">
          <Image src={M("tawlead/ios").src} alt="Tawlead on iOS" fill sizes="14vw" className="object-cover" />
        </div>
      </motion.div>
    </div>
  );
}

export const visuals = {
  branding: BrandingVisual,
  marketing: MarketingVisual,
  "media-production": MediaVisual,
  "event-management": EventsVisual,
  "digital-solutions": DigitalVisual,
};
