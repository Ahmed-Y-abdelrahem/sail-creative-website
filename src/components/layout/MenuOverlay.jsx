"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";

import TransitionLink from "./TransitionLink";
import LangSwitch from "@/components/shared/LangSwitch";
import { useLocale } from "@/components/shared/LocaleProvider";
import { nav, site } from "@/data/site";
import { M } from "@/data/media";
import { ease } from "@/lib/motion";
import { pad2 } from "@/lib/utils";

// One visual teaser per destination — real portfolio work.
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

  events: {
    img: M("radicon/event-1"),
    alt: "Radicon event",
  },

  contact: {
    img: M("tricycle/col2"),
    alt: "Tricycle social posts",
  },
};

function Teaser({ teaser, id, sizes }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={id}
        className="absolute inset-0"
        initial={{
          clipPath: "inset(100% 0 0 0)",
        }}
        animate={{
          clipPath: "inset(0% 0 0 0)",
        }}
        exit={{
          clipPath: "inset(0 0 100% 0)",
        }}
        transition={{
          duration: 0.6,
          ease: [0.76, 0, 0.24, 1],
        }}
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

export default function MenuOverlay({
  open,
  onClose,
}) {
  const { t, href } = useLocale();

  const pathname = usePathname();

  const [active, setActive] = useState("home");

  /**
   * Safety fallback:
   * if navigation changes for any reason,
   * make sure the menu is closed.
   */
  useEffect(() => {
    if (open) {
      onClose();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  /**
   * Lock page scrolling while menu is open.
   * Also allow ESC to close the menu.
   */
  useEffect(() => {
    if (!open) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [open, onClose]);

  /**
   * Called immediately when a menu item is selected.
   *
   * This fixes the mobile issue:
   * the overlay closes as soon as the user chooses a page.
   */
  const handleNavigation = (itemKey) => {
    setActive(itemKey);
    onClose();
  };

  const teaser = teasers[active];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t("nav.menu")}
          className="
            tex-night grain
            fixed inset-0 z-[75]
            flex flex-col
            overflow-y-auto
            px-[var(--pad)]
            pb-8
            pt-28
          "
          initial={{
            clipPath:
              "inset(0 0 100% 0)",
          }}
          animate={{
            clipPath:
              "inset(0 0 0% 0)",
          }}
          exit={{
            clipPath:
              "inset(0 0 100% 0)",
          }}
          transition={{
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          {/* Navigation */}
          <div className="relative flex flex-1 items-start justify-between gap-6">
            <ul className="relative z-10 flex flex-col gap-1">
              {nav.map((item, i) => (
                <li
                  key={item.key}
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={{
                      y: "110%",
                    }}
                    animate={{
                      y: 0,
                    }}
                    exit={{
                      y: "110%",
                    }}
                    transition={{
                      duration: 0.9,
                      ease,
                      delay:
                        0.25 + i * 0.06,
                    }}
                  >
                    <TransitionLink
                      href={href(item.href)}
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
                        group
                        flex items-baseline
                        gap-4
                        py-1
                      "
                    >
                      <span className="meta w-6 tabular-nums text-orange">
                        {pad2(i + 1)}
                      </span>

                      <span
                        className="
                          display fs-xl
                          transition-colors
                          duration-300
                          group-hover:text-orange
                          group-focus-visible:text-orange
                        "
                      >
                        {t(
                          `nav.${item.key}`
                        )}
                      </span>
                    </TransitionLink>
                  </motion.div>
                </li>
              ))}
            </ul>

            {/* Desktop / tablet teaser */}
            <div
              className="
                pointer-events-none
                absolute
                end-0
                top-0
                hidden
                aspect-[4/5]
                w-[38vw]
                max-w-[20rem]
                overflow-hidden
                sm:block
              "
            >
              <Teaser
                teaser={teaser}
                id={active}
                sizes="320px"
              />
            </div>
          </div>

          {/* Mobile teaser */}
          <div
            className="
              pointer-events-none
              relative
              mt-8
              aspect-[16/9]
              w-full
              overflow-hidden
              sm:hidden
            "
          >
            <Teaser
              teaser={teaser}
              id={active}
              sizes="100vw"
            />
          </div>

          {/* Footer */}
          <motion.div
            className="
              mt-6
              flex flex-wrap
              items-end
              justify-between
              gap-6
              border-t
              border-white/15
              pt-6
            "
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                delay: 0.7,
              },
            }}
            exit={{
              opacity: 0,
            }}
          >
            {/* Social links */}
            <div className="flex gap-6">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line meta"
              >
                {t("footer.instagram")}
              </a>

              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line meta"
              >
                {t("footer.linkedin")}
              </a>

              <a
                href={site.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line meta"
              >
                {t("footer.whatsapp")}
              </a>
            </div>

            {/* Language / Website */}
            <div className="flex items-center gap-6">
              <span
                className="meta opacity-60"
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