import Image from "next/image";

/** One tile from the partner wall. Grayscale by default, brand colour on hover/focus. */
export default function ClientLogo({ partner, size = 112, className = "" }) {
  return (
    <div
      className={`group/logo relative shrink-0 overflow-hidden rounded-[10px] bg-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] transition-all duration-500 ease-[var(--ease)] hover:-translate-y-2 hover:scale-105 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={partner.src}
        alt={partner.name || ""}
        width={160}
        height={160}
        unoptimized
        loading="lazy"
        className="h-full w-full object-contain grayscale contrast-125 transition-[filter] duration-500 group-hover/logo:grayscale-0"
      />
    </div>
  );
}
