import React from 'react';

import { PopoverTrigger } from '@/components/ui/popover';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
}

export default function StoreSwitcher() {
  return (
    <div>StoreSwitcher</div>
  )
}
