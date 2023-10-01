// Global Imports
import prismadb from '@/lib/prismadb';
import React from 'react';

// Local Imports
import CategoryForm from './components/CategoryForm';

const CategoryPage =  async ({
  params
}:{
  params: { categoryId: string, storeId: string }
}) => {

  // Fetch an existing category
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId
    }
  });

  // Fetch all billboards we can select from
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId
    }
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm 
          billboards={billboards}
          initialData={category}
        />
      </div>
    </div>
  )
}

export default CategoryPage;