"use client"

import React from 'react';
import Image from "next/image";
import { Tab } from "@headlessui/react";

import { Image as ImageType } from "@/types";

interface GalleryProps {
  images: ImageType[];
};

const Gallery: React.FC<GalleryProps> = ({
  images
}) => {
  return (
    <div>Gallery</div>
  )
}

export default Gallery