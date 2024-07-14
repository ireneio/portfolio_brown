"use client";

import React from "react";
import SectionHeading from "@/components/SectionHeading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/useSectionInView";

export default function About({ t }: any) {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[60rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>{t.about.title}</SectionHeading>
      <p className="mb-3">
        {t.about.introduction}
      </p>
    </motion.section>
  );
}
