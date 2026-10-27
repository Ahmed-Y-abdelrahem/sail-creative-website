
/**
 * CSS-driven marquee (no JS per frame).
 * Content is duplicated for a seamless loop.
 * Respects the user's reduced-motion preference.
 */
export default function Marquee({
  children,
  duration = 60,
  reverse = false,
  className = "",
  trackClassName = "",
}) {
  return (
    <div
      className={`marquee overflow-hidden ${className}`}
    >
      <div
        className={`marquee-track ${
          reverse ? "rev" : ""
        } ${trackClassName}`}
        style={{
          "--dur": `${duration}s`,
        }}
      >
        <div className="flex shrink-0 items-center">
          {children}
        </div>

        <div
          className="flex shrink-0 items-center"
          aria-hidden="true"
        >
          {children}
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none !important;
            transform: none !important;
          }

          .marquee-track.rev {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}
