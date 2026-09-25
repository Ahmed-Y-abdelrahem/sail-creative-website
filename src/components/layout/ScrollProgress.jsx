"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { useLocale } from "@/components/shared/LocaleProvider";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const { isRTL } = useLocale();
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[95] h-[2px] bg-gradient-to-r from-teal to-orange"
      style={{ scaleX, transformOrigin: isRTL ? "100% 50%" : "0% 50%" }}
    />
  );
}
