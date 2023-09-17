"use client";

// Global Imports
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Trash } from 'lucide-react';

// Local Imports
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value
}) => {
  // Declare isMounted state variable and initialize it to false
  const [isMounted, setIsMounted] = useState(false);

  // useEffect hook to set isMounted variable to true
  // Delays the execution of client-side-only code until after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []); // Only run once after the initial render
  
  // Upload event handler
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  }

  // Prevent rendering of the component before the effect has run
  // To protect from hydration errors or unwanted flashes of content
  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <div className="z-10 aboslute top-2 right-2">
              <Button
               type="button"
               onClick={() => onRemove(url)} 
               variant="destructive"
               size="icon"
              > 
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image 
              fill
              className="object-cover"
              alt="Image"
              src={url}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageUpload