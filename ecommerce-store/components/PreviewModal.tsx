"use client";

import React from 'react';

import usePreviewModal from '@/hooks/use-preview-modal';

const PreviewModal = () => {
  const previewModal = usePreviewModal();

  // Use custom hook to access the state of PreviewModal to display product info
  const product = usePreviewModal((state) => state.data);


  return (
    <div>PreviewModal</div>
  )
}

export default PreviewModal