export const cx = (...parts) => parts.filter(Boolean).join(" ");
export const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
export const pad2 = (n) => String(n).padStart(2, "0");
