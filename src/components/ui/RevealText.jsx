
"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  maskUp,
  reducedMask,
} from "@/lib/motion";

/**
 * Word-by-word mask reveal.
 * Splits by word only, so Arabic letters stay joined.
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
  const reduceMotion = useReducedMotion();

  const rows = lines || [text];

  const M = motion[Tag] || motion.span;

  const parent = {
    hidden: {},
    show: {
      transition: reduceMotion
        ? {
            staggerChildren: 0,
            delayChildren: 0,
          }
        : {
            staggerChildren: stagger,
            delayChildren: delay,
          },
    },
  };

  const wordVariants = reduceMotion
    ? reducedMask
    : maskUp;

  return (
    <M
      className={className}
      variants={parent}
      initial={
        reduceMotion ? false : "hidden"
      }
      {...(
        reduceMotion
          ? {
              animate: "show",
            }
          : immediate
            ? {
                animate: active
                  ? "show"
                  : "hidden",
              }
            : {
                whileInView: "show",
                viewport: {
                  once: true,
                  margin: "-10% 0px",
                },
              }
      )}
    >
      {rows.map((row, rowIndex) => {
        const words = String(row ?? "")
          .trim()
          .split(/\s+/)
          .filter(Boolean);

        return (
          <span
            key={rowIndex}
            className="block"
          >
            {words.map((word, wordIndex) => (
              <span
                key={`${rowIndex}-${wordIndex}`}
                className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em] pe-[0.06em] -me-[0.06em]"
              >
                <motion.span
                  variants={wordVariants}
                  className={`inline-block ${
                    reduceMotion
                      ? ""
                      : "will-change-transform"
                  } ${wordClassName}`}
                >
                  {word}
                </motion.span>

                {wordIndex < words.length - 1
                  ? "\u00A0"
                  : ""}
              </span>
            ))}
          </span>
        );
      })}
    </M>
  );
}
