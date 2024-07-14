'use client'

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";
import LocaleSwitch from "./LocaleSwitch";
import { FaBars } from "react-icons/fa";
import { LinkData } from "@/lib/types";
import { useAppDispatch } from "@/lib/hooks";
import { setSidebarOpen } from "@/lib/features/global/globalSlice";

export default function Header({ lang, links }: { lang: string, links: LinkData[] }) {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const dispatch = useAppDispatch()

  const handleSidebarOpen = () => {
    dispatch(setSidebarOpen(true))
  }

  return (
    <header className="z-[999] relative">
      <motion.div
        className="fixed top-0 left-1/2 h-[4.5rem] w-full rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.25rem] sm:w-[36rem] sm:rounded-full dark:bg-gray-950 dark:border-black/40 dark:bg-opacity-75"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
      >
        <div className="md:hidden flex items-center justify-start absolute top-[1rem] left-[1rem] py-2" onClick={handleSidebarOpen}>
          <FaBars />
        </div>
        <div className="md:hidden flex items-center justify-start absolute top-[1rem] right-[1rem] py-2">
          <LocaleSwitch lang={lang} />
        </div>
      </motion.div>
      <nav className="hidden md:flex fixed top-[0.15rem] left-1/2 h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0">
        <ul className="flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 sm:w-[initial] sm:flex-nowrap">
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
                    className="bg-gray-100 rounded-full absolute inset-0 -z-10 dark:bg-gray-800"
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
        <LocaleSwitch lang={lang} />
      </nav>
    </header>
  );
}
