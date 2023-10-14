// Global Imports
import prismadb from '@/lib/prismadb';
import React from 'react';

// Local Imports
import ProductForm from './components/ProductForm';

const ProductPage = async ({
  params
}: {
  params: { productId: string, storeId: string }
}) => {

  // Fetch an existing product
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true
    }
  });

  // Fetch all categories within the store
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    }
  });

  // Fetch all colors within the store
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    }
  });

  // Fetch all sizes within the store
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    }
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm 
          categories={categories}
          colors={colors}
          sizes={sizes}
          initialData={product} 
        />
      </div>
    </div>
  )
}

export default ProductPage;