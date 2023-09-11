import React, { useState, useEffect } from 'react';

// Hook that safely access Windows Object in Next.js
export const useOrigin = () => {
  // Declare isMounted state variable and initialize it to false
  const [isMounted, setIsMounted] = useState(false);

  // Check if window object and its location property are defined
  // Assign it to origin if true, otherwise pass in an empty string
  const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : '';

  // useEffect hook to set isMounted variable to true
  // Delays the execution of client-side-only code until after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []); // Only run once after the initial render

  // Prevent rendering of the component before the effect has run
  // To protect from hydration errors or unwanted flashes of content
  if (!isMounted) {
    return null;
  }

  return origin;
}
