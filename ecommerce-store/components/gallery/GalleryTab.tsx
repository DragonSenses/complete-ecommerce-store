import React from 'react';
import Image from 'next/image';
import { Tab } from '@headlessui/react';

import { cn } from '@/lib/utils';
import { Image as ImageType } from '@/types';

interface GalleryTabProps {
  image: ImageType
}

const GalleryTab: React.FC<GalleryTabProps> = ({
  image
}) => {
  return (
    <Tab className='relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white'>
      {({ selected }) => (
        <div>
          <span className='absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md'>
            <Image
              fill
              src={image.url}
              alt=""
              className="object-cover object-center"
            >

            </Image>
          </span>
          <span />
        </div>
      )}
    </Tab>
  )
}

export default GalleryTab