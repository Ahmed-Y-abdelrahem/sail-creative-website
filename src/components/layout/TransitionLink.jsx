
"use client";

import Link from "next/link";
import { useTransitionNav } from "./PageTransition";

const isModified = (event) =>
  event.metaKey ||
  event.ctrlKey ||
  event.shiftKey ||
  event.altKey ||
  event.button !== 0;

export default function TransitionLink({
  href,
  children,
  onClick,
  target,
  download,
  ...rest
}) {
  const { navigate } = useTransitionNav();

  const isStringHref = typeof href === "string";

  const internal =
    isStringHref &&
    href.startsWith("/") &&
    !href.startsWith("//");

  if (!internal) {
    return (
      <a
        href={href}
        target={target || "_blank"}
        rel="noopener noreferrer"
        download={download}
        onClick={onClick}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      target={target}
      download={download}
      {...rest}
      onClick={(event) => {
        onClick?.(event);

        if (
          event.defaultPrevented ||
          isModified(event) ||
          (target && target !== "_self") ||
          download != null
        ) {
          return;
        }

        event.preventDefault();
        navigate(href);
      }}
    >
      {children}
    </Link>
  );
}
