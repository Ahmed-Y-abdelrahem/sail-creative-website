
"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";

import TransitionLink from "./TransitionLink";
import LangSwitch from "@/components/shared/LangSwitch";
import { useLocale } from "@/components/shared/LocaleProvider";
import { nav, site } from "@/data/site";
import { M } from "@/data/media";
import { ease } from "@/lib/motion";
import { pad2 } from "@/lib/utils";
import { switchLocalePath } from "@/lib/i18n";

const teasers = {
  home: {
    img: M("tawlead/board"),
    alt: "Tawlead identity board",
  },
  about: {
    img: M("frag/manafesh-logo"),
    alt: "Manafesh logo",
  },
  services: {
    img: M("frag/shavery-logo"),
    alt: "Shavery & Co. logo",
  },
  work: {
    img: M("fayya/board"),
    alt: "Fayya identity board",
  },
  caseStudies: {
    img: M("fayya/board"),
    alt: "Fayya case study",
  },
  events: {
    img: M("radicon/event-1"),
    alt: "Radicon event",
  },
  contact: {
    img: M("tricycle/col2"),
    alt: "Tricycle social posts",
  },
};

function Teaser({ teaser, id, sizes, reduceMotion }) {
  if (!teaser) return null;

  return (
    <AnimatePresence
      mode={reduceMotion ? "sync" : "wait"}
      initial={false}
    >
      <motion.div
        key={id}
        className="absolute inset-0"
        initial={
          reduceMotion
            ? false
            : { clipPath: "inset(100% 0 0 0)" }
        }
        animate={{
          clipPath: "inset(0% 0 0 0)",
        }}
        exit={
          reduceMotion
            ? { opacity: 0 }
            : { clipPath: "inset(0 0 100% 0)" }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                duration: 0.6,
                ease: [0.76, 0, 0.24, 1],
              }
        }
      >
        <Image
          src={teaser.img.src}
          alt=""
          fill
          sizes={sizes}
          className="object-cover"
        />
      </motion.div>
    </AnimatePresence>
  );
}

