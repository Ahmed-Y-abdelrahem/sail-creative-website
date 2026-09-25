"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { clipReveal, ease } from "@/lib/motion";

/** Clip-path mask reveal with an inner scale settle. */
export default function ImageReveal({
  img,
  alt = "",
  sizes = "100vw",
  from = "up",
  fill = false,
  ratio,
  priority = false,
  className = "",
  imgClassName = "",
  cursor,
  cursorLabel,
  delay = 0,
}) {
  const reduce = useReducedMotion();
  const cursorProps = cursor ? { "data-cursor": cursor, "data-cursor-label": cursorLabel } : {};
  const variants = clipReveal(from);
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={fill ? { aspectRatio: ratio } : undefined}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-8% 0px" }}
      variants={variants}
      transition={{ delay }}
      {...cursorProps}
    >
      <motion.div
        className={fill ? "absolute inset-0" : ""}
        initial={reduce ? false : { scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 1.6, ease, delay }}
      >
        {fill ? (
          <Image src={img.src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${imgClassName}`} />
        ) : (
          <Image
            src={img.src}
            alt={alt}
            width={img.w}
            height={img.h}
            sizes={sizes}
            priority={priority}
            className={`h-auto w-full ${imgClassName}`}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
