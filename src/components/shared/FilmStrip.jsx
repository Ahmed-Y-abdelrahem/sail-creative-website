import Image from "next/image";
import Marquee from "@/components/ui/Marquee";

/** A strip of contact-sheet photography between sprocket holes, sliding slowly. */
export default function FilmStrip({ images, reverse = false, duration = 100, height = "h-[19vh] sm:h-[23vh]", cursorLabel }) {
  return (
    <div className="bg-black py-2">
      <div aria-hidden className="sprockets h-4" />
      <Marquee reverse={reverse} duration={duration} className="my-1" trackClassName="gap-1">
        {images.map((img, i) => (
          <Image
            key={`${img.src}-${i}`}
            src={img.src}
            alt=""
            width={img.w}
            height={img.h}
            sizes="(min-width:1024px) 60vw, 120vw"
            data-cursor={cursorLabel ? "view" : undefined}
            data-cursor-label={cursorLabel}
            className={`me-1 ${height} w-auto max-w-none shrink-0 object-cover`}
          />
        ))}
      </Marquee>
      <div aria-hidden className="sprockets h-4" />
    </div>
  );
}
