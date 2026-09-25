"use client";
import Link from "next/link";
import { useTransitionNav } from "./PageTransition";

const isModified = (e) => e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;

export default function TransitionLink({ href, children, onClick, ...rest }) {
  const { navigate } = useTransitionNav();
  const internal = href.startsWith("/") && !href.startsWith("//");

  if (!internal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (isModified(e) || e.defaultPrevented) return;
        e.preventDefault();
        navigate(href);
      }}
    >
      {children}
    </Link>
  );
}
