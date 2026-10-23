"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { M } from "@/data/media";
import { eventJourney } from "@/data/site";
import { useLocale } from "@/components/shared/LocaleProvider";
import { ease } from "@/lib/motion";

/* ==========================================
   SHARED ANIMATION
========================================== */

const enter = (i = 0, from = "up") => ({
  initial: {
    opacity: 0,
    y: from === "up" ? 60 : 0,
    x: from === "left" ? -60 : from === "right" ? 60 : 0,
  },
  whileInView: {
    opacity: 1,
    y: 0,
    x: 0,
  },
  viewport: {
    once: true,
    margin: "-10% 0px",
  },
  transition: {
    duration: 1.1,
    ease,
    delay: i * 0.12,
  },
});

/* ==========================================
   SHARED COMPONENTS
========================================== */

function Pic({
  img,
  alt = "",
  sizes = "30vw",
  className = "",
}) {
  return (
    <Image
      src={img.src}
      alt={alt}
      width={img.w}
      height={img.h}
      sizes={sizes}
      className={`h-auto w-full ${className}`}
    />
  );
}

function VisualCard({
  src,
  alt,
  className = "",
  delay = 0,
  direction = "up",
  light = false,
}) {
  return (
    <motion.div
      {...enter(delay, direction)}
      className={`absolute overflow-hidden rounded-xl border shadow-[0_35px_70px_-25px_rgba(0,0,0,0.45)] ${
        light
          ? "border-[#101B29]/10 bg-white"
          : "border-white/10 bg-[#142535]"
      } ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 70vw, 35vw"
        className="object-cover"
      />
    </motion.div>
  );
}

/* ==========================================
   01 — BRANDING
========================================== */

export function BrandingVisual() {
  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-[38rem]">
      <motion.div
        {...enter(0, "left")}
        className="absolute start-0 top-[6%] w-[58%] rotate-[-3deg] shadow-[0_40px_70px_-30px_rgba(0,0,0,0.7)]"
      >
        <Pic
          img={M("tawlead/logo")}
          alt="Tawlead logo"
        />
      </motion.div>

      <motion.div
        {...enter(1, "up")}
        className="absolute end-[2%] top-0 w-[38%] rotate-[4deg] shadow-[0_40px_70px_-30px_rgba(0,0,0,0.7)]"
      >
        <Pic
          img={M("frag/manafesh-bag")}
          alt="Manafesh shopping bag"
        />
      </motion.div>

      <motion.div
        {...enter(2, "right")}
        className="absolute bottom-0 end-[8%] w-[52%] rotate-[-2deg] shadow-[0_40px_70px_-30px_rgba(0,0,0,0.7)]"
      >
        <Pic
          img={M("frag/we-one-box")}
          alt="We One eyewear box"
        />
      </motion.div>
    </div>
  );
}

/* ==========================================
   02 — MARKETING
========================================== */

function Phone({ img, alt, className = "" }) {
  return (
    <motion.div
      {...enter(0, "up")}
      className={`overflow-hidden rounded-[1.6rem] border-[6px] border-ink bg-ink shadow-[0_40px_60px_-30px_rgba(16,27,40,0.5)] ${className}`}
    >
      <div className="relative aspect-[9/17] overflow-hidden rounded-[1.1rem]">
        <Image
          src={img.src}
          alt={alt}
          fill
          sizes="20vw"
          className="object-cover object-top"
        />
      </div>
    </motion.div>
  );
}

export function MarketingVisual() {
  return (
    <div className="mx-auto grid w-full max-w-[34rem] grid-cols-3 items-start gap-4">
      <Phone
        img={M("namar-door/col1")}
        alt="Namar Door posts"
        className="mt-10"
      />

      <Phone
        img={M("gerflor/col3")}
        alt="Gerflor posts"
      />

      <Phone
        img={M("enigma/col2")}
        alt="Enigma posts"
        className="mt-20"
      />
    </div>
  );
}

/* ==========================================
   03 — MEDIA PRODUCTION
========================================== */

function MediaFrame({
  img,
  alt,
  className = "",
  delay = 0,
  direction = "up",
}) {
  return (
    <motion.div
      {...enter(delay, direction)}
      className={`absolute overflow-hidden rounded-md border border-white/10 bg-[#142535] shadow-[0_25px_65px_-20px_rgba(0,0,0,0.65)] ${className}`}
    >
      <Image
        src={img.src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 45vw, 25vw"
        className="object-cover"
      />
    </motion.div>
  );
}

export function MediaVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[38rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[12%] rounded-full blur-[65px]"
        style={{
          background:
            "radial-gradient(circle, rgba(10,90,96,0.22), transparent 70%)",
        }}
      />

      <div className="relative aspect-[5/4] w-full">
        <MediaFrame
          img={M("le-gout/top")}
          alt="Le Goût media production"
          className="start-[2%] top-[4%] z-10 h-[43%] w-[55%] rotate-[-4deg]"
          direction="left"
        />

        <MediaFrame
          img={M("shavery/top")}
          alt="Shavery media production"
          className="end-[1%] top-[12%] z-20 h-[48%] w-[47%] rotate-[5deg]"
          delay={1}
          direction="right"
        />

        <MediaFrame
          img={M("88-port/bottom")}
          alt="88 Port media production"
          className="bottom-[5%] start-[8%] z-30 h-[43%] w-[48%] rotate-[3deg]"
          delay={2}
        />

        <MediaFrame
          img={M("bistro-catering/bottom")}
          alt="Bistro Catering media production"
          className="bottom-[1%] end-[4%] z-40 h-[38%] w-[45%] rotate-[-4deg]"
          delay={3}
        />
      </div>

      <div
        aria-hidden="true"
        className="mt-5 flex items-center justify-center gap-2 opacity-35"
      >
        {Array.from({ length: 11 }).map((_, index) => (
          <span
            key={index}
            className="h-1.5 w-1.5 rounded-full border border-current"
          />
        ))}
      </div>
    </div>
  );
}

/* ==========================================
   04 — EVENT MANAGEMENT
========================================== */

export function EventsVisual() {
  const { x } = useLocale();

  return (
    <div className="mx-auto w-full max-w-[40rem]">
      <div className="relative aspect-[16/11]">
        <motion.div
          {...enter(0, "left")}
          className="absolute start-0 top-0 w-[78%] shadow-[0_40px_70px_-30px_rgba(0,0,0,0.7)]"
        >
          <Pic
            img={M("fayya/event-1")}
            alt="Fayya event"
            sizes="34vw"
          />
        </motion.div>

        <motion.div
          {...enter(1, "right")}
          className="absolute bottom-0 end-0 w-[68%] shadow-[0_40px_70px_-30px_rgba(0,0,0,0.7)]"
        >
          <Pic
            img={M("radicon/event-1")}
            alt="Radicon event"
            sizes="34vw"
          />
        </motion.div>
      </div>

      <ol className="mt-8 flex flex-wrap gap-x-4 gap-y-1">
        {eventJourney.map((step, index) => (
          <li
            key={step.id}
            className="meta flex items-center gap-4 opacity-80"
          >
            {x(step)}

            {index < eventJourney.length - 1 && (
              <span
                aria-hidden="true"
                className="h-px w-4 bg-current opacity-50"
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ==========================================
   05 — DIGITAL SOLUTIONS
========================================== */

export function DigitalVisual() {
  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-[38rem]">
      <motion.div
        {...enter(0, "left")}
        className="absolute start-0 top-[8%] w-[86%] overflow-hidden rounded-lg border border-ink/20 bg-white shadow-[0_40px_70px_-30px_rgba(16,27,40,0.5)]"
      >
        <div
          aria-hidden="true"
          className="flex items-center gap-1.5 border-b border-ink/10 bg-[#f1f3f5] px-3 py-2"
        >
          <i className="block h-2 w-2 rounded-full bg-ink/20" />
          <i className="block h-2 w-2 rounded-full bg-ink/20" />
          <i className="block h-2 w-2 rounded-full bg-ink/20" />
        </div>

        <Pic
          img={M("tawlead/billboard")}
          alt="Tawlead website"
          sizes="34vw"
        />
      </motion.div>

      <motion.div
        {...enter(1, "right")}
        className="absolute bottom-0 end-0 w-[34%] overflow-hidden rounded-[1.6rem] border-[6px] border-ink bg-ink shadow-[0_40px_70px_-30px_rgba(16,27,40,0.6)]"
      >
        <div className="relative aspect-[9/17] overflow-hidden rounded-[1.1rem]">
          <Image
            src={M("tawlead/ios").src}
            alt="Tawlead on iOS"
            fill
            sizes="14vw"
            className="object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}

/* ==========================================
   REUSABLE 3-IMAGE COLLAGE
========================================== */

function ThreeImageCollage({
  images,
  light = false,
  glow = "rgba(10,90,96,0.2)",
}) {
  return (
    <div className="relative mx-auto w-full max-w-[38rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[15%] rounded-full blur-[65px]"
        style={{
          background: `radial-gradient(circle, ${glow}, transparent 70%)`,
        }}
      />

      <div className="relative aspect-[5/4] w-full">
        <VisualCard
          src={images[0].src}
          alt={images[0].alt}
          className="start-[2%] top-[5%] z-10 h-[56%] w-[76%] rotate-[-3deg]"
          delay={0}
          direction="left"
          light={light}
        />

        <VisualCard
          src={images[1].src}
          alt={images[1].alt}
          className="end-[1%] top-[23%] z-20 h-[48%] w-[52%] rotate-[4deg]"
          delay={1}
          direction="right"
          light={light}
        />

        <VisualCard
          src={images[2].src}
          alt={images[2].alt}
          className="bottom-[2%] start-[15%] z-30 h-[48%] w-[38%] rotate-[-4deg]"
          delay={2}
          direction="up"
          light={light}
        />
      </div>
    </div>
  );
}

/* ==========================================
   06 — SOFTWARE DEVELOPMENT
========================================== */

export function SoftwareDevelopmentVisual() {
  return (
    <ThreeImageCollage
      images={[
        {
          src: "/images/software-development/dashboard.png",
          alt: "Software dashboard",
        },
        {
          src: "/images/software-development/web-app.png",
          alt: "Web application",
        },
        {
          src: "/images/software-development/mobile-app.png",
          alt: "Mobile application",
        },
      ]}
      glow="rgba(10,90,96,0.25)"
    />
  );
}

/* ==========================================
   07 — SOFTWARE TESTING & QA
========================================== */

export function SoftwareTestingVisual() {
  return (
    <ThreeImageCollage
      images={[
        {
          src: "/images/software-testing/testing-dashboard.png",
          alt: "Software testing dashboard",
        },
        {
          src: "/images/software-testing/performance.png",
          alt: "Performance testing",
        },
        {
          src: "/images/software-testing/mobile-testing.png",
          alt: "Responsive testing",
        },
      ]}
      light
      glow="rgba(10,90,96,0.12)"
    />
  );
}

/* ==========================================
   08 — SEO + AEO + GEO
========================================== */

export function SearchVisual() {
  return (
    <ThreeImageCollage
      images={[
        {
          src: "/images/seo/seo-dashboard.png",
          alt: "SEO performance dashboard",
        },
        {
          src: "/images/seo/search-analytics.png",
          alt: "Search analytics",
        },
        {
          src: "/images/seo/ai-search.png",
          alt: "AI search optimization",
        },
      ]}
      glow="rgba(255,106,31,0.18)"
    />
  );
}

/* ==========================================
   09 — CONSULTING & TRAINING
========================================== */

export function ConsultingVisual() {
  return (
    <ThreeImageCollage
      images={[
        {
          src: "/images/consulting/strategy-workshop.png",
          alt: "Business strategy workshop",
        },
        {
          src: "/images/consulting/team-training.png",
          alt: "Team training session",
        },
        {
          src: "/images/consulting/business-planning.png",
          alt: "Business planning",
        },
      ]}
      light
      glow="rgba(10,90,96,0.12)"
    />
  );
}

/* ==========================================
   VISUALS MAPPING
========================================== */

export const visuals = {
  branding: BrandingVisual,
  marketing: MarketingVisual,
  "media-production": MediaVisual,
  "event-management": EventsVisual,
  "digital-solutions": DigitalVisual,
  "software-development": SoftwareDevelopmentVisual,
  "software-testing": SoftwareTestingVisual,
  "search-optimization": SearchVisual,
  "consulting-training": ConsultingVisual,
};