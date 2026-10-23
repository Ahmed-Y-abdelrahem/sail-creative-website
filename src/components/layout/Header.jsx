
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

    return (
      bare === path ||
      bare.startsWith(`${path}/`)
    );
  };

  // Add Case Studies after Work without changing site.js
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

  return (
    <>
      {/* Main header */}
      <motion.header
        className="fixed inset-x-0 top-0 z-[80] flex items-center justify-between px-[var(--pad)] py-5 text-white mix-blend-difference"
        animate={{
          y: hidden && !open ? "-110%" : "0%",
        }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {/* Logo */}
        <TransitionLink
          href={href("/")}
          aria-label={t("a11y.home")}
          className="relative z-[81] block"
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

        {/* Desktop navigation */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-6 lg:flex xl:gap-9"
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
              className="group relative whitespace-nowrap py-2 text-[0.875rem] font-medium xl:text-[0.9375rem]"
            >
              {getNavLabel(item)}

              <span
                aria-hidden
                className={`absolute inset-x-0 bottom-0 h-px origin-left bg-current transition-transform duration-500 ease-[var(--ease)] rtl:origin-right ${
                  isActive(item.href)
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </TransitionLink>
          ))}
        </nav>

        {/* Language and mobile menu */}
        <div className="relative z-[81] flex items-center gap-6">
          <LangSwitch className="hidden lg:inline" />

          <button
            type="button"
            className="flex items-center gap-3 lg:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="meta">
              {open
                ? t("nav.close")
                : t("nav.menu")}
            </span>

            <span
              className="relative block h-3 w-6"
              aria-hidden
            >
              <span
                className={`absolute inset-x-0 h-px bg-current transition-all duration-500 ${
                  open
                    ? "top-1/2 rotate-45"
                    : "top-0"
                }`}
              />

              <span
                className={`absolute inset-x-0 h-px bg-current transition-all duration-500 ${
                  open
                    ? "top-1/2 -rotate-45"
                    : "bottom-0"
                }`}
              />
            </span>
          </button>
        </div>
      </motion.header>

      {/* Contact CTA */}
      <motion.div
        className="fixed end-[var(--pad)] top-[4.5rem] z-[79] hidden lg:block"
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
              className="group inline-flex items-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-semibold text-night"
            >
              {t("nav.talk")}

              <Arrow
                className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                stroke={16}
              />
            </TransitionLink>
          </Magnetic>
        )}
      </motion.div>

      {/* Mobile navigation */}
      <MenuOverlay
        open={open}
        onClose={close}
      />
    </>
  );
}
