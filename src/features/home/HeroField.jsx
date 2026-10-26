
"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Interactive dot field for the SAIL hero.
 * Dots softly pulse and respond to pointer movement.
 * Animation pauses when the hero is off-screen.
 */
export default function HeroField({ className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const wrap = canvas.parentElement;
    if (!wrap) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let cell = 38;
    let raf = 0;
    let running = false;

    const pointer = {
      x: -9999,
      y: -9999,
      tx: -9999,
      ty: -9999,
      active: 0,
    };

    const TEAL = [18, 165, 148];
    const ORANGE = [255, 106, 31];

    const draw = (time) => {
      ctx.clearRect(0, 0, w, h);

      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;

      const t = reduce ? 0 : time;
      const influenceRadius = 230;

      for (let y = cell / 2; y < h; y += cell) {
        for (let x = cell / 2; x < w; x += cell) {
          const wave =
            Math.sin(x * 0.004 + t * 0.0006) *
              0.5 +
            Math.cos(y * 0.0055 - t * 0.0005) *
              0.5;

          let influence = 0;

          if (pointer.active > 0) {
            const dx = pointer.x - x;
            const dy = pointer.y - y;

            const distanceSquared =
              dx * dx + dy * dy;

            influence =
              Math.exp(
                -distanceSquared /
                  (2 *
                    influenceRadius *
                    influenceRadius)
              ) * pointer.active;
          }

          // Small dots at rest, larger near the pointer.
          const radius =
            1.15 +
            wave * 0.2 +
            influence * 2.1;

          const alpha = Math.min(
            0.85,
            Math.max(
              0.04,
              0.17 +
                wave * 0.045 +
                influence * 0.58
            )
          );

          // Blend teal into orange near the pointer.
          const mix = Math.min(
            1,
            influence * 1.4
          );

          const r =
            TEAL[0] +
            (ORANGE[0] - TEAL[0]) * mix;

          const g =
            TEAL[1] +
            (ORANGE[1] - TEAL[1]) * mix;

          const b =
            TEAL[2] +
            (ORANGE[2] - TEAL[2]) * mix;

          ctx.fillStyle = `rgba(${Math.round(
            r
          )},${Math.round(g)},${Math.round(
            b
          )},${alpha})`;

          ctx.beginPath();
          ctx.arc(
            x,
            y,
            Math.max(0.5, radius),
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
      }
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();

      w = rect.width;
      h = rect.height;

      dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);

      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );

      cell = w < 768 ? 46 : 38;

      if (!running) {
        draw(performance.now());
      }
    };

    const loop = (time) => {
      if (!running) return;

      const targetActive =
        pointer.tx > -9000 ? 1 : 0;

      pointer.active +=
        (targetActive - pointer.active) * 0.06;

      draw(time);

      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduce) return;

      running = true;
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const move = (event) => {
      const rect = canvas.getBoundingClientRect();

      pointer.tx =
        event.clientX - rect.left;

      pointer.ty =
        event.clientY - rect.top;

      if (pointer.x < -9000) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
    };

    const leave = () => {
      pointer.tx = -9999;
      pointer.ty = -9999;
    };

    const intersectionObserver =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            start();
          } else {
            stop();
          }
        },
        { threshold: 0 }
      );

    intersectionObserver.observe(wrap);

    const resizeObserver =
      new ResizeObserver(resize);

    resizeObserver.observe(wrap);

    window.addEventListener(
      "pointermove",
      move,
      { passive: true }
    );

    wrap.addEventListener(
      "pointerleave",
      leave
    );

    resize();

    return () => {
      stop();

      intersectionObserver.disconnect();
      resizeObserver.disconnect();

      window.removeEventListener(
        "pointermove",
        move
      );

      wrap.removeEventListener(
        "pointerleave",
        leave
      );
    };
  }, [reduce]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={className}
    />
  );
}
