
"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

import TransitionLink from "./TransitionLink";
import MenuOverlay from "./MenuOverlay";
import LangSwitch from "@/components/shared/LangSwitch";
import { Magnetic } from "@/components/ui/Button";
import Arrow from "@/components/ui/Arrow";
import { useLocale } from "@/components/shared/LocaleProvider";
import { nav } from "@/data/site";
import { switchLocalePath } from "@/lib/i18n";

export default function Header() {
  const { t, href, isRTL } = useLocale();
  const pathname = usePathname() || "/";

  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const { scrollY } = useScroll();

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 240);
  });

  const bare = switchLocalePath(pathname, "en");

  const isActive = (path) => {
    if (path === "/") {
      return bare === "/";
    }

    return bare === path || bare.startsWith(`${path}/`);
  };

  // Add Case Studies after Work.
  const baseNav = nav.filter(
    (item) =>
      item.key !== "home" &&
      item.key !== "caseStudies" &&
      item.href !== "/case-studies"
  );

  const workIndex = baseNav.findIndex(
    (item) =>
      item.key === "work" ||
      item.href === "/work"
  );

  const caseStudiesItem = {
    key: "caseStudies",
    href: "/case-studies",
  };

  const navItems = [...baseNav];

  if (workIndex >= 0) {
    navItems.splice(workIndex + 1, 0, caseStudiesItem);
  } else {
    navItems.push(caseStudiesItem);
  }

  const getNavLabel = (item) => {
    if (item.key === "caseStudies") {
      return isRTL ? "دراسات الحالة" : "Case Studies";
    }

    return t(`nav.${item.key}`);
  };

  return (
    <>
      {/* MAIN HEADER */}

      <motion.header
        className="
          fixed inset-x-0 top-0 z-[80]
          flex items-center justify-between
          px-[var(--pad)] py-5
          text-white mix-blend-difference
        "
        animate={{
          y: hidden && !open ? "-110%" : "0%",
        }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {/* LOGO */}

        <TransitionLink
          href={href("/")}
          aria-label={t("a11y.home")}
          className="
            relative z-[81]
            inline-flex min-h-[44px]
            items-center
          "
          data-cursor="link"
        >
          <Image
            src="/brand/sail-wordmark.png"
            alt="SAIL"
            width={927}
            height={296}
            priority
            className="h-6 w-auto sm:h-7"
          />
        </TransitionLink>

        {/* DESKTOP NAVIGATION */}

        <nav
          aria-label="Primary"
          className="hidden items-center gap-6 lg:flex xl:gap-9"
        >
          {navItems.map((item) => (
            <TransitionLink
              key={item.key}
              href={href(item.href)}
              aria-current={
                isActive(item.href) ? "page" : undefined
              }
              className="
                group relative
                inline-flex min-h-[44px]
                items-center
                whitespace-nowrap
                text-[0.875rem] font-medium
                xl:text-[0.9375rem]
              "
            >
              {getNavLabel(item)}

              <span
                aria-hidden="true"
                className={`
                  absolute inset-x-0 bottom-0
                  h-px origin-left bg-current
                  transition-transform duration-500
                  ease-[var(--ease)]
                  rtl:origin-right
                  ${
                    isActive(item.href)
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }
                `}
              />
            </TransitionLink>
          ))}
        </nav>

        {/* LANGUAGE + MOBILE MENU */}

        <div className="relative z-[81] flex items-center gap-6">
          <LangSwitch className="hidden lg:inline" />

          <button
            type="button"
            className="
              inline-flex min-h-[44px]
              min-w-[44px]
              items-center justify-center
              gap-3 rounded-md
              px-1
              lg:hidden
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-orange
            "
            aria-label={
              open ? t("nav.close") : t("nav.menu")
            }
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="meta text-xs">
              {open ? t("nav.close") : t("nav.menu")}
            </span>

            <span
              className="relative block h-3 w-6 shrink-0"
              aria-hidden="true"
            >
              <span
                className={`
                  absolute inset-x-0 h-px bg-current
                  transition-all duration-500
                  ${
                    open
                      ? "top-1/2 rotate-45"
                      : "top-0"
                  }
                `}
              />

              <span
                className={`
                  absolute inset-x-0 h-px bg-current
                  transition-all duration-500
                  ${
                    open
                      ? "top-1/2 -rotate-45"
                      : "bottom-0"
                  }
                `}
              />
            </span>
          </button>
        </div>
      </motion.header>

      {/* CONTACT CTA */}

      <motion.div
        className="
          fixed end-[var(--pad)]
          top-[4.5rem] z-[79]
          hidden lg:block
        "
        animate={{
          y: hidden ? "-300%" : "0%",
          opacity: hidden ? 0 : 1,
        }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {!isActive("/contact") && (
          <Magnetic strength={0.25}>
            <TransitionLink
              href={href("/contact")}
              data-cursor="link"
              className="
                group inline-flex min-h-[44px]
                items-center gap-2
                rounded-full bg-orange
                px-5 py-3
                text-sm font-semibold text-night
              "
            >
              {t("nav.talk")}

              <Arrow
                className="
                  h-3 w-3
                  transition-transform duration-500
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
                stroke={16}
              />
            </TransitionLink>
          </Magnetic>
        )}
      </motion.div>

      {/* MOBILE MENU */}

      <MenuOverlay open={open} onClose={close} />
    </>
  );
}
