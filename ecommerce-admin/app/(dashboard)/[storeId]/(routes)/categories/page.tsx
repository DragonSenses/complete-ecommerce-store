// Global Imports
import React from 'react';
import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';

// Local Imports
import CategoryClient from './components/client';
import { CategoryColumn } from './components/columns';

const CategoriesPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  
  // Fetch all Categories specific to the active store
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      billboard: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Format each Category into a CategoryColumn
  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }))

  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories}/>
      </div>
    </div>
  );
}

export default CategoriesPage;