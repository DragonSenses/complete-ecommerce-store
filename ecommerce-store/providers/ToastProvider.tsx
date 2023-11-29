"use client";

import React from 'react';
import { Toaster } from 'react-hot-toast';

/**
 * Defines a functional component that serves as a provider, 
 * to pass data to any nested components that need to access it. 
 * @returns a Toaster element
 */
const ToastProvider = () => {
  return (
    // Render the Toaster element with default props
    <Toaster />
  )
}

// Export the ToastProvider component
export default ToastProvider