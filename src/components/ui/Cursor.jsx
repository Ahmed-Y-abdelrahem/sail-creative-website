"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useFinePointer } from "@/hooks/useMediaQuery";

/**
 * Minimal dot with a lagging ring. Any element can opt in with
 * data-cursor="view | drag | open" plus data-cursor-label, or data-cursor="link".
 * Disabled on touch devices and when reduced motion is requested.
 */
export default function Cursor() {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const enabled = fine && !reduce;
  const [state, setState] = useState({ type: "idle", label: "" });
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.4 });
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e) => {
      const el = e.target instanceof Element ? e.target.closest("[data-cursor], a, button") : null;
      if (!el) return setState({ type: "idle", label: "" });
      setState({ type: el.getAttribute("data-cursor") || "link", label: el.getAttribute("data-cursor-label") || "" });
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    root.addEventListener("pointerleave", leave);
    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      root.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const labelled = ["view", "drag", "open"].includes(state.type) && state.label;
  const size = labelled ? 96 : state.type === "link" ? 54 : 30;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[130]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity .3s" }}
    >
      <motion.div style={{ x, y }} className="absolute left-0 top-0">
        <div className="-ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full bg-orange" />
      </motion.div>
      <motion.div style={{ x: rx, y: ry }} className="absolute left-0 top-0">
        <motion.div
          animate={{ width: size, height: size }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className={`-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full ${
            labelled ? "bg-orange text-night" : "border border-white/80 mix-blend-difference"
          }`}
        >
          {labelled && <span className="meta !text-[0.625rem] font-semibold">{state.label}</span>}
        </motion.div>
      </motion.div>
    </div>
  );
}
