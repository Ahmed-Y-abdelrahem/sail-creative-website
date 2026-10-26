
"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useLocale } from "@/components/shared/LocaleProvider";

export default function AnimatedCounter({
  value,
  from = 0,
  duration = 2.2,
  className = "",
}) {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-10% 0px",
  });

  const reduce = useReducedMotion();
  const { num } = useLocale();

  const [n, setN] = useState(from);

  useEffect(() => {
    if (reduce) {
      setN(value);
      return;
    }

    if (!inView) return;

    const controls = animate(from, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        setN(Math.round(v));
      },
    });

    return () => controls.stop();
  }, [inView, reduce, from, value, duration]);

  return (
    <span ref={ref} className={className}>
      {/* Correct value in initial HTML */}
      <span className="sr-only">
        {num(value)}
      </span>

      {/* Visual animated number */}
      <span aria-hidden="true" className="tabular-nums">
        {num(n)}
      </span>
    </span>
  );
}
