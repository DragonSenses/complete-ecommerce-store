"use client";

import React from 'react';

import usePreviewModal from '@/hooks/use-preview-modal';
import Modal from '@/components/ui/Modal';

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
        
      </div>
    </Modal>
  )
}

export default PreviewModal