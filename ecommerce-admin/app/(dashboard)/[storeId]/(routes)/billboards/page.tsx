// Global Imports
import React from 'react';
import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';

// Local Imports
import BillboardClient from './components/client';
import { BillboardColumn } from './components/columns';

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

  // Format each Billboard into a BillboardColumn
  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }))

  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards}/>
      </div>
    </div>
  );
}

export default BillboardsPage;