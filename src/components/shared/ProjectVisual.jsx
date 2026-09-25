import Image from "next/image";
import MediaFrame from "@/components/ui/MediaFrame";

/**
 * The signature visual of a project, chosen by its presentation layout:
 * board (identity board), strips (phone-format posts), film (photography strip), pano (event panorama).
 * Server-friendly, no motion — motion wrappers live in the feature components.
 */
export default function ProjectVisual({ project, alt, sizes = "(min-width:1024px) 60vw, 100vw", priority = false, className = "" }) {
  const { layout, cover, media } = project;

  if (layout === "strips") {
    const strips = media.find((m) => m.type === "strips")?.imgs || [cover];
    const drops = ["0%", "-14%", "-5%", "-20%"];
    return (
      <div className={`grid aspect-[16/10] grid-cols-4 gap-[1.2%] overflow-hidden ${className}`}>
        {strips.map((s, i) => (
          <div key={s.src} className="relative overflow-hidden">
            <Image
              src={s.src}
              alt={i === 0 ? alt : ""}
              width={s.w}
              height={s.h}
              sizes={sizes}
              priority={priority && i === 0}
              className="h-auto w-full"
              style={{ transform: `translateY(${drops[i % 4]})` }}
            />
          </div>
        ))}
      </div>
    );
  }

  if (layout === "film") {
    return (
      <div className={`bg-black py-2 ${className}`}>
        <div className="sprockets h-4" aria-hidden />
        <MediaFrame img={cover} alt={alt} sizes={sizes} priority={priority} />
        <div className="sprockets h-4" aria-hidden />
      </div>
    );
  }

  return <MediaFrame img={cover} alt={alt} sizes={sizes} priority={priority} className={className} />;
}
