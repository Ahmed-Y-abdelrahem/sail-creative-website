"use client";
import Arrow from "@/components/ui/Arrow";

export default function BackToTop({ label }) {
  return (
    <button
      type="button"
      data-cursor="link"
      className="group meta inline-flex items-center gap-3"
      onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
    >
      {label}
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 transition-transform duration-500 group-hover:-translate-y-1">
        <Arrow className="h-3 w-3" rotate={-45} stroke={16} />
      </span>
    </button>
  );
}
