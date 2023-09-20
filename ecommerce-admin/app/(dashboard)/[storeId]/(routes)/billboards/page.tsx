// Global Imports
import React from 'react';
import prismadb from '@/lib/prismadb';

// Local Imports
import BillboardClient from './components/client';

const BillboardsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  
  // Fetch all Billboards specific to the active store
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={billboards}/>
      </div>
    </div>
  );
}

export default BillboardsPage;