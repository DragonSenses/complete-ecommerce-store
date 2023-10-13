// Global Imports
import prismadb from '@/lib/prismadb';
import React from 'react';

// Local Imports
import ProductForm from './components/ProductForm';

const ProductPage =  async ({
  params
}:{
  params: { productId: string }
}) => {

  // Fetch an existing product
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId
    }
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm initialData={product}/>
      </div>
    </div>
  )
}

export default ProductPage;