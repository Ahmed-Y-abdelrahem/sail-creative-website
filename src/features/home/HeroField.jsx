"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Directional field. A lattice of short strokes all lean toward the top-right — SAIL's heading —
 * and swing to face the pointer as it passes. Lightweight 2D canvas, paused off-screen.
 */
export default function HeroField({ className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const wrap = canvas.parentElement;
    let w = 0, h = 0, dpr = 1, cell = 38, raf = 0, running = false;
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: 0 };
    const base = -Math.PI / 4;
    const TEAL = [18, 165, 148];
    const ORANGE = [255, 106, 31];

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = w < 768 ? 46 : 38;
      if (!running) draw(performance.now());
    };

    const shortest = (a, b) => {
      let d = b - a;
      while (d > Math.PI) d -= Math.PI * 2;
      while (d < -Math.PI) d += Math.PI * 2;
      return d;
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, w, h);
      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;
      const t = reduce ? 0 : time;
      const R = 230;
      ctx.lineWidth = 1.3;
      ctx.lineCap = "butt";
      for (let y = cell / 2; y < h; y += cell) {
        for (let x = cell / 2; x < w; x += cell) {
          let a = base + 0.32 * Math.sin(x * 0.004 + t * 0.0006) + 0.3 * Math.cos(y * 0.0055 - t * 0.0005);
          let infl = 0;
          if (pointer.active > 0) {
            const dx = pointer.x - x;
            const dy = pointer.y - y;
            const d2 = dx * dx + dy * dy;
            infl = Math.exp(-d2 / (2 * R * R)) * pointer.active;
            if (infl > 0.01) a += shortest(a, Math.atan2(dy, dx)) * Math.min(1, infl * 1.15);
          }
          const len = 9 + infl * 15;
          const alpha = 0.09 + infl * 0.6;
          const m = Math.min(1, infl * 1.4);
          const r = TEAL[0] + (ORANGE[0] - TEAL[0]) * m;
          const g = TEAL[1] + (ORANGE[1] - TEAL[1]) * m;
          const b = TEAL[2] + (ORANGE[2] - TEAL[2]) * m;
          const cx = Math.cos(a) * len * 0.5;
          const cy = Math.sin(a) * len * 0.5;
          ctx.strokeStyle = `rgba(${r | 0},${g | 0},${b | 0},${alpha})`;
          ctx.beginPath();
          ctx.moveTo(x - cx, y - cy);
          ctx.lineTo(x + cx, y + cy);
          ctx.stroke();
        }
      }
    };

    const loop = (time) => {
      if (!running) return;
      pointer.active += ((pointer.tx > -9000 ? 1 : 0) - pointer.active) * 0.06;
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

    const move = (e) => {
      const r = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - r.left;
      pointer.ty = e.clientY - r.top;
      if (pointer.x < -9000) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
    };
    const leave = () => {
      pointer.tx = pointer.ty = -9999;
    };

    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), { threshold: 0 });
    io.observe(wrap);
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    window.addEventListener("pointermove", move, { passive: true });
    wrap.addEventListener("pointerleave", leave);
    resize();
    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", move);
      wrap.removeEventListener("pointerleave", leave);
    };
  }, [reduce]);

  return <canvas ref={ref} aria-hidden className={className} />;
}
