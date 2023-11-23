"use client";

import React, { Fragment } from 'react';
import { Transition } from '@headlessui/react';

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
    <Transition show={open} as={Fragment}>

    </Transition>
  )
}

export default Modal