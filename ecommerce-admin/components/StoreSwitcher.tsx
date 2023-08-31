"use client";

// Global Imports
import React, { useState } from 'react';
import { Store } from '@prisma/client';
import { Store as StoreIcon} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

// Local Imports
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
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

  // Currently selected store's id is the same as the id from the URL
  const currentStore = formattedItems.find((item) => item.value === params.storeId);

  // State variable that controls Popover
  const [open, setOpen] = useState(false);

  // Store selector function which triggers when we click on a different store
  const onStoreSelect = (store: { value: string, label: string}) => {
    setOpen(false);
    router.push(`/${store.value}`);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button>
          <StoreIcon />
        </Button>
      </PopoverTrigger>
    </Popover>
  )
}
