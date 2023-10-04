// Global Imports
import React from 'react';
import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';

// Local Imports
import SizesClient from './components/client';
import { SizeColumn } from './components/columns';

const SizesPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  
  // Fetch all sizes specific to the active store
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Format each Size into a SizeColumn
  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }))

  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizesClient data={formattedSizes}/>
      </div>
    </div>
  );
}

export default SizesPage;