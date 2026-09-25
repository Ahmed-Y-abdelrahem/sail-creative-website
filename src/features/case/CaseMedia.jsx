"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import ImageReveal from "@/components/ui/ImageReveal";
import FilmStrip from "@/components/shared/FilmStrip";
import { useLocale } from "@/components/shared/LocaleProvider";

const Note = ({ note }) => {
  const { x } = useLocale();
  return note ? <p className="meta mt-4 opacity-60">{x(note)}</p> : null;
};

export function BoardBlock({ block, name }) {
  return (
    <figure className="px-[var(--pad)]">
      <ImageReveal img={block.img} alt={`${name} — identity board`} sizes="100vw" />
      <Note note={block.note} />
    </figure>
  );
}

// Asymmetric placement for layered mockups.
const spots = [
  "lg:col-span-7 lg:col-start-1",
  "lg:col-span-5 lg:col-start-8 lg:mt-32",
  "lg:col-span-5 lg:col-start-2 lg:-mt-8",
  "lg:col-span-6 lg:col-start-7 lg:mt-20",
];
export function CollageBlock({ block, name }) {
  return (
    <div className="grid gap-6 px-[var(--pad)] lg:grid-cols-12 lg:gap-8">
      {block.imgs.map((img, i) => (
        <div key={img.src} className={block.imgs.length === 1 ? "lg:col-span-6 lg:col-start-4" : spots[i % spots.length]}>
          <ImageReveal img={img} alt={`${name} — detail ${i + 1}`} sizes="(min-width:1024px) 50vw, 100vw" from={i % 2 ? "right" : "left"} />
        </div>
      ))}
    </div>
  );
}

function Column({ img, speed, progress, name, i }) {
  const y = useTransform(progress, [0, 1], [speed, -speed]);
  return (
    <motion.div style={{ y }} className="shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
      <Image src={img.src} alt={i === 0 ? `${name} — social posts` : ""} width={img.w} height={img.h} sizes="(min-width:1024px) 22vw, 46vw" className="h-auto w-full" />
    </motion.div>
  );
}
export function StripsBlock({ block, name }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const speeds = [-70, 90, -130, 40];
  return (
    <div ref={ref} className="px-[var(--pad)]">
      <div className="mask-fade-b grid grid-cols-2 items-start gap-4 overflow-hidden pb-20 lg:grid-cols-4 lg:gap-8">
        {block.imgs.map((img, i) => (
          <Column key={img.src} img={img} i={i} name={name} progress={scrollYProgress} speed={speeds[i % 4]} />
        ))}
      </div>
      <Note note={block.note} />
    </div>
  );
}

export function FilmBlock({ block }) {
  return (
    <div>
      <div className="grid gap-3">
        <FilmStrip images={[block.rows[0], block.rows[0]]} duration={110} cursorLabel="•" />
        <FilmStrip images={[block.rows[1], block.rows[1]]} duration={130} reverse cursorLabel="•" />
      </div>
      <div className="px-[var(--pad)]">
        <Note note={block.note} />
      </div>
    </div>
  );
}

export function PanoBlock({ block, name }) {
  return (
    <figure>
      <div className="no-scrollbar overflow-x-auto" tabIndex={0} role="region" aria-label={name}>
        <div className="min-w-[175%] px-[var(--pad)] md:min-w-full">
          <ImageReveal img={block.img} alt={`${name} — ${block.note?.en || "gallery"}`} sizes="100vw" from="up" />
        </div>
      </div>
      <div className="px-[var(--pad)]">
        <Note note={block.note} />
      </div>
    </figure>
  );
}

export const blocks = { board: BoardBlock, collage: CollageBlock, strips: StripsBlock, film: FilmBlock, pano: PanoBlock };
