"use client";
import { LocaleProvider } from "@/components/shared/LocaleProvider";
import { IntroProvider } from "@/components/shared/IntroProvider";
import { TransitionProvider } from "./PageTransition";
import ScrollProgress from "./ScrollProgress";
import Cursor from "@/components/ui/Cursor";

export default function Providers({ locale, children }) {
  return (
    <LocaleProvider locale={locale}>
      <IntroProvider>
        <TransitionProvider>
          {children}
          <ScrollProgress />
          <Cursor />
          <div aria-hidden className="site-grain" />
        </TransitionProvider>
      </IntroProvider>
    </LocaleProvider>
  );
}
