import { StaticImageData } from "next/image";
import React from "react";

export interface ExperienceData {
  title: string;
  role: string;
  description: string;
  location: string;
  date: string;
  icon: React.ReactNode;
}

export interface LinkData {
  name: string;
  hash: string;
  key: string;
  icon: React.ReactNode;
}

export interface ProjectData {
  title: string;
  brand: string;
  description: string;
  tags: string[];
  imageUrls?: StaticImageData[];
}
