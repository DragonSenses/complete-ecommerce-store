import React from 'react';

import getProducts from '@/actions/getProducts';

interface ProductPageProps {
  params: {
    productId: string;
  }
}

const ProductPage: React.FC<ProductPageProps> = async ({
  params
}) => {

  const product = {};

  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id;
  })

  return (
    <div>Individual Product Page</div>
  )
}

export default ProductPage