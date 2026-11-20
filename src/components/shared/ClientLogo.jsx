
"use client";

import Image from "next/image";
import { useLocale } from "@/components/shared/LocaleProvider";

export default function ClientLogo({
  partner,
  size = 112,
  className = "",
}) {
  const { isRTL } = useLocale();

  if (!partner?.src) {
    return null;
  }

  const englishName =
    typeof partner.name === "string"
      ? partner.name.trim()
      : "";

  const arabicName =
    typeof partner.nameAr === "string"
      ? partner.nameAr.trim()
      : "";

  const partnerName = isRTL
    ? arabicName || englishName
    : englishName || arabicName;

  const logoNumber = String(
    partner.id ?? ""
  ).padStart(3, "0");

  // Localized alternative text for accessibility and SEO.
  // Keep unidentified brands unnamed.
  const altText = partnerName
    ? isRTL
      ? `شعار ${partnerName}`
      : `${partnerName} logo`
    : isRTL
      ? `شعار شريك غير محدد الاسم لدى سيل للحلول الإبداعية، رقم ${logoNumber}`
      : `Unidentified SAIL Creative partner logo ${logoNumber}`;

  return (
    <div
      className={`
        group/logo
        relative
        shrink-0
        overflow-hidden
        rounded-[10px]
        bg-white
        shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]
        transition-all
        duration-500
        ease-[var(--ease)]
        hover:-translate-y-2
        hover:scale-105
        ${className}
      `}
      style={{
        width: size,
        height: size,
      }}
    >
      <Image
        src={partner.src}
        alt={altText}
        width={160}
        height={160}
        unoptimized
        loading="lazy"
        className="
          h-full
          w-full
          object-contain
          grayscale
          contrast-125
          p-2
          transition-[filter]
          duration-500
        "
      />
    </div>
  );
}
