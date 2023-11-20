import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Dialog } from '@headlessui/react';

import { Color, Size } from '@/types';
import Button from '@/components/ui/Button';

interface MobileFiltersProps {
  sizes: Size[];
  colors: Color[];
}

const MobileFilters:React.FC<MobileFiltersProps> = ({
  sizes,
  colors
}) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <Button onClick={onOpen} className='flex items-center gap-x-2 lg:hidden'>
        Filters
        <Plus size={20} />
      </Button>

      <Dialog open={open} onClose={onClose} as='div' className='relative z-40 lg:hidden'>
        {/* Background */}
        {/* Dialog Poosition */}
      </Dialog>
    </>
  )
}

export default MobileFilters