'use client';

import React from "react";
import SectionHeading from "@/components/SectionHeading";
import { useSectionInView } from "@/lib/useSectionInView";
import { useTheme } from "@/context/theme-context";
import Timeline from "./Timeline";
// import dynamic from "next/dynamic";

// const Timeline = dynamic(() => import('./Timeline'), {
//   ssr: false
// });

export default function Experience({ t, data }: any) {
  const { ref } = useSectionInView("Experience");
  const { theme } = useTheme();

  return (
    <section id="experience" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40">
      <SectionHeading>{t.experience.title}</SectionHeading>
      <Timeline data={data} />
    </section>
  );
}
