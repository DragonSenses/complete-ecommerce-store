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
      <h1 className=''>
        {data.name}
      </h1>
    </div>
  )
}

export default Info