"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ProjectData } from "@/lib/types";
import ImageCarousel from "./ImageCarousel";
import clsx from "clsx";
import { useAppDispatch } from "@/lib/hooks";
import { setInitalModalImageIndex, setModalImageList, setShowProjectImageModal } from "@/lib/features/project/projectSlice";
import { FaExpandArrowsAlt, FaWindowMaximize } from "react-icons/fa";
import { useTheme } from "@/context/theme-context";

export default function Project({
  title,
  brand,
  description,
  tags,
  imageUrls,
}: ProjectData) {
  const dispatch = useAppDispatch()
  const { theme } = useTheme()
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  const imagesArr = useMemo(() => {
    if (!imageUrls) {
      return []
    }
    return imageUrls.map((src) => {
      return {
        src,
        alt: title,
      }
    })
  }, [imageUrls])

  const handleProjectImageClick = (index: number) => {
    dispatch(setInitalModalImageIndex(index))
    dispatch(setModalImageList(imagesArr))
    const tid = setTimeout(() => {
      dispatch(setShowProjectImageModal(true))
      clearTimeout(tid)
    }, 100)
  }

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgess,
        opacity: opacityProgess,
      }}
      className="group mb-3 sm:mb-8 last:mb-0"
    >
      <section className="bg-gray-100 max-w-[60rem] border border-black/5 rounded-lg overflow-hidden sm:pr-8 relative hover:bg-gray-200 transition sm:group-even:pl-8 dark:text-white dark:bg-white/10 dark:hover:bg-white/20">
        <div className="sm:hidden flex justify-center pt-4">
          <ImageCarousel images={imagesArr} />
        </div>
        <div className="pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col h-full sm:group-even:ml-auto">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="mt-2 text-lg font-normal">{brand}</p>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-white/70" dangerouslySetInnerHTML={{ __html: description }}>
          </p>
          <ul className="flex flex-wrap mt-4 gap-2">
            {tags.map((tag, index) => (
              <li
                className="bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70"
                key={index}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
        {imageUrls ? imageUrls.map((url, index) => {
          return (
            <div
              style={{ top: 8 + (index * 80) }}
              className="
                  absolute hidden sm:block -right-40 max-w-[26rem] rounded-lg shadow-2xl
                  transition
                  group-hover:scale-[1.04]
                  group-hover:-translate-x-3
                  group-hover:translate-y-3
                  group-hover:-rotate-2
  
                  group-even:group-hover:translate-x-3
                  group-even:group-hover:translate-y-3
                  group-even:group-hover:rotate-2
  
                  group-even:right-[initial] group-even:-left-40
  
                  aspect-[12/9]
                  object-contain
                  align-middle
                  group-even:hover:left-0
                  group-odd:hover:right-0
                  hover:z-[2]
                  hover:bg-white
                  hover:bg-opacity-[0.7]
              "
              key={index}
            >
              <Image
                src={url}
                alt={title}
                quality={95}
                className="
                  w-[26rem]
                  aspect-[12/9]
                  object-contain
                  align-middle
                "
              />
              <div
                className={clsx("absolute top-[1rem] left-[1rem] cursor-pointer px-2 py-2 rounded-[4px]", theme === 'light' ? 'bg-gray-800' : 'bg-gray-500')}
                onClick={() => handleProjectImageClick(index)}
              >
                <FaExpandArrowsAlt />
              </div>
            </div>
          )
        }) : null}
      </section>
    </motion.div>
  );
}
