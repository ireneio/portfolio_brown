'use client';

import React from "react";
import SectionHeading from "@/components/common/SectionHeading";
import { useSectionInView } from "@/lib/useSectionInView";
import Timeline from "./Timeline";

export default function Experience({ t, data }: any) {
  const { ref } = useSectionInView("Experience");

  return (
    <section id="experience" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40">
      <SectionHeading>{t.experience.title}</SectionHeading>
      <Timeline data={data} />
    </section>
  );
}
