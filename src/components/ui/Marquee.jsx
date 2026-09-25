/** CSS-driven marquee (no JS per frame). Content is duplicated for a seamless loop. */
export default function Marquee({ children, duration = 60, reverse = false, className = "", trackClassName = "" }) {
  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div className={`marquee-track ${reverse ? "rev" : ""} ${trackClassName}`} style={{ "--dur": `${duration}s` }}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
