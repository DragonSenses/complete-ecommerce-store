import { Color, Size } from '@/types';
import React from 'react';

interface FilterProps {
  data: (Size | Color)[];
  name: string;
  valueKey: string;
}

const Filter: React.FC<FilterProps> = ({
  data,
  name,
  valueKey
}) => {
  return (
    <div>Filter</div>
  )
}

export default Filter