"use client";
import { useEffect, useState } from "react";

export function useMediaQuery(query, initial = false) {
  const [matches, setMatches] = useState(initial);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return matches;
}

/** True only for mouse-like pointers — gates cursor effects and heavy parallax. */
export const useFinePointer = () => useMediaQuery("(hover: hover) and (pointer: fine)");
export const useDesktop = () => useMediaQuery("(min-width: 1024px)");
