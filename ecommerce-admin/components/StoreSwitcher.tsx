"use client";

// Global Imports
import React from 'react';
import { Store } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';

// Local Imports
import { PopoverTrigger } from '@/components/ui/popover';
import { useStoreModal } from '@/hooks/use-store-modal';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
};

export default function StoreSwitcher({
  className,
  // Default value of empty array to safely iterate over even if items are not loaded
  items = [] 
}: StoreSwitcherProps) {
  
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id
  }));

  const currentStore = formattedItems.find((item => item.value === params.storeId));

  return (
    <div>StoreSwitcher</div>
  )
}
