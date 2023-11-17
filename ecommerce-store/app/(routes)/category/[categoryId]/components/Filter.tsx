"use client";

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import queryString from "query-string"

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

  /**
   * Update the URL query parameters when a user clicks on a filter, and remove
   * the filter if it is already active
   * @param id a string that represents the unique identifier of the element
   *           that triggered the event 
   */
  const onClick = (id: string) => {
    // Parse the current URL's query string into an object
    const currentQuery = queryString.parse(searchParams.toString());

    // Generate a new object that contains the updated query parameters
    const query = {
      ...currentQuery,
      [valueKey]: id
    };

    // Remove filter from query parameters if it is already active
    if (currentQuery[valueKey] == id) {
      query[valueKey] = null;
    }

    // Generate a URL with updated query parameters
    const url = queryString.stringifyUrl({
      url: window.location.href,
      query
    }, { skipNull: true });

    // Navigate to the specified URL
    router.push(url);
  }

  return (
    <div className='mb-8'>
      <h3 className='text-lg font-semibold'>
        {name}
      </h3>
      <hr className='my-4'/>
      <div className='flex flex-wrap gap-2'>
        {data.map((filter) => (
          <div
            className='flex items-center'
            key={filter.id}
          >
          </div>
        ))}
      </div>
    </div>
  )
}

export default Filter