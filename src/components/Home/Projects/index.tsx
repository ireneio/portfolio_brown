"use client";

import React from "react";
import SectionHeading from "@/components/SectionHeading";
import Project from "./Project";
import { useSectionInView } from "@/lib/useSectionInView";
import { ProjectData } from "@/lib/types";
import Modal from "@/components/Modal";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { FaTimes } from "react-icons/fa";
import { setShowProjectImageModal } from "@/lib/features/project/projectSlice";
import Carousel from "react-multi-carousel";
import Image from "next/image";

import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

export default function Projects({ t, data }: any) {
  const dispatch = useAppDispatch()
  const showProjectImageModal = useAppSelector(state => state.projectSlice.showProjectImageModal)
  const modalImageList = useAppSelector(state => state.projectSlice.modalImageList)
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
      <Modal show={showProjectImageModal}>
        <div className="absolute right-0 py-[24px] px-[24px] cursor-pointer" onClick={() => dispatch(setShowProjectImageModal(false))}>
          <FaTimes className="text-[24px]" />
        </div>
        <div className="px-[24px] py-[72px]">
          <Carousel
            responsive={responsive}
            showDots={true}
            className="max-h-[95vh]"
          >
            {modalImageList.map((image: any, index) => {
              return (
                <Image
                  key={index}
                  quality={100}
                  src={image.src}
                  alt={image.alt}
                />
              )
            })}
          </Carousel>
        </div>
      </Modal>
    </section>
  );
}