'use client'

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";
import LocaleSwitch from "../common/LocaleSwitch";
import { FaBars } from "react-icons/fa";
import { LinkData } from "@/lib/types";
import { useAppDispatch } from "@/lib/hooks";
import { setSidebarOpen } from "@/lib/features/global/globalSlice";
import ThemeSwitch from "../common/ThemeSwitch";

export default function Header({ lang, links }: { lang: string, links: LinkData[] }) {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const dispatch = useAppDispatch()

  const handleSidebarOpen = () => {
    dispatch(setSidebarOpen(true))
  }

  return (
    <header className="z-[999] relative">
      {/* mobile */}
      <motion.div
        className="fixed top-0 left-1/2 h-[4.5rem] w-full rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] md:top-6 md:h-[3.25rem] md:w-[min(90%,60rem)] md:rounded-full dark:bg-gray-950 dark:border-black/40 dark:bg-opacity-75"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
      >
        <div className="md:hidden flex items-center justify-center absolute px-[1rem] h-full" onClick={handleSidebarOpen}>
          <FaBars className="text-[24px]" />
        </div>
        <div className="md:hidden flex items-center justify-start absolute top-[1.1rem] right-[1rem] py-2">
          <LocaleSwitch lang={lang} />
          <ThemeSwitch />
        </div>
      </motion.div>
      {/* desktop */}
      <nav className="hidden md:flex fixed top-[0.15rem] left-1/2 h-12 -translate-x-1/2 py-2 md:top-[1.7rem] md:h-[initial] md:py-0">
        <ul className="flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 md:w-[initial] md:flex-nowrap">
          {links.map((link: LinkData) => (
            <motion.li
              className="h-3/4 flex items-center justify-center relative"
              key={link.hash}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Link
                className={clsx(
                  "flex w-full items-center justify-center px-3 py-3 hover:text-gray-950 transition dark:text-gray-500 dark:hover:text-gray-300 text-nowrap",
                  {
                    "text-gray-950 dark:text-gray-200":
                      activeSection === link.key,
                  }
                )}
                href={link.hash}
                onClick={() => {
                  setActiveSection(link.key);
                  setTimeOfLastClick(Date.now());
                }}
              >
                {link.name}

                {link.key === activeSection && (
                  <motion.span
                    className="bg-gray-200 rounded-full absolute inset-0 -z-10 dark:bg-gray-800"
                    layoutId="activeSection"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  ></motion.span>
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
        <div className="flex items-center">
          <LocaleSwitch lang={lang} />
          <ThemeSwitch />
        </div>
      </nav>
    </header>
  );
}
