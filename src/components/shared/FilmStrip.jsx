
import Image from "next/image";
import Marquee from "@/components/ui/Marquee";
import { useLocale } from "@/components/shared/LocaleProvider";

/**
 * A strip of contact-sheet photography between
 * sprocket holes, sliding slowly.
 */
export default function FilmStrip({
  images,
  reverse = false,
  duration = 100,
  height = "h-[19vh] sm:h-[23vh]",
  cursorLabel,
}) {
  const { isRTL } = useLocale();

  return (
    <div
      className="bg-black py-2"
      role="img"
      aria-label={
        isRTL
          ? "شريط سينمائي يعرض صورًا من أعمال المشروع"
          : "Animated film strip showcasing project photography"
      }
    >
      <div
        aria-hidden="true"
        className="sprockets h-4"
      />

      <div aria-hidden="true">
        <Marquee
          reverse={reverse}
          duration={duration}
          className="my-1"
          trackClassName="gap-1"
        >
          {images.map((img, i) => (
            <Image
              key={`${img.src}-${i}`}
              src={img.src}
              alt=""
              width={img.w}
              height={img.h}
              sizes="(min-width:1024px) 60vw, 120vw"
              data-cursor={
                cursorLabel ? "view" : undefined
              }
              data-cursor-label={cursorLabel}
              className={`me-1 ${height} w-auto max-w-none shrink-0 object-cover`}
            />
          ))}
        </Marquee>
      </div>

      <div
        aria-hidden="true"
        className="sprockets h-4"
      />
    </div>
  );
}
