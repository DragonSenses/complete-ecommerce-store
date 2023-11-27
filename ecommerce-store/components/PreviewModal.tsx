"use client";

import React from 'react';

import usePreviewModal from '@/hooks/use-preview-modal';
import Modal from '@/components/ui/Modal';
import Gallery from '@/components/gallery';

const PreviewModal = () => {
  const previewModal = usePreviewModal();

  // Use custom hook to access the state of PreviewModal to display product info
  const product = usePreviewModal((state) => state.data);

  // If product has not loaded any data, do not return a preview modal
  if (!product){
    return null;
  }

  return (
    <Modal
      open={previewModal.isOpen}
      onClose={previewModal.onClose}
    >
      <div className='grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8'>
        <div className='sm:col-span-4 lg:col-span-5'>
          <Gallery images={product.images} />
        </div>
        <div className='sm:col-span-8 lg:col-span-7'>

        </div>
      </div>
    </Modal>
  )
}

export default PreviewModal