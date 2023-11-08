import React from 'react';

import getProduct from '@/actions/getProduct';
import getProducts from '@/actions/getProducts';

interface ProductPageProps {
  params: {
    productId: string;
  }
}

const ProductPage: React.FC<ProductPageProps> = async ({
  params
}) => {
  // Fetch the individual product
  const product = await getProduct(params.productId);

  // Fetch suggested products using the same category
  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id
  })

  return (
    <div>Individual Product Page</div>
  )
}

export default ProductPage