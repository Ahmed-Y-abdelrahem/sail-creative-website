import Image from "next/image";

/**
 * Static media frame. Uses the asset's intrinsic size to reserve space (no layout shift).
 * Pass `fill` + `ratio` to crop into a fixed aspect ratio instead.
 */
export default function MediaFrame({
  img,
  alt = "",
  sizes = "100vw",
  priority = false,
  fill = false,
  ratio,
  className = "",
  imgClassName = "",
  cursor,
  cursorLabel,
  style,
}) {
  const cursorProps = cursor ? { "data-cursor": cursor, "data-cursor-label": cursorLabel } : {};
  if (fill) {
    return (
      <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: ratio, ...style }} {...cursorProps}>
        <Image src={img.src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${imgClassName}`} />
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden ${className}`} style={style} {...cursorProps}>
      <Image
        src={img.src}
        alt={alt}
        width={img.w}
        height={img.h}
        sizes={sizes}
        priority={priority}
        className={`h-auto w-full ${imgClassName}`}
      />
    </div>
  );
}
