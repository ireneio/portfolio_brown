"use client";

import { useTheme } from "@/context/theme-context";
import clsx from "clsx";
import * as React from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, show }: { children: React.ReactNode, show: boolean }) {
  const { theme } = useTheme()
  const [mounted, setMounted] = React.useState(false);

  const content =  React.useMemo(() => {
    return (
      <div
        className={clsx(
          "fixed top-0 left-0 right-0 bottom-0 z-[1002] flex items-center justify-center bg-black bg-opacity-[0.5]",
          show ? 'block' : 'hidden'
        )}
      >
        <div
          className={clsx(
            "w-[100vw] h-[100vh] md:w-[95vw] md:h-[95vh] md:rounded-[8px] relative",
            theme === 'light' ? 'bg-white' : 'bg-gray-800'
          )}
        >
          {children}
        </div>
      </div>
    )
  }, [show, theme, children])

  function disableOnScroll(event: Event) {
    event.preventDefault();
  }

  React.useEffect(() => {
    if (show) {
      document.body.style.overflowY = 'hidden'
      document.body.addEventListener('scroll', disableOnScroll, { passive: false });
    } else {
      document.body.style.overflowY = 'auto'
      document.body.removeEventListener('scroll', disableOnScroll)
    }
  }, [show])

  React.useEffect(() => setMounted(true), []);

  return mounted ? createPortal(content, document.body) : null;
}
