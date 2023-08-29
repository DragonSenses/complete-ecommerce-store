"use client"

// Global Imports
import React from 'react';

// Local Imports
import { cn } from '@/lib/utils';

export default function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
    >

    </nav>
  )
}
