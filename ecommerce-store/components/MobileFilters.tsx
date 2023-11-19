import React, { useState } from 'react';

import { Color, Size } from '@/types';

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

    <div>MobileFilters</div>
  )
}

export default MobileFilters