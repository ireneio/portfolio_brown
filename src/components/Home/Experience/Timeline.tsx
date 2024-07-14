'use client';

import { useTheme } from "@/context/theme-context";
import { ExperienceData } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component"

import 'react-vertical-timeline-component/style.min.css';

const Timeline = ({ data }: { data: ExperienceData[] }) => {
  const { theme } = useTheme()

  return (
    <VerticalTimeline
      lineColor=""
      animate={false}
    >
    {data.map((item: ExperienceData, index: number) => (
      <React.Fragment key={index}>
        <VerticalTimelineElement
          contentStyle={{
            background:
              theme === "light" ? "#f3f4f6" : "rgba(255, 255, 255, 0.05)",
            boxShadow: "none",
            border: "1px solid rgba(0, 0, 0, 0.05)",
            textAlign: "left",
            padding: "1.3rem 2rem",
          }}
          contentArrowStyle={{
            borderRight:
              theme === "light"
                ? "0.4rem solid #9ca3af"
                : "0.4rem solid rgba(255, 255, 255, 0.5)",
          }}
          date={item.date}
          icon={item.icon}
          iconStyle={{
            background:
              theme === "light" ? "white" : "rgba(255, 255, 255, 0.15)",
            fontSize: "1.5rem",
          }}
        >
          <h3 className="font-semibold capitalize text-xl">{item.title}</h3>
          <p className="font-normal !mt-0 text-md">{item.role}</p>
          <p className="font-normal !mt-0 text-md">{item.location}</p>
          <div
            className="!mt-1 !font-normal text-gray-700 dark:text-white/75 text-sm"
          >
            <ul className="list-disc list-inside" dangerouslySetInnerHTML={{ __html: item.description }}></ul>
          </div>
        </VerticalTimelineElement>
      </React.Fragment>
    ))}
  </VerticalTimeline>
  )
}

export default Timeline
