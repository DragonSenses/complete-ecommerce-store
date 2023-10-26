"use client";

import React from 'react';
import { ShoppingBag } from 'lucide-react';

import Button from '@/components/ui/Button';

export default function NavbarActions() {
  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button className="flex items-center rounded-full bg-black px-4 py-2">
        <ShoppingBag 
          size={20}
          color="white"
        />
      </Button>
    </div>
  )
}
