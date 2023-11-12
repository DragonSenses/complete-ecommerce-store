import React from 'react';

import { Product } from '@/types';

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({
  data
}) => {
  return (
    <div>
      <h1 className='text-3xl font-bold text-gray-900'>
        {data.name}
      </h1>
    </div>
  )
}

export default Info