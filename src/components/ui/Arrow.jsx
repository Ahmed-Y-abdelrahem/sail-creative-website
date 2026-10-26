
/**
 * SAIL directional arrow.
 * Clean up-right arrow with smooth edges.
 */
export default function Arrow({
  className = "",
  rotate = 0,
  stroke = 7,
  title,
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={{
        transform: rotate
          ? `rotate(${rotate}deg)`
          : undefined,
      }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      {title && <title>{title}</title>}

      <path
        d="M5 19L19 5M9 5H19V15"
        stroke="currentColor"
        strokeWidth={stroke / 4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
