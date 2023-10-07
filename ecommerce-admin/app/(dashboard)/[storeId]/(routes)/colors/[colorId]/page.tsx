// Global Imports
import prismadb from '@/lib/prismadb';
import React from 'react';

// Local Imports
import SizeForm from './components/SizeForm';

const SizePage =  async ({
  params
}:{
  params: { sizeId: string }
}) => {

  // Fetch an existing size
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId
    }
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size}/>
      </div>
    </div>
  )
}

export default SizePage;