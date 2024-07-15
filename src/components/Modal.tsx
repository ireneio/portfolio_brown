"use client";

import { useTheme } from "@/context/theme-context";
import clsx from "clsx";
import * as React from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, show }: { children: React.ReactNode, show: boolean }) {
  const { theme } = useTheme()
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const content =  React.useMemo(() => {
    if (show) {
      return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-[1002] flex items-center justify-center bg-black bg-opacity-[0.5]">
          <div className={clsx("w-[95vw] h-[95vh] rounded-[8px] relative", theme === 'light' ? 'bg-white' : 'bg-gray-800')}>
            {children}
          </div>
        </div>
      )
    }
    return null
  }, [show]) 

  React.useEffect(() => {
    if (show) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'auto'
    }
  }, [show])

  return mounted ? createPortal(content, document.body) : null;
}
