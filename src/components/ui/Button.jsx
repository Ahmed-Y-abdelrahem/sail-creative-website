"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

import TransitionLink from "@/components/layout/TransitionLink";
import Arrow from "./Arrow";
import { useFinePointer } from "@/hooks/useMediaQuery";

/**
 * Magnetic wrapper
 */
export function Magnetic({
  children,
  strength = 0.3,
  className = "",
}) {
  const ref = useRef(null);

  const fine = useFinePointer();
  const reduce = useReducedMotion();

  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);

  const x = useSpring(motionX, {
    stiffness: 220,
    damping: 16,
  });

  const y = useSpring(motionY, {
    stiffness: 220,
    damping: 16,
  });

  const enabled = fine && !reduce;

  const handlePointerMove = (e) => {
    if (!enabled || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const offsetX =
      e.clientX - (rect.left + rect.width / 2);

    const offsetY =
      e.clientY - (rect.top + rect.height / 2);

    motionX.set(offsetX * strength);
    motionY.set(offsetY * strength);
  };

  const handlePointerLeave = () => {
    motionX.set(0);
    motionY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x, y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </motion.div>
  );
}

const base =
  "group relative inline-flex items-center justify-center gap-4 overflow-hidden rounded-full px-7 py-4 font-medium leading-none";

/**
 * Clean animated arrow.
 *
 * Important:
 * We don't move the arrow outside a clipped container anymore.
 * It only nudges slightly up/right on hover.
 */
function ButtonArrow({ hoverText }) {
  return (
    <span
      aria-hidden="true"
      className={`
        relative z-10
        flex h-[18px] w-[18px]
        shrink-0
        items-center justify-center
        transition-colors duration-500
        ${hoverText}
      `}
    >
      <Arrow
        stroke={7}
        className="
          block h-full w-full
          transition-transform
          duration-500
          ease-[var(--ease)]
          group-hover:translate-x-[2px]
          group-hover:-translate-y-[2px]
          group-focus-visible:translate-x-[2px]
          group-focus-visible:-translate-y-[2px]
          rtl:group-hover:-translate-x-[2px]
          rtl:group-focus-visible:-translate-x-[2px]
        "
      />
    </span>
  );
}

/**
 * Primary / light / ghost pill button
 */
export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  external,
  ...rest
}) {
  const styles =
    variant === "primary"
      ? "bg-orange text-night"
      : variant === "light"
        ? "bg-paper text-ink"
        : "border border-current";

  const sweep =
    variant === "ghost"
      ? "bg-paper"
      : "bg-night";

  const hoverText =
    variant === "ghost"
      ? "group-hover:text-night group-focus-visible:text-night"
      : "group-hover:text-paper group-focus-visible:text-paper";

  const inner = (
    <>
      {/* Hover background */}
      <span
        aria-hidden="true"
        className={`
          absolute inset-0
          origin-bottom
          scale-y-0
          rounded-[inherit]
          transition-transform
          duration-500
          ease-[var(--ease)]
          group-hover:scale-y-100
          group-focus-visible:scale-y-100
          ${sweep}
        `}
      />

      {/* Button text */}
      <span
        className={`
          relative z-10
          whitespace-nowrap
          transition-colors
          duration-500
          ${hoverText}
        `}
      >
        {children}
      </span>

      {/* Arrow */}
      <ButtonArrow hoverText={hoverText} />
    </>
  );

  const cls = `${base} ${styles} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
          data-cursor="link"
          {...rest}
        >
          {inner}
        </a>
      );
    }

    return (
      <TransitionLink
        href={href}
        className={cls}
        data-cursor="link"
        {...rest}
      >
        {inner}
      </TransitionLink>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={cls}
      data-cursor="link"
      {...rest}
    >
      {inner}
    </button>
  );
}

/**
 * Text link with circular arrow.
 */
export function ArrowLink({
  href,
  children,
  className = "",
  external,
  direction = "right",
}) {
  const cls =
    `group inline-flex items-center gap-3 ${className}`;

  const rot =
    direction === "right"
      ? 45
      : direction === "left"
        ? -135
        : 0;

  const inner = (
    <>
      <span className="link-line pb-1">
        {children}
      </span>

      <span
        className="
          relative
          inline-flex
          h-5 w-5
          shrink-0
          items-center
          justify-center
          rounded-full
          border
          border-current
          transition-transform
          duration-500
          ease-[var(--ease)]
          group-hover:translate-x-1
          rtl:group-hover:-translate-x-1
        "
      >
        <Arrow
          className="h-2.5 w-2.5 rtl:-scale-x-100"
          rotate={rot - 45}
          stroke={7}
        />
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
      >
        {inner}
      </a>
    );
  }

  return (
    <TransitionLink
      href={href}
      className={cls}
    >
      {inner}
    </TransitionLink>
  );
}

/**
 * Simple animated text link.
 */
export function TextLink({
  href,
  children,
  className = "",
  external,
}) {
  const cls = `link-line ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
      >
        {children}
      </a>
    );
  }

  return (
    <TransitionLink
      href={href}
      className={cls}
    >
      {children}
    </TransitionLink>
  );
}