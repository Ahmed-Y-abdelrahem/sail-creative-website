"use client";
import { motion, useReducedMotion } from "framer-motion";
import { maskUp } from "@/lib/motion";

/**
 * Word-by-word mask reveal. Splits by word only, so Arabic letters stay joined.
 * Pass `lines` (array) to control line breaks explicitly.
 */
export default function RevealText({
  as: Tag = "span",
  text,
  lines,
  className = "",
  delay = 0,
  stagger = 0.06,
  immediate = false,
  active = true,
  wordClassName = "",
}) {
  const reduce = useReducedMotion();
  const rows = lines || [text];
  const M = motion[Tag] || motion.span;
  const parent = { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } };

  return (
    <M
      className={className}
      variants={parent}
      initial={reduce ? "show" : "hidden"}
      {...(immediate ? { animate: active ? "show" : "hidden" } : { whileInView: "show", viewport: { once: true, margin: "-10% 0px" } })}
    >
      {rows.map((row, r) => (
        <span key={r} className="block">
          {row.split(" ").map((word, w, arr) => (
            <span key={`${r}-${w}`} className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em] pe-[0.06em] -me-[0.06em]">
              <motion.span variants={maskUp} className={`inline-block will-change-transform ${wordClassName}`}>
                {word}
              </motion.span>
              {w < arr.length - 1 ? "\u00A0" : ""}
            </span>
          ))}
        </span>
      ))}
    </M>
  );
}