export default function MenuOverlay({ open, onClose }) {
  const { t, href, isRTL } = useLocale();
  const pathname = usePathname() || "/";
  const reduceMotion = useReducedMotion();

  const menuRef = useRef(null);
  const previousPathRef = useRef(pathname);
  const restoreFocusRef = useRef(false);
  const closeReasonRef = useRef("dismiss");

  const [active, setActive] = useState("home");

  // Keep Case Studies after Work, without duplicates.
  const baseNav = nav.filter(
    (item) =>
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
    navItems.splice(
      workIndex + 1,
      0,
      caseStudiesItem
    );
  } else {
    navItems.push(caseStudiesItem);
  }

  const getNavLabel = (item) => {
    if (item.key === "caseStudies") {
      return isRTL
        ? "دراسات الحالة"
        : "Case Studies";
    }

    return t(`nav.${item.key}`);
  };

  const barePath = switchLocalePath(
    pathname,
    "en"
  );

  const currentItem =
    [...navItems]
      .filter((item) => {
        if (item.href === "/") {
          return barePath === "/";
        }

        return (
          barePath === item.href ||
          barePath.startsWith(`${item.href}/`)
        );
      })
      .sort(
        (a, b) =>
          b.href.length - a.href.length
      )[0] || navItems[0];

  // Keep the menu in sync with route changes.
  useEffect(() => {
    if (
      previousPathRef.current !== pathname
    ) {
      previousPathRef.current = pathname;
      closeReasonRef.current = "navigation";
      onClose();
    }
  }, [pathname, onClose]);

  // Lock scrolling and manage keyboard focus.
  useEffect(() => {
    if (!open) {
      if (restoreFocusRef.current) {
        restoreFocusRef.current = false;

        if (
          closeReasonRef.current !==
          "navigation"
        ) {
          const menuButton =
            document.querySelector(
              'button[aria-controls="site-menu"]'
            );

          menuButton?.focus({
            preventScroll: true,
          });
        }
      }

      return;
    }

    restoreFocusRef.current = true;
    closeReasonRef.current = "dismiss";

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      const firstLink =
        menuRef.current?.querySelector(
          'a[href]'
        );

      firstLink?.focus({
        preventScroll: true,
      });
    }, reduceMotion ? 0 : 150);

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeReasonRef.current = "dismiss";
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const menu = menuRef.current;
      if (!menu) return;

      const focusable = Array.from(
        menu.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter(
        (element) =>
          element.getClientRects().length > 0 &&
          !element.closest(
            '[aria-hidden="true"]'
          )
      );

      if (focusable.length === 0) {
        event.preventDefault();
        menu.focus();
        return;
      }

      const first = focusable[0];
      const last =
        focusable[focusable.length - 1];

      const current =
        document.activeElement;

      if (
        !menu.contains(current) ||
        current === menu
      ) {
        event.preventDefault();

        (
          event.shiftKey ? last : first
        ).focus();

        return;
      }

      if (
        event.shiftKey &&
        current === first
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        current === last
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.clearTimeout(focusTimer);

      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open, onClose, reduceMotion]);

  const handleNavigation = (itemKey) => {
    setActive(itemKey);
    closeReasonRef.current = "navigation";
    onClose();
  };

  const teaser =
    teasers[active] || teasers.home;

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          ref={menuRef}
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t("nav.menu")}
          tabIndex={-1}
          className="
            tex-night grain
            fixed inset-0 z-[75]
            flex flex-col
            overflow-y-auto
            px-[var(--pad)]
            pb-8 pt-28
          "
          initial={
            reduceMotion
              ? false
              : {
                  clipPath:
                    "inset(0 0 100% 0)",
                }
          }
          animate={{
            clipPath: "inset(0 0 0% 0)",
          }}
          exit={{
            clipPath: reduceMotion
              ? "inset(0 0 0% 0)"
              : "inset(0 0 100% 0)",
            opacity: reduceMotion ? 0 : 1,
          }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  duration: 0.8,
                  ease: [
                    0.76, 0, 0.24, 1,
                  ],
                }
          }
          onAnimationStart={() => {
            setActive(
              currentItem?.key || "home"
            );
          }}
        >
          {/* NAVIGATION */}

          <div className="relative flex flex-1 items-start justify-between gap-6">
            <ul className="relative z-10 flex flex-col gap-1">
              {navItems.map((item, i) => {
                const isCurrent =
                  currentItem?.key ===
                  item.key;

                return (
                  <li
                    key={item.key}
                    className={
                      reduceMotion
                        ? ""
                        : "overflow-hidden"
                    }
                  >
                    <motion.div
                      initial={
                        reduceMotion
                          ? false
                          : { y: "110%" }
                      }
                      animate={{ y: 0 }}
                      exit={
                        reduceMotion
                          ? { opacity: 0 }
                          : { y: "110%" }
                      }
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : {
                              duration: 0.9,
                              ease,
                              delay:
                                0.25 +
                                i * 0.06,
                            }
                      }
                    >
                      <TransitionLink
                        href={href(item.href)}
                        aria-current={
                          isCurrent
                            ? "page"
                            : undefined
                        }
                        onMouseEnter={() =>
                          setActive(item.key)
                        }
                        onFocus={() =>
                          setActive(item.key)
                        }
                        onClick={() =>
                          handleNavigation(
                            item.key
                          )
                        }
                        className="
                          group flex min-h-[44px]
                          items-center gap-4 py-1
                          rounded-sm
                          focus-visible:outline
                          focus-visible:outline-2
                          focus-visible:outline-offset-2
                          focus-visible:outline-orange
                        "
                      >
                        <span className="meta w-6 shrink-0 tabular-nums text-xs text-orange">
                          {pad2(i + 1)}
                        </span>

                        <span
                          className="
                            display fs-xl
                            transition-colors duration-300
                            motion-reduce:transition-none
                            group-hover:text-orange
                            group-focus-visible:text-orange
                          "
                        >
                          {getNavLabel(item)}
                        </span>
                      </TransitionLink>
                    </motion.div>
                  </li>
                );
              })}
            </ul>

            {/* DESKTOP / TABLET TEASER */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute end-0 top-0
                hidden aspect-[4/5]
                w-[38vw] max-w-[20rem]
                overflow-hidden sm:block
              "
            >
              <Teaser
                teaser={teaser}
                id={active}
                sizes="320px"
                reduceMotion={reduceMotion}
              />
            </div>
          </div>

          {/* MOBILE TEASER */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              relative mt-8
              aspect-[16/9]
              w-full
              overflow-hidden sm:hidden
            "
          >
            <Teaser
              teaser={teaser}
              id={active}
              sizes="100vw"
              reduceMotion={reduceMotion}
            />
          </div>

          {/* FOOTER */}

          <motion.div
            className="
              mt-6 flex flex-wrap
              items-end justify-between gap-6
              border-t border-white/15 pt-6
            "
            initial={
              reduceMotion
                ? false
                : { opacity: 0 }
            }
            animate={{
              opacity: 1,
              transition: {
                delay: reduceMotion
                  ? 0
                  : 0.7,
                duration: reduceMotion
                  ? 0
                  : 0.3,
              },
            }}
            exit={{ opacity: 0 }}
          >
            {/* SOCIAL LINKS */}

            <div className="flex flex-wrap gap-3">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line meta inline-flex min-h-[44px] items-center rounded-sm px-1 text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange"
              >
                {t("footer.instagram")}
              </a>

              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line meta inline-flex min-h-[44px] items-center rounded-sm px-1 text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange"
              >
                {t("footer.linkedin")}
              </a>

              <a
                href={site.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line meta inline-flex min-h-[44px] items-center rounded-sm px-1 text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange"
              >
                {t("footer.whatsapp")}
              </a>
            </div>

            {/* LANGUAGE / WEBSITE */}

            <div className="flex flex-wrap items-center gap-4">
              <span
                className="meta text-xs opacity-60"
                dir="ltr"
              >
                {site.websiteLabel}
              </span>

              <LangSwitch />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
