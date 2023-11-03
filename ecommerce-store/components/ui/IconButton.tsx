import React from 'react';

import { cn } from '@/lib/utils';

const IconButton = () => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition",
        className
      )}
    >

    </button>
  )
}

export default IconButton