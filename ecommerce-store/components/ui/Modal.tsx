"use client";

import React from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
}) => {
  return (
    <div>Modal</div>
  )
}

export default Modal