"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const IntroContext = createContext({ ready: true });
export const useIntro = () => useContext(IntroContext);

const KEY = "sail-intro-seen";

/**
 * First visit per session: SAIL wordmark rises, a line draws forward, the curtain lifts.
 * A head script (see layout) sets data-intro="skip" so returning visitors never see a flash.
 */
export function IntroProvider({ children }) {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {}
    if (seen || reduce) {
      setShow(false);
      setReady(true);
      return;
    }
    const done = setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
    }, 1700);
    const go = setTimeout(() => setReady(true), 1250);
    return () => {
      clearTimeout(done);
      clearTimeout(go);
    };
  }, [reduce]);

  return (
    <IntroContext.Provider value={{ ready }}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            key="intro"
            className="intro fixed inset-0 z-[140] flex flex-col items-center justify-center bg-night"
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            initial={{ clipPath: "inset(0 0 0% 0)" }}
            aria-hidden
          >
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              >
            <Image src="/brand/sail-wordmark.png?v=2" alt="" width={927} height={296} priority unoptimized className="h-auto w-[min(58vw,26rem)]" />              </motion.div>
            </div>
            <div className="mt-8 h-px w-[min(58vw,26rem)] overflow-hidden bg-white/15">
              <motion.div
                className="h-full bg-orange"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </IntroContext.Provider>
  );
}
