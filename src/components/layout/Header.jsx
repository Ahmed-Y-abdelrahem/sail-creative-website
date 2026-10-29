
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
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

  const reduceMotion = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [headerFocused, setHeaderFocused] =
    useState(false);

  const headerRef = useRef(null);
  const previousPathRef = useRef(pathname);

  const { scrollY } = useScroll();

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  // Close the mobile menu when the route changes.
  useEffect(() => {
    if (previousPathRef.current !== pathname) {
      previousPathRef.current = pathname;
      setOpen(false);
      setHidden(false);
    }
  }, [pathname]);

  // Keep the header visible while the menu is open.
  // Also avoid hiding it while keyboard focus is inside.
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (open || headerFocused) {
      setHidden(false);
      return;
    }

    const previous = scrollY.getPrevious() ?? 0;

    setHidden(
      latest > previous && latest > 240
    );
  });

  const bare = switchLocalePath(pathname, "en");

  const isActive = (path) => {
    if (path === "/") {
      return bare === "/";
    }

    return (
      bare === path ||
      bare.startsWith(`${path}/`)
    );
  };

  // Add Case Studies and Careers & Internships
  // without duplicating existing navigation entries.
  const baseNav = nav.filter(
    (item) =>
      item.key !== "home" &&
      item.key !== "caseStudies" &&
      item.key !== "careers" &&
      item.href !== "/case-studies" &&
      item.href !== "/careers"
  );

  const workIndex = baseNav.findIndex(
    (item) =>
      item.key === "work" ||
      item.href === "/work"
  );

  const extraNavItems = [
    {
      key: "caseStudies",
      href: "/case-studies",
    },
    {
      key: "careers",
      href: "/careers",
    },
  ];

  const navItems = [...baseNav];

  if (workIndex >= 0) {
    navItems.splice(
      workIndex + 1,
      0,
      ...extraNavItems
    );
  } else {
    navItems.push(...extraNavItems);
  }

  const getNavLabel = (item) => {
    if (item.key === "caseStudies") {
      return isRTL
        ? "دراسات الحالة"
        : "Case Studies";
    }

    if (item.key === "careers") {
      return isRTL
        ? "الوظائف والتدريب"
        : "Careers & Internships";
    }

    return t(`nav.${item.key}`);
  };

  const shouldHideHeader =
    hidden && !open && !headerFocused;

  return (
    <>
      {/* MAIN HEADER */}

      <motion.header
        ref={headerRef}
        className="
          fixed inset-x-0 top-0 z-[80]
          flex items-center justify-between
          px-[var(--pad)] py-5
          text-white mix-blend-difference
        "
        animate={{
          y: shouldHideHeader
            ? "-110%"
            : "0%",
        }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }
        }
        onFocusCapture={() => {
          setHeaderFocused(true);
          setHidden(false);
        }}
        onBlurCapture={(event) => {
          if (
            !event.currentTarget.contains(
              event.relatedTarget
            )
          ) {
            setHeaderFocused(false);
          }
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
            rounded-sm
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-4
            focus-visible:outline-orange
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
          aria-label={
            isRTL
              ? "التنقل الرئيسي"
              : "Primary navigation"
          }
          className="hidden items-center gap-4 lg:flex xl:gap-7 2xl:gap-9"
        >
          {navItems.map((item) => (
            <TransitionLink
              key={item.key}
              href={href(item.href)}
              aria-current={
                isActive(item.href)
                  ? "page"
                  : undefined
              }
              className="
                group relative
                inline-flex min-h-[44px]
                items-center
                whitespace-nowrap
                rounded-sm
                text-[0.8125rem] font-medium
                xl:text-[0.9375rem]
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-orange
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
                  motion-reduce:transition-none
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
              open
                ? t("nav.close")
                : t("nav.menu")
            }
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => {
              setOpen((value) => !value);
              setHidden(false);
            }}
          >
            <span className="meta text-xs">
              {open
                ? t("nav.close")
                : t("nav.menu")}
            </span>

            <span
              className="relative block h-3 w-6 shrink-0"
              aria-hidden="true"
            >
              <span
                className={`
                  absolute inset-x-0 h-px bg-current
                  transition-all duration-500
                  motion-reduce:transition-none
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
                  motion-reduce:transition-none
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
          y: hidden
            ? "-300%"
            : "0%",
          opacity: hidden ? 0 : 1,
        }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }
        }
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
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-white
              "
            >
              {t("nav.talk")}

              <Arrow
                className="
                  h-3 w-3
                  transition-transform duration-500
                  motion-reduce:transition-none
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

      <MenuOverlay
        open={open}
        onClose={close}
      />
    </>
  );
}
