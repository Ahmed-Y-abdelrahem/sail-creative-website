"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "@/components/shared/LocaleProvider";

const TransitionContext = createContext({ navigate: () => {} });
export const useTransitionNav = () => useContext(TransitionContext);

/**
 * SAIL directional wipe: two panels sweep across in the reading direction,
 * the route swaps underneath, then the panels exit. ~0.9s total, never blocks input.
 */
export function TransitionProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { isRTL } = useLocale();
  const [phase, setPhase] = useState("idle"); // idle | cover | reveal
  const target = useRef(null);
  const from = useRef(pathname);

  const navigate = useCallback(
    (href) => {
      if (reduce || phase !== "idle" || href === pathname) {
        router.push(href);
        return;
      }
      target.current = href;
      from.current = pathname;
      setPhase("cover");
    },
    [reduce, phase, pathname, router]
  );

  useEffect(() => {
    if (phase === "cover" && pathname !== from.current) setPhase("reveal");
  }, [pathname, phase]);

  const sign = isRTL ? -1 : 1;
  const panel = (delayIn, delayOut) => ({
    idle: { x: `${-110 * sign}%`, transition: { duration: 0 } },
    cover: { x: "0%", transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: delayIn } },
    reveal: { x: `${110 * sign}%`, transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1], delay: delayOut } },
  });

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[120] overflow-hidden"
        style={{ display: phase === "idle" ? "none" : "block" }}
      >
        <motion.div
          className="absolute inset-y-0 -inset-x-[8%] bg-orange"
          style={{ skewX: -10 * sign }}
          variants={panel(0, 0.08)}
          initial="idle"
          animate={phase}
        />
        <motion.div
          className="absolute inset-y-0 -inset-x-[8%] bg-night"
          style={{ skewX: -10 * sign }}
          variants={panel(0.1, 0)}
          initial="idle"
          animate={phase}
          onAnimationComplete={(def) => {
            if (def === "cover" && target.current) {
              router.push(target.current);
              target.current = null;
              // Safety net if the destination resolves to the same route.
              setTimeout(() => setPhase((p) => (p === "cover" ? "reveal" : p)), 1600);
            }
            if (def === "reveal") setPhase("idle");
          }}
        />
      </div>
    </TransitionContext.Provider>
  );
}
