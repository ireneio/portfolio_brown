"use client";

import React, { useEffect, useRef } from "react";
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
import { useTheme } from "@/context/theme-context";
import clsx from "clsx";

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

export default function Projects({ t, data }: { t: any; data: ProjectData[] }) {
  const { theme } = useTheme()
  const dispatch = useAppDispatch()
  const showProjectImageModal = useAppSelector(state => state.projectSlice.showProjectImageModal)
  const modalImageList = useAppSelector(state => state.projectSlice.modalImageList)
  const initalModalImageIndex = useAppSelector(state => state.projectSlice.initalModalImageIndex)
  const { ref } = useSectionInView("Projects", 0.5);
  const carouselref = useRef<any>(null)

  useEffect(() => {
    if (showProjectImageModal) {
      if (carouselref.current) {
        carouselref.current.state.currentSlide = initalModalImageIndex
      }
    }
  }, [showProjectImageModal])

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
            ref={carouselref}
            responsive={responsive}
            itemClass="flex justify-center"
          >
            {modalImageList.map((image: any, index) => {
              return (
                <Image
                  key={index}
                  quality={100}
                  src={image.src}
                  alt={image.alt}
                  className={clsx(
                    "max-h-[82vh] object-contain rounded-[8px]",
                    theme === 'light' ? 'bg-gray-300 bg-opacity-[0.3]' : 'bg-gray-700 bg-opacity-[0.3]'
                  )}
                />
              )
            })}
          </Carousel>
        </div>
      </Modal>
    </section>
  );
}