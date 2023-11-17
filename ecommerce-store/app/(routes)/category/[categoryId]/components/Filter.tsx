"use client";

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Color, Size } from '@/types';

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
  // URLSearchParams interface to read & update the query string of current URL
  const searchParams = useSearchParams();

  // object that contains current route info & methods to manipulate app router
  const router = useRouter();

  // Get the currently selected value of the query parameter
  const selectedValue = searchParams.get(valueKey);

  // onClick function that accepts id

  return (
    <div>Filter</div>
  )
}

export default Filter