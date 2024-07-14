"use client";

import React from "react";
import SectionHeading from "@/components/SectionHeading";
import Project from "./Project";
import { useSectionInView } from "@/lib/useSectionInView";
import { ProjectData } from "@/lib/types";

export default function Projects({ t, data }: any) {
  const { ref } = useSectionInView("Projects", 0.5);

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28">
      <SectionHeading>{t.projects.title}</SectionHeading>
      <div>
        {data.map((project: ProjectData, index: number) => (
          <React.Fragment key={index}>
            <Project {...project} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}